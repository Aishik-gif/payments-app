const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        res.json({
            balance: account.balance,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while retrieving account balance",
        });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(
            session
        );

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Acccount / insufficient balance",
            });
        }

        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transcation successful",
        });
    } catch (err) {
        res.status(411).json({
            message: "Error while transferring",
        });
    }
});

module.exports = router;
