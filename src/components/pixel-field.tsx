import { buildInfo } from "@/lib/build-info";

const COLS = 96;
const ROWS = 54;

/** Small deterministic PRNG (mulberry32), so the same seed always draws the same field. */
function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The field of blocks behind the windows. It is static, drawn once at build
 * time, and seeded from the commit the page was built from: every deploy has
 * its own field. Cells are sparse in the middle and denser towards the left
 * and right edges, where the windows leave room.
 */
export function PixelField() {
  const seed = buildInfo.sha ? parseInt(buildInfo.sha.slice(0, 8), 16) : 1;
  const random = prng(seed);
  const cells: { x: number; y: number; strong: boolean }[] = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const fromCentre = Math.abs(x - (COLS - 1) / 2) / ((COLS - 1) / 2);
      if (random() < 0.015 + 0.2 * fromCentre ** 3) {
        cells.push({ x, y, strong: random() < 0.12 });
      }
    }
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COLS} ${ROWS}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className="text-accent pointer-events-none fixed inset-0 -z-10 h-full w-full print:hidden"
      fill="currentColor"
    >
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x + 0.2}
          y={cell.y + 0.2}
          width="0.6"
          height="0.6"
          opacity={cell.strong ? 0.4 : 0.16}
        />
      ))}
    </svg>
  );
}
