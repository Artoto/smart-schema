import { extendValidator } from "../src/core/extendValidator";
import { createValidator } from "../src/core/createValidator";

describe("extendValidator", () => {
  const base = createValidator({ id: 0, name: "" });
  const extended = extendValidator(base, { role: ["admin", "user"], level: 0 });

  it("✅ should pass if data includes both base and extension fields", () => {
    expect(extended({ id: 1, name: "Alice", role: "admin", level: 5 })).toBe(
      true
    );
  });

  it("❌ should fail if extended field missing", () => {
    expect(extended({ id: 2, name: "Bob" })).toBe(false);
  });

  it("❌ should fail if type mismatch", () => {
    expect(extended({ id: 3, name: "Eve", role: 123, level: "high" })).toBe(
      false
    );
  });
});
