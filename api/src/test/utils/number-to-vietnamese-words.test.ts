import { describe, expect, it } from "vitest";
import { numberToVietnameseWords } from "../../utils/number-to-vietnamese-words";

describe("numberToVietnameseWords", () => {
  it.each([
    [0, "Không đồng"],
    [-1, ""],
    [Number.NaN, ""],
    [Number.POSITIVE_INFINITY, ""],
    [1, "Một đồng"],
    [15, "Mười lăm đồng"],
    [21, "Hai mươi mốt đồng"],
    [24, "Hai mươi tư đồng"],
    [25, "Hai mươi lăm đồng"],
    [100, "Một trăm đồng"],
    [105, "Một trăm lẻ năm đồng"],
    [1000, "Một nghìn đồng"],
    [20000, "Hai mươi nghìn đồng"],
    [1_000_000, "Một triệu đồng"],
    [1_005_000, "Một triệu lẻ năm nghìn đồng"]
  ])("converts %i to %s", (value, expected) => {
    expect(numberToVietnameseWords(value)).toBe(expected);
  });

  it("rounds decimal values before converting", () => {
    expect(numberToVietnameseWords(10.6)).toBe("Mười một đồng");
  });
});
