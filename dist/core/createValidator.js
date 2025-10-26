"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = createValidator;
function createValidator(template) {
    const validator = (data) => {
        if (typeof data !== "object" || data === null)
            return false;
        for (const key in template) {
            const expencted = template[key];
            const value = data[key];
            const isOptional = key.endsWith("?");
            const cleanKey = isOptional ? key.slice(0, -1) : key;
            if (isOptional && !(cleanKey in data))
                continue;
            //Literal && Enum
            if (Array.isArray(expencted) &&
                expencted.length > 0 &&
                typeof expencted[0] !== "object") {
                if (!expencted.includes(value))
                    return false;
            }
            //Array of object
            else if (Array.isArray(expencted)) {
                if (!Array.isArray(value))
                    return false;
                if (expencted.length > 0) {
                    const itemValidator = createValidator(expencted[0]);
                    for (const item of value) {
                        if (!itemValidator(item))
                            return false;
                    }
                }
            }
            //Nested object
            else if (typeof expencted === "object" && expencted !== null) {
                if (!createValidator(expencted)(value))
                    return false;
            }
            //Primitive
            else if (typeof value !== typeof expencted) {
                return false;
            }
        }
        return true;
    };
    return validator;
}
