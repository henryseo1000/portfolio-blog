'use client';

import { useEffect, useMemo, useRef, useState } from 'react'
import type * as d3Types from 'd3'
import { GraphNode } from '@/types/graph';
import { useRouter } from 'next/navigation';
import { GraphLink } from '@/types/graphTypes';
import { ProjectSlug } from '@/types/projectTypes';

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
    const [selectedPost, setSelectedPost] = useState<ProjectSlug | null>(null);
    const [gravity, setGravity] = useState(-50)
    const [linkDist, setLinkDist] = useState(20)
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

            // const categoryCenters: Record<string, { x: number; y: number }> = {}
            //     categories.forEach((cat, i) => {
            //     const angle = (i / categories.length) * 2 * Math.PI
            //     const radius = Math.min(width, height) * 0.3
            //     categoryCenters[cat] = {
            //         x: width / 2 + Math.cos(angle) * radius,
            //         y: height / 2 + Math.sin(angle) * radius,
            //     }
            // })

            const svg = d3.select(svgRef.current);
            const tooltip = d3.select(tooltipRef.current);
            svg.selectAll('*').remove();

            const g = svg.append('g');

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
            .force('collision', d3.forceCollide().radius(60))
            
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
                event.stopPropagation()
                if (d.group === 'post') {
                const post = projects.find(p => p.pageId === d.id)
                if (post) {
                    router.push(`/projects/${post.projectNum}/${post.pageId}?title=${post.title}`);
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
                    const source = (l.source as GraphNode).id
                    const target = (l.target as GraphNode).id
                    return source === d.id || target === d.id ? 'var(--border-light)' : 'url(#edge-gradient)'
                })
                .style('filter', l => {
                    const source = (l.source as GraphNode).id
                    const target = (l.target as GraphNode).id
                    return source === d.id || target === d.id
                    ? 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.8))'
                    : 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
                })

                tooltip.style('opacity', '1').html(`
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                    <span class="size-1.5 rounded-full ${d.group === 'post' ? 'bg-primary' : 'bg-zinc-500'}"></span>
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
                .attr('stroke', 'url(#edge-gradient)')
                .style('filter', 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))')

                tooltip.style('opacity', '0')
            })

        node
            .append('circle')
            .attr('r', d => (d.group === 'title' ? 20 : (d.group === 'post'? 10 : 5)))
            .attr('fill', d => (d.group === 'title' ? 'var(--foreground-rgb)' : "var(--border-light-dark)"))
            .attr('stroke', d => ("var(--border-light)"))
            .attr('stroke-width', d => (1))
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

    }}, [isD3Loaded])


    return (
        <div className='w-screen h-screen 
        bg-[linear-gradient(var(--border-dark)_1px,_transparent_1px),_linear-gradient(90deg,_var(--border-dark)_1px,_transparent_1px),_linear-gradient(var(--border-dark)_0px,_transparent_0px),_linear-gradient(90deg,_var(--border-dark)_0px,_var(--background-basic)_0px)]
        bg-[50px_50px,_50px_50px,_10px_10px,_10px_10px]
        overflow-hidden'>
            <svg ref={svgRef} className='chart w-full h-full cursor-grab active:cursor-grabbing'></svg>
            <div
                ref={tooltipRef}
                className="fixed pointer-events-none opacity-0 transition-opacity duration-200 glass px-3 py-2 rounded-xl border border-white/10 text-[9px] font-mono text-zinc-400 z-[100] whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[120px]"
            />
        </div>
    )
}


export default GraphView