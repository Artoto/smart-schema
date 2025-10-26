import { createValidator } from "../src/core/createValidator";

describe("createValidator", () => {
  const validator = createValidator({
    id: 0,
    name: "",
    "email?": "",
    role: ["admin", "user"],
    profile: { age: 0 },
  });

  it("✅ should pass valid data", () => {
    expect(
      validator({ id: 1, name: "Alice", role: "admin", profile: { age: 25 } })
    ).toBe(true);
  });

  it("❌ should fail if required field missing", () => {
    expect(validator({ name: "Bob" })).toBe(false);
  });

  it("✅ should allow optional field to be missing", () => {
    expect(
      validator({ id: 2, name: "Charlie", role: "user", profile: { age: 30 } })
    ).toBe(true);
  });

  it("❌ should fail if enum value invalid", () => {
    expect(
      validator({ id: 3, name: "Dave", role: "manager", profile: { age: 40 } })
    ).toBe(false);
  });
});
