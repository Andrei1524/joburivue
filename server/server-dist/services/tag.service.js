"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.create = void 0;
const tag_model_1 = __importDefault(require("../model/tag.model"));
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTag = {
                name: payload.name,
            };
            return new tag_model_1.default(Object.assign({}, newTag)).save();
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.create = create;
function getAll(searchString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tags = null;
            if (searchString) {
                tags = tag_model_1.default.find({
                    name: {
                        $regex: searchString.replace(/[\\$'"]/g, "\\$&"),
                        $options: "i",
                    },
                }, {})
                    .lean()
                    .exec();
            }
            else {
                tags = tag_model_1.default.find({}).lean().exec();
            }
            return tags;
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.getAll = getAll;
