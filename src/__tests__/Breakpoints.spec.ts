import Breakpoints from "../index";

describe("Breakpoints", () => {
  const breakpoints = {
    mobile: 0,
    tablet: 768,
    desktop: 1200,
  };

  const bp = new Breakpoints(breakpoints);

  test("above", () => {
    expect(bp.above("mobile")).toBe("@media screen and (min-width: 768px)");
    expect(bp.above("tablet")).toBe("@media screen and (min-width: 1200px)");
    expect(bp.above("desktop")).toBe("");
    expect(bp.above(500)).toBe("@media screen and (min-width: 500px)");
  });

  test("below", () => {
    expect(bp.below("mobile")).toBe("");
    expect(bp.below("tablet")).toBe("@media screen and (max-width: 767px)");
    expect(bp.below("desktop")).toBe("@media screen and (max-width: 1199px)");
    expect(bp.below(500)).toBe("@media screen and (max-width: 499px)");
  });

  test("between", () => {
    expect(bp.between("mobile", "tablet")).toBe(
      "@media screen and (max-width: 767px)"
    );
    expect(bp.between("tablet", "desktop")).toBe(
      "@media screen and (min-width: 768px) and (max-width: 1199px)"
    );
    expect(bp.between("desktop", "tablet")).toBe(
      "@media screen and (min-width: 768px) and (max-width: 1199px)"
    );
    expect(bp.between("mobile", 500)).toBe(
      "@media screen and (max-width: 499px)"
    );
    expect(bp.between(500, "mobile")).toBe(
      "@media screen and (max-width: 499px)"
    );
    expect(bp.between(500, "desktop")).toBe(
      "@media screen and (min-width: 500px) and (max-width: 1199px)"
    );
    expect(bp.between(500, 5000)).toBe(
      "@media screen and (min-width: 500px) and (max-width: 4999px)"
    );
  });

  test("only", () => {
    expect(bp.only("mobile")).toBe("@media screen and (max-width: 767px)");
    expect(bp.only("tablet")).toBe(
      "@media screen and (min-width: 768px) and (max-width: 1199px)"
    );
    expect(bp.only("desktop")).toBe("@media screen and (min-width: 1200px)");
  });

  test("any", () => {
    expect(bp.any("mobile")).toBe("@media screen and (max-width: 767px)");
    expect(bp.any("mobile", "tablet")).toBe(
      "@media screen and (max-width: 767px), screen and (min-width: 768px) and (max-width: 1199px)"
    );
    expect(bp.any("tablet", "mobile")).toBe(
      "@media screen and (min-width: 768px) and (max-width: 1199px), screen and (max-width: 767px)"
    );
    expect(bp.any("mobile", "desktop")).toBe(
      "@media screen and (max-width: 767px), screen and (min-width: 1200px)"
    );
  });
});
