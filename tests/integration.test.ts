import { createValidator } from "../src/core/createValidator";
import { extendValidator } from "../src/core/extendValidator";
import { toJSONSchema } from "../src/core/jsonSchema";
import { SchemaRegistry } from "../src/core/schemaRegistry";

describe("Integration Test (Full Flow)", () => {
  const base = createValidator({ id: 0, name: "" });
  const extended = extendValidator(base, { role: ["admin", "user"] });

  it("✅ should register, validate, and export schema correctly", () => {
    SchemaRegistry.register("Admin", extended);

    const valid = { id: 1, name: "Alice", role: "admin" };
    const invalid = { id: 2, role: "manager" };

    expect(SchemaRegistry.validate("Admin", valid)).toBe(true);
    expect(SchemaRegistry.validate("Admin", invalid)).toBe(false);

    const schema = toJSONSchema({ id: 0, name: "", role: ["admin", "user"] });
    expect(schema.properties.role.enum).toContain("admin");
  });
});
