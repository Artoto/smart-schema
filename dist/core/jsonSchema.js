"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSONSchema = toJSONSchema;
function toJSONSchema(template, meta) {
    const schema = Object.assign({ type: "object", properties: {}, required: [] }, (meta || {}));
    for (const key in template) {
        const expected = template[key];
        const isOptional = key.endsWith("?");
        const cleanKey = isOptional ? key.slice(0, -1) : key;
        if (!isOptional)
            schema.required.push(cleanKey);
        // ตรวจว่า field มี metadata ฝังใน template หรือไม่
        if (typeof expected === "object" &&
            expected !== null &&
            !Array.isArray(expected) &&
            ("type" in expected || "description" in expected)) {
            schema.properties[cleanKey] = expected;
            continue;
        }
        // Literal / Enum
        if (Array.isArray(expected) &&
            expected.length > 0 &&
            typeof expected[0] !== "object") {
            schema.properties[cleanKey] = {
                type: typeof expected[0],
                enum: expected,
            };
        }
        // Array of objects
        else if (Array.isArray(expected)) {
            schema.properties[cleanKey] = {
                type: "array",
                items: expected.length > 0 ? toJSONSchema(expected[0]) : {},
            };
        }
        // Nested object
        else if (typeof expected === "object" && expected !== null) {
            schema.properties[cleanKey] = toJSONSchema(expected);
        }
        // Primitive
        else {
            schema.properties[cleanKey] = { type: typeof expected };
        }
    }
    return schema;
}
