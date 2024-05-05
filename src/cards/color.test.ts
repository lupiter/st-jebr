import { expect, test } from "vitest";
import { hex, number } from "./color";

test("hex", () => {
  ["#ff0000", "#cccccc", "#00ff00ff"].forEach((c) => {
    expect(hex(number(c))).toEqual(c);
  });
});
