'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import type * as d3Types from 'd3'
import { GraphNode } from '@/types/graph';

function GraphView() {
    const [isD3Loaded, setIsD3Loaded] = useState(false);
    const d3Ref = useRef<typeof d3Types | null>(null);

    useEffect(() => {
        import('d3').then(d3Module => {
        d3Ref.current = d3Module
        setIsD3Loaded(true)
        })
    }, [isD3Loaded])

    useEffect(() => {
        const d3 = d3Ref.current;

        if (d3Ref.current) {
            const data = require('../../../public/data.json')

        // Specify the dimensions of the chart.
        const width = 928;
        const height = 680;

        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({...d}));
        const nodes = data.nodes.map(d => ({...d}));

        // Create a simulation with several forces.
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => (d as any)?.id))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        // Create the SVG container.
        const svg = d3.select(".chart")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])

        // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt((d as any)?.value));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => color((d as any)?.group))
            .on('click', (e, d) => {
                window.open('https://www.naver.com')
            })
            .on('mouseon', (e, d) => {
                
            })
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
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

        node.append("title")
            .text(d => (d as any)?.id);

        // Add a drag behavior.
        node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        
        // Set the position attributes of links and nodes each time the simulation ticks.
        simulation.on("tick", () => {
            link
                .attr("x1", d => (d as any)?.source.x)
                .attr("y1", d => (d as any)?.source.y)
                .attr("x2", d => (d as any)?.target.x)
                .attr("y2", d => (d as any)?.target.y);

            node
                .attr("cx", d => (d as any)?.x)
                .attr("cy", d => (d as any)?.y);
        });

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }}
    }, [isD3Loaded])
    

    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    // invalidation.then(() => simulation.stop());

    return (
        <div className='w-screen h-screen overflow-hidden'>
            <svg className='chart w-full h-full'></svg>
        </div>
    )
}


export default GraphView