const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://admin:Fighter1234@cluster0.d4rccxy.mongodb.net/paytm-app"
);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountsSchema);

module.exports = { User, Account };
