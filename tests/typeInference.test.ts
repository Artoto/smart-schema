import { createValidator } from "../src/core/createValidator";
import { ExtractValidatorType } from "../src/types/infer";

describe("ExtractValidatorType", () => {
  type Users = {
    id: number;
    name: string;
    email?: string; // ✅ optional key แล้ว
    profile: { age: number };
  };
  const validator = createValidator<Users>({
    id: 0,
    name: "",
    email: "",
    profile: { age: 0 },
  });

  type User = ExtractValidatorType<typeof validator>;

  // ✅ email ไม่จำเป็นต้องมี
  const mockUser: User = { id: 1, name: "Alice", profile: { age: 20 } };

  it("✅ should infer correct type with optional email", () => {
    expect(mockUser.id).toBe(1);
    expect(mockUser.profile.age).toBe(20);
  });
});
