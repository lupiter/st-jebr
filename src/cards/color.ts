export type color = number[];

function toHex(d: number): string {
  return Number(d).toString(16).padStart(2, "0");
}

export function hex(color: color): string {
  return "#" + color.map((d) => toHex(d)).join("");
}

export function number(hex: string): color {
  if (hex.length > 7) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 24) & 255;
    const g = (bigint >> 16) & 255;
    const b = (bigint >> 8) & 255;
    const a = bigint & 255;
    return [r, g, b, a];
  }
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function equal(a: color, b: color): boolean {
  return (
    a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
  );
}
