'use client';

import { useEffect, useMemo, useRef, useState } from 'react'
import type * as d3Types from 'd3'
import { useRouter } from 'next/navigation';
import { GraphLink, GraphNode } from '@/types/graphTypes';
import { ProjectSlug } from '@/types/projectTypes';
import projectsList from '@/data/project';
import DataSetter from '../common/DataSetter';

interface GraphViewProps {
  projects: ProjectSlug[]
  initialNodes: GraphNode[]
  initialLinks: GraphLink[]
}

function GraphView({projects, initialNodes, initialLinks} : GraphViewProps) {
    const [isD3Loaded, setIsD3Loaded] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null)
    const d3Ref = useRef<typeof d3Types | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null)
    const simulationRef = useRef<d3Types.Simulation<GraphNode, undefined> | null>(null);
    const [gravity, setGravity] = useState(-80)
    const [linkDist, setLinkDist] = useState(20)
    const [forceCollide, setForceCollide] = useState(15);
    const router = useRouter();

    useEffect(() => {
        import('d3').then(d3Module => {
            d3Ref.current = d3Module;
            setIsD3Loaded(true);
        })
    }, [isD3Loaded])

    const categories = useMemo(() => {
        return Array.from(new Set(projects.map(p => p.projectNum)))
    }, [projects])


    useEffect(() => {
        if (!svgRef.current || !isD3Loaded || !d3Ref.current) return

        const d3 = d3Ref.current;

        if (d3Ref.current) {
            // Specify the dimensions of the chart.
            const width = svgRef.current.clientWidth;
            const height = svgRef.current.clientHeight;

            const categoryCenters: Record<string, { x: number; y: number }> = {}
                categories.forEach((cat, i) => {
                const angle = (i / categories.length) * 2 * Math.PI
                const radius = Math.min(width, height) * 0.3
                categoryCenters[cat] = {
                    x: width / 2 + Math.cos(angle) * radius,
                    y: height / 2 + Math.sin(angle) * radius,
                }
            })

            const svg = d3.select(svgRef.current);
            const tooltip = d3.select(tooltipRef.current);
            svg.selectAll('*').remove();

            const g = svg.append('g');

            g.append('g')
            .attr('class', 'orbits')
            .selectAll('circle')
            .join('circle')
            .attr('cx', d => categoryCenters[d as any]?.x || width / 2)
            .attr('cy', d => categoryCenters[d as any]?.y || height / 2)
            .attr('r', 100)
            .attr('fill', 'none')
            .attr('stroke-dasharray', '4 4')

            // The force simulation mutates links and nodes, so create a copy
            // so that re-evaluating this cell produces the same result.
            const links = initialLinks.map(d => ({...d}));
            const nodes = initialNodes.map(d => ({...d}));

            const nodesCopy = nodes.map(n => ({ ...n }))
            const linksCopy = links.map(l => ({ ...l }))

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on('zoom', event => g.attr('transform', event.transform))

            svg.call(zoom)

        const simulation = d3
            .forceSimulation<GraphNode>(nodesCopy)
            .force(
                'link',
                d3
                .forceLink<GraphNode, GraphLink>(linksCopy)
                .id(d => d.id)
                .distance(linkDist)
            )
            .force('charge', d3.forceManyBody().strength(gravity))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(forceCollide))
            simulationRef.current = simulation
            
        // Edge gradient definition for visual depth
        const defs = svg.append('defs')

        const edgeGradient = defs.append('linearGradient')
            .attr('id', 'edge-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')

        edgeGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#3b82f6')
            .attr('stop-opacity', 0.6)

        edgeGradient.append('stop')
            .attr('offset', '50%')
            .attr('stop-color', '#60a5fa')
            .attr('stop-opacity', 0.3)

        edgeGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#3b82f6')
            .attr('stop-opacity', 0.6)

        const link = g
            .append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(linksCopy)
            .join('line')
            .attr('stroke', 'var(--border-light)')
            .attr('stroke-width', 1.5)
            .attr('stroke-linecap', 'round')
            .style('filter', 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))')

        const node = g
            .append('g')
            .selectAll<SVGGElement, GraphNode>('.node')
            .data(nodesCopy)
            .join('g')
            .attr('class', 'node')
            .call(
                d3
                .drag<SVGGElement, GraphNode>()
                .on('start', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart()
                    d.fx = d.x
                    d.fy = d.y
                })
                .on('drag', (event, d) => {
                    d.fx = event.x
                    d.fy = event.y
                    tooltip.style('opacity', '0')
                })
                .on('end', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0)
                    d.fx = null
                    d.fy = null
                })
            )
            .on('click', (event, d) => {
                event.stopPropagation();

                if (d.group === 'post') {
                    const post = projects.find(p => p.pageId === d.id)
                    if (post) {
                        router.push(`/projects/${post.projectNum}/${post.pageId}?title=${post.title}`);
                    }
                }
                else if (d.group === 'title') {
                    let projectNum = 0;
                    const project = projectsList.find((p, index) => {
                        if (p.title === d.label) {
                            projectNum = index + 1;
                            return true;
                        }
                    })
                    
                    if (project) {
                        router.push(`/projects/${projectNum}`);
                    }
                }
            })
            .on('mouseover', (event, d) => {
                // Highlight connected edges
                link
                .attr('stroke-width', l => {
                    const source = (l.source as GraphNode).id
                    const target = (l.target as GraphNode).id
                    return source === d.id || target === d.id ? 3 : 1.5
                })
                .attr('stroke', l => {
                    return 'var(--border-light)'
                })
                .style('filter', l => {
                    const source = (l.source as GraphNode).id
                    const target = (l.target as GraphNode).id
                    return source === d.id || target === d.id
                    ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))'
                    : 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))'
                })

                tooltip.style('opacity', '1').html(`
                <div class="flex flex-col gap-1 ">
                    <div class="flex items-center gap-2">
                    <span class="size-1.5 rounded-full ${d.group === 'post' ? 'bg-[var(--border-light)]' : 'bg-white'}"></span>
                    <span class="font-bold uppercase tracking-wider">${d.group}</span>
                    </div>
                    <div class="text-white text-xs leading-tight">${d.label}</div>
                    ${d.category ? `<div class="text-[8px] text-primary uppercase font-bold tracking-[0.1em] mt-0.5">${d.category}</div>` : ''}
                </div>
                `)
            })
            .on('mousemove', event => {
                tooltip
                .style('left', event.pageX + 15 + 'px')
                .style('top', event.pageY - 10 + 'px')
            })
            .on('mouseleave', () => {
                // Reset edges
                link
                .attr('stroke-width', 1.5)
                .attr('stroke', 'var(--border-light)')
                .style('filter', 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))')

                tooltip.style('opacity', '0')
            })

        node
            .append('circle')
            .attr('r', d => (d.group === 'root' ? 30 :(d.group === 'title' ? 20 : (d.group === 'post'? 10 : 5))))
            .attr('fill', d => (d.group === 'root' ? "var(--border-light)" : (d.group === 'title' ? 'var(--foreground-rgb)' : (d.group === "post" ? "var(--border-light-dark)" : "var(--border-dark)"))))
            .attr('stroke',"var(--border-light)")
            .attr('stroke-width', 0.5)
            .attr('stroke-opacity', d => (d.group === 'post' ? 0.4 : 0.3))
            .attr('class', 'transition-all duration-300 cursor-pointer')
            .style('filter', d => (d.group === 'title' ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none'))

        node
            .append('text')
            .text(d => d.label)
            .attr('dx', 14)
            .attr('dy', 4)
            .attr('fill', '#52525b')
            .attr('font-size', '9px')
            .attr('font-family', 'Space Grotesk')
            .attr('class', 'pointer-events-none select-none uppercase tracking-widest')

        simulation.on('tick', () => {
            link
                .attr('x1', d => (d.source as GraphNode).x || 0)
                .attr('y1', d => (d.source as GraphNode).y || 0)
                .attr('x2', d => (d.target as GraphNode).x || 0)
                .attr('y2', d => (d.target as GraphNode).y || 0)

            node.attr('transform', d => `translate(${d.x},${d.y})`)
            })

        return () => {
            simulation.stop()
        }

    }}, [isD3Loaded, gravity, linkDist, forceCollide])


    return (
        <div className='w-screen h-screen 
        bg-[linear-gradient(var(--border-dark)_1px,_transparent_1px),_linear-gradient(90deg,_var(--border-dark)_1px,_transparent_1px),_linear-gradient(var(--border-dark)_0px,_transparent_0px),_linear-gradient(90deg,_var(--border-dark)_0px,_var(--background-basic)_0px)]
        bg-[50px_50px,_50px_50px,_10px_10px,_10px_10px]
        overflow-hidden'>
            <svg ref={svgRef} className='chart w-full h-full cursor-grab active:cursor-grabbing'></svg>
            <div
                ref={tooltipRef}
                className="fixed pointer-events-none opacity-0 transition-opacity duration-200 glass px-3 py-2 rounded-xl border border-white/10 text-[9px] font-mono text-zinc-400 z-[100] whitespace-nowrap backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[120px]"
            />
            <div className='flex flex-col absolute top-[90px] right-[20px] max-w-[250px] px-[20px] py-[20px] gap-[15px] rounded-[20px] border-[0.5px] border-white/10 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm'>
                <div>
                    <p className='text-[12px] text-[var(--border-light)] font-bold accent-[var(--border-light)] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[var(--border-light)] [&::-webkit-slider-thumb]:appearance-none appearance-none select-none'>{"중력 크기 : " + gravity.toString()}</p>
                    <input className="w-full" type="range" min={-100} max={20} value={gravity} onChange={e=>{setGravity(e.target.valueAsNumber)}}/>
                </div>
                
                <div>
                    <p className='text-[12px] text-[var(--border-light)] font-bold appearance-none select-none'>{"링크 사이 거리 : " + linkDist.toString()}</p>
                    <input className="w-full" type="range" min={10} max={150} value={linkDist} onChange={e=>{setLinkDist(e.target.valueAsNumber)}}/>
                </div>

                <div>
                    <p className='text-[12px] text-[var(--border-light)] font-bold appearance-none select-none'>{"중력 반경 : " + forceCollide.toString()}</p>
                    <input className="w-full" type="range" min={0} max={150} value={forceCollide} onChange={e=>{setForceCollide(e.target.valueAsNumber)}}/>
                </div>

                <p className='text-[12px] text-[var(--border-light)] font-light'>줌 / 아웃 가능, 말단 노드 클릭 시 해당 페이지로 이동합니다.</p>
            </div>
        </div>
    )
}


export default GraphView