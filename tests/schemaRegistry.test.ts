import { SchemaRegistry } from "../src/core/schemaRegistry";
import { createValidator } from "../src/core/createValidator";

describe("SchemaRegistry", () => {
  const userValidator = createValidator({ id: 0, name: "" });

  it("✅ should register schema", () => {
    SchemaRegistry.register("User", userValidator);
    expect(typeof SchemaRegistry.get("User")).toBe("function");
  });

  it("❌ should throw if registering duplicate name", () => {
    expect(() => SchemaRegistry.register("User", userValidator)).toThrow();
  });

  it("✅ should validate valid data", () => {
    expect(SchemaRegistry.validate("User", { id: 1, name: "Test" })).toBe(true);
  });

  it("❌ should fail invalid data", () => {
    expect(SchemaRegistry.validate("User", { id: "abc" })).toBe(false);
  });

  it("❌ should throw if schema not found", () => {
    expect(() => SchemaRegistry.validate("Unknown", {})).toThrow();
  });
});
