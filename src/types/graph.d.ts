export interface GraphNode extends d3.SimulationNodeDatum {
  id: string
  label: string
  group: 'post' | 'tag' | 'title'
  category?: string
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
}