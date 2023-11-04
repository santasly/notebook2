"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const joi_1 = __importDefault(require("joi"));
exports.Notes = joi_1.default.object({
    title: joi_1.default.string().required().min(3).max(30),
    description: joi_1.default.string().required().min(3).max(30),
    content: joi_1.default.string().required().min(150).max(5000),
});
