import type { Diagram } from "@/content";

export const NODE = { width: 140, height: 64, gapX: 48, gapY: 24 } as const;

export interface PlacedNode {
  id: string;
  x: number;
  y: number;
}

export interface PlacedEdge {
  key: string;
  label?: string;
  /** Start (right edge of the source) and end (left edge of the target). */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Left-to-right layered layout for a small directed acyclic graph.
 * A node's column is its longest distance from a source, so every edge points
 * right; nodes sharing a column stack vertically, centred on the tallest one.
 */
export function layoutDiagram(diagram: Diagram) {
  const column = new Map<string, number>(diagram.nodes.map((n) => [n.id, 0]));

  // Longest-path relaxation. At most |nodes| passes are needed for a DAG; the
  // bound also stops a mistaken cycle in the data from looping forever.
  for (let pass = 0; pass < diagram.nodes.length; pass++) {
    let changed = false;
    for (const edge of diagram.edges) {
      const from = column.get(edge.from);
      const to = column.get(edge.to);
      if (from === undefined || to === undefined) continue;
      if (to < from + 1) {
        column.set(edge.to, from + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const rowsInColumn = new Map<number, number>();
  const cell = new Map<string, { col: number; row: number }>();
  for (const node of diagram.nodes) {
    const col = column.get(node.id) ?? 0;
    const row = rowsInColumn.get(col) ?? 0;
    rowsInColumn.set(col, row + 1);
    cell.set(node.id, { col, row });
  }

  const columns = Math.max(...rowsInColumn.keys()) + 1;
  const maxRows = Math.max(...rowsInColumn.values());
  const stackHeight = (rows: number) =>
    rows * NODE.height + (rows - 1) * NODE.gapY;
  const width = columns * NODE.width + (columns - 1) * NODE.gapX;
  const height = stackHeight(maxRows);

  const placed = new Map<string, PlacedNode>();
  for (const node of diagram.nodes) {
    const at = cell.get(node.id);
    if (!at) continue;
    const offset = (height - stackHeight(rowsInColumn.get(at.col) ?? 1)) / 2;
    placed.set(node.id, {
      id: node.id,
      x: at.col * (NODE.width + NODE.gapX),
      y: offset + at.row * (NODE.height + NODE.gapY),
    });
  }

  const edges: PlacedEdge[] = diagram.edges.flatMap((edge) => {
    const from = placed.get(edge.from);
    const to = placed.get(edge.to);
    if (!from || !to) return [];
    return [
      {
        key: `${edge.from}-${edge.to}`,
        label: edge.label,
        x1: from.x + NODE.width,
        y1: from.y + NODE.height / 2,
        x2: to.x,
        y2: to.y + NODE.height / 2,
      },
    ];
  });

  return { width, height, nodes: placed, edges };
}
