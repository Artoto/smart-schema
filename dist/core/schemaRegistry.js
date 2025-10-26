"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaRegistry = void 0;
class SchemaRegistry {
    static register(name, validator) {
        if (this.registry.has(name)) {
            throw new Error(`Schema ${name} already registered.`);
        }
        this.registry.set(name, validator);
    }
    static get(name) {
        return this.registry.get(name);
    }
    static validate(name, data) {
        const validator = this.get(name);
        if (!validator)
            throw new Error(`Schema ${name} not found.`);
        return validator(data);
    }
    static list() {
        return Array.from(this.registry.keys());
    }
}
exports.SchemaRegistry = SchemaRegistry;
SchemaRegistry.registry = new Map();
