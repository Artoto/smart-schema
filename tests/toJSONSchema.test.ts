import { toJSONSchema } from "../src/core/jsonSchema";

describe("toJSONSchema", () => {
  const template = {
    id: 0,
    name: "",
    "email?": "",
    role: ["admin", "user"],
    profile: { age: 0 },
  };

  it("✅ should create valid JSON schema", () => {
    const schema = toJSONSchema(template, {
      title: "User Schema",
      description: "A user entity for validation",
    });
    expect(schema.type).toBe("object");
    expect(schema.properties.id.type).toBe("number");
    expect(schema.properties.role.enum).toEqual(["admin", "user"]);
  });

  it("✅ should exclude optional from required", () => {
    const schema = toJSONSchema(template);
    expect(schema.required.includes("email")).toBe(false);
  });
});
