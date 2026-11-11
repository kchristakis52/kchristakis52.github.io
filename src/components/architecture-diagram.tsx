"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Diagram, DiagramNode } from "@/content";
import { layoutDiagram, NODE } from "@/lib/diagram-layout";

// Room around the graph for the focus ring and the edge labels.
const PAD = 6;
const ROLE_LABEL: Record<DiagramNode["role"], string> = {
  built: "Built",
  context: "Context",
};

/**
 * The short tech line inside a node box. Skips an item that only repeats the
 * node's own label, and keeps to what fits the box width.
 */
function inNodeTech(node: DiagramNode): string {
  const items = node.tech.filter(
    (item) => item.toLowerCase() !== node.label.toLowerCase(),
  );
  const pair = items.slice(0, 2).join(", ");
  return pair.length <= 18 ? pair : (items[0] ?? "");
}

function Tech({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="meta text-muted flex flex-wrap gap-x-4 gap-y-0.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Block diagram drawn from a typed graph of nodes and edges.
 * From 1024px it is an interactive SVG: hover, focus or click a node to read
 * what it does. Below that, where the SVG text would be too small to read,
 * the same data is a plain ordered list with every detail visible.
 */
export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  const [activeId, setActiveId] = useState(diagram.initial);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const { width, height, nodes: placed, edges } = layoutDiagram(diagram);
  const active =
    diagram.nodes.find((n) => n.id === activeId) ?? diagram.nodes[0];

  function onKeyDown(
    event: KeyboardEvent<SVGGElement>,
    index: number,
    id: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveId(id);
      return;
    }
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    nodeRefs.current[index + step]?.focus();
  }

  return (
    <figure className="print:hidden">
      <svg
        viewBox={`${-PAD} ${-PAD - 12} ${width + PAD * 2} ${height + PAD * 2 + 12}`}
        role="group"
        aria-label={diagram.title}
        className="hidden h-auto w-full lg:block"
      >
        {edges.map((edge) => {
          const midX = (edge.x1 + edge.x2) / 2;
          // Elbow through the middle of the gap when the two ends are on different rows.
          const path =
            edge.y1 === edge.y2
              ? `M${edge.x1} ${edge.y1}H${edge.x2}`
              : `M${edge.x1} ${edge.y1}H${midX}V${edge.y2}H${edge.x2}`;
          return (
            <g key={edge.key} aria-hidden="true">
              <path
                d={path}
                fill="none"
                strokeWidth="1"
                className="stroke-muted"
              />
              <path
                d={`M${edge.x2 - 6} ${edge.y2 - 4}L${edge.x2} ${edge.y2}L${edge.x2 - 6} ${edge.y2 + 4}`}
                fill="none"
                strokeWidth="1"
                className="stroke-muted"
              />
              {edge.label ? (
                <text
                  x={midX}
                  y={Math.min(edge.y1, edge.y2) - 8}
                  textAnchor="middle"
                  className="fill-muted font-mono text-[9px]"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {diagram.nodes.map((node, index) => {
          const at = placed.get(node.id);
          if (!at) return null;
          const isActive = node.id === active?.id;
          return (
            <g
              key={node.id}
              ref={(element) => {
                nodeRefs.current[index] = element;
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${node.label}. ${node.detail}${
                node.tech.length ? ` Technology: ${node.tech.join(", ")}.` : ""
              }`}
              className="group cursor-pointer outline-none"
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
              onKeyDown={(event) => onKeyDown(event, index, node.id)}
            >
              {/* Focus ring: its own rect, because outlines on SVG groups render inconsistently. */}
              <rect
                x={at.x - 4}
                y={at.y - 4}
                width={NODE.width + 8}
                height={NODE.height + 8}
                fill="none"
                strokeWidth="2"
                className="stroke-accent opacity-0 group-focus-visible:opacity-100"
              />
              <rect
                x={at.x + 0.5}
                y={at.y + 0.5}
                width={NODE.width - 1}
                height={NODE.height - 1}
                strokeWidth="1"
                strokeDasharray={node.role === "context" ? "4 3" : undefined}
                className={`stroke-ink transition-colors duration-100 motion-reduce:transition-none ${
                  isActive ? "fill-ink" : "fill-ground"
                }`}
              />
              <text
                x={at.x + NODE.width / 2}
                y={at.y + (inNodeTech(node) ? 28 : 37)}
                textAnchor="middle"
                className={`text-[14px] font-semibold ${isActive ? "fill-ground" : "fill-ink"}`}
              >
                {node.label}
              </text>
              {inNodeTech(node) ? (
                <text
                  x={at.x + NODE.width / 2}
                  y={at.y + 46}
                  textAnchor="middle"
                  className={`font-mono text-[9px] ${isActive ? "fill-ground" : "fill-muted"}`}
                >
                  {inNodeTech(node)}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Detail for the active node. Fixed minimum height so switching nodes never shifts the page. */}
      {active ? (
        <div className="border-rule mt-6 hidden min-h-[5.5rem] grid-cols-12 gap-x-6 border-t pt-3 lg:grid">
          <div className="col-span-3">
            <p className="font-semibold">{active.label}</p>
            <p className="meta text-muted">{ROLE_LABEL[active.role]}</p>
          </div>
          <div className="col-span-9 space-y-2">
            <p className="max-w-[62ch] leading-[1.6] text-pretty">
              {active.detail}
            </p>
            <Tech items={active.tech} />
          </div>
        </div>
      ) : null}

      <ol className="border-rule border-b lg:hidden">
        {diagram.nodes.map((node, index) => (
          <li
            key={node.id}
            className="border-rule grid grid-cols-[1.75rem_1fr] gap-x-3 border-t py-3"
          >
            <span className="meta text-muted pt-1">{index + 1}</span>
            <div className="space-y-1.5">
              <p className="font-semibold">
                {node.label}{" "}
                <span className="meta text-muted ml-2 font-normal">
                  {ROLE_LABEL[node.role]}
                </span>
              </p>
              <p className="leading-[1.6] text-pretty">{node.detail}</p>
              <Tech items={node.tech} />
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="meta text-muted mt-3">
        <span className="hidden lg:inline">
          Data flows left to right. Dashed nodes are outside the platform.
          Select a node for detail.
        </span>
        <span className="lg:hidden">
          Data flow, in order, from source to consumer.
        </span>
      </figcaption>
    </figure>
  );
}
