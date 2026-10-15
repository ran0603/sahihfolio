import { describe, it, expect } from "vitest";
import { slugify } from "../slugify";

describe("slugify", () => {
  it("lowercases the string", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("foo bar baz")).toBe("foo-bar-baz");
  });

  it("collapses multiple spaces into a single hyphen", () => {
    expect(slugify("foo   bar")).toBe("foo-bar");
  });

  it("removes non-word characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("collapses consecutive hyphens", () => {
    expect(slugify("foo--bar")).toBe("foo-bar");
  });

  it("trims leading hyphens", () => {
    expect(slugify("-hello")).toBe("hello");
  });

  it("trims trailing hyphens", () => {
    expect(slugify("hello-")).toBe("hello");
  });

  it("handles an already slugified string", () => {
    expect(slugify("already-slug")).toBe("already-slug");
  });

  it("handles numbers in the string", () => {
    expect(slugify("Report 2024 Q1")).toBe("report-2024-q1");
  });

  it("handles an empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles a string with only special characters", () => {
    expect(slugify("!@#$%")).toBe("");
  });

  it("trims whitespace before slugifying", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });
});
