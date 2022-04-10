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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobValidate = exports.create = void 0;
const { check, validationResult } = require("express-validator");
const createJobValidate = [
    check("title")
        .exists()
        .withMessage("Jobul trebuie sa contina un titlu!")
        .isLength({ min: 8 })
        .withMessage("Titlul trebuie sa fie de cel putin 8 caractere!")
        .trim()
        .escape()
        .normalizeEmail(),
    check("type")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Specificati tipul jobului!"),
    check("description")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati o descriere!"),
    check("location")
        .custom((value, { req }) => {
        if (value && value.length > 0) {
            return true;
        }
        else {
            return req.body.remoteType === "remote_only";
        }
    }) // TODO: add remote types to a TS types
        .withMessage("Locatia este necesara daca jobul este optional remote!"),
    check("howToApply")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati instructiuni de aplicare!"),
    check("applicationTarget")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati p metoda de aplicare!"),
];
exports.createJobValidate = createJobValidate;
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            return res.status(200).json("job created");
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: 400, message: error.message });
            }
            else {
                return res.status(400).json({ status: 400, message: error });
            }
        }
    });
}
exports.create = create;
