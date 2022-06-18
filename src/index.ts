export class Breakpoints<B extends { [key: string]: number }> {
  private sorted: [keyof B, number][];

  constructor(private readonly breakpoints: B, private readonly unit = "px") {
    this.sorted = Object.entries(breakpoints).sort(([, value1], [, value2]) => {
      return value1 - value2;
    });
  }

  private getNext(breakpoint: keyof B | number) {
    if (typeof breakpoint === "number") {
      return breakpoint;
    }
    const index = this.sorted.findIndex((sorted) => sorted[0] === breakpoint);
    const next = this.sorted[index + 1];
    return next ? next[1] : undefined;
  }

  private format(value: number) {
    return `${value}${this.unit}`;
  }

  private min(value?: number) {
    return value && value > 0 ? `(min-width: ${this.format(value)})` : "";
  }

  private max(value?: number) {
    return value ? `(max-width: ${this.format(value - 1)})` : "";
  }

  private get(breakpoint: keyof B | number) {
    return typeof breakpoint === "number"
      ? breakpoint
      : this.breakpoints[breakpoint];
  }

  private bounds(breakpoint: keyof B) {
    const lower = this.get(breakpoint);
    const upper = this.getNext(breakpoint);
    return this.and(this.min(lower), this.max(upper));
  }

  private and(...parts: string[]) {
    return parts.filter((part) => part).join(" and ");
  }

  private or(...parts: string[]) {
    return parts.filter((part) => part).join(", ");
  }

  private withMedia(string: string) {
    return string ? `@media ${string}` : "";
  }

  private withScreen(string: string) {
    return string ? `screen and ${string}` : "";
  }

  above(breakpoint: keyof B | number) {
    return this.withMedia(
      this.withScreen(this.and(this.min(this.getNext(breakpoint))))
    );
  }

  below(breakpoint: keyof B | number) {
    return this.withMedia(
      this.withScreen(this.and(this.max(this.get(breakpoint))))
    );
  }

  between(lower: keyof B | number, upper: keyof B | number) {
    const values = [this.get(lower), this.get(upper)];
    values.sort((a, b) => a - b);
    return this.withMedia(
      this.withScreen(this.and(this.min(values[0]), this.max(values[1])))
    );
  }

  only(breakpoint: keyof B) {
    return this.withMedia(this.withScreen(this.and(this.bounds(breakpoint))));
  }

  any(...breakpoints: Array<keyof B>) {
    const bounds = breakpoints.map((breakpoint) =>
      this.withScreen(this.and(this.bounds(breakpoint)))
    );
    return this.withMedia(this.or(...bounds));
  }
}

export default Breakpoints;
