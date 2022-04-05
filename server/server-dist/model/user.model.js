"use strict";
const mongoose_1 = require("mongoose");
// Schema.Types.ObjectId
//Types.ObjectId
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: false,
    },
});
const User = (0, mongoose_1.model)("User", UserSchema);
module.exports = User;
