"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendValidator = extendValidator;
const createValidator_1 = require("./createValidator");
function extendValidator(baseValidator, extendsionTemplate) {
    const extendsValidator = (data) => {
        if (!baseValidator(data))
            return false;
        const extendsionValidator = (0, createValidator_1.createValidator)(extendsionTemplate);
        return extendsionValidator(data);
    };
    return extendsValidator;
}
