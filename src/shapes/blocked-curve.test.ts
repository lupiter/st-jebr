import { getSpan, isSorted, sortCurvePoints } from "./blocked-curve";
import { expect, test } from "vitest";

const bottom = [
  [0, 10],
  [1, 10],
  [2, 10],
  [3, 9],
  [4, 9],
  [5, 8],
];
const top = [
  [0, 10],
  [1, 9],
  [1, 8],
  [2, 7],
  [2, 6],
  [2, 5],
];
const messy = [
  [0, 10],
  [1, 9],
  [1, 8],
  [1, 7],
  [2, 6],
  [2, 5],
];

const big = [
  [0, 17.85],
  [1, 17.85],
  [2, 17.85],
  [3, 17.85],
  [4, 17.85],
  [5, 17.85],
  [5, 16.85],
  [6, 16.85],
  [6, 15.850000000000001],
  [7, 15.850000000000001],
  [7, 14.850000000000001],
  [8, 14.850000000000001],
  [8, 13.850000000000001],
  [9, 13.850000000000001],
  [9, 12.850000000000001],
  [10, 12.850000000000001],
  [10, 11.850000000000001],
  [10, 10.850000000000001],
  [11, 10.850000000000001],
  [11, 9.850000000000001],
  [11, 8.850000000000001],
  [11, 7.850000000000001],
  [12, 7.850000000000001],
  [12, 6.850000000000001],
  [12, 5.850000000000001],
  [12, 4.850000000000001],
  [13, 4.850000000000001],
  [13, 3.8500000000000014],
  [13, 2.8500000000000014],
  [13, 1.8500000000000014],
  [13, 0.8500000000000014],
];

test("span count", () => {
  expect(getSpan(top, 0, 0)).toEqual(1);
  expect(getSpan(bottom, 1, 1)).toEqual(3);
  expect(getSpan(top, 5, 0)).toEqual(3);
  expect(getSpan(top, 2, 0)).toEqual(2);
  expect(getSpan(big, 0, 1)).toEqual(6);
  expect(getSpan(big, 30, 0)).toEqual(5);
});

test("sort check", () => {
  expect(isSorted(bottom)).toBe(true);
  expect(isSorted(top)).toBe(true);
  expect(isSorted(messy)).toBe(false);
});

test("sort", () => {
  expect(sortCurvePoints(messy)).toEqual(top);
});
