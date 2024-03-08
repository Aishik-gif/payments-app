const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    try {
        const user = await User.findOne({
            username: body.username,
        });

        if (user) {
            return res.status(411).json({
                message: "Email already taken/incorrect inputs",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error while checking for existing user",
        });
    }

    try {
        const dbUser = await User.create(body);

        await Account.create({
            userId: dbUser._id,
            balance: (1 + Math.random() * 10000000).toFixed(2),
        });

        const token = jwt.sign(
            {
                userId: dbUser._id,
            },
            JWT_SECRET
        );

        res.json({
            message: "User Created Successfully",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while creating user",
        });
    }
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in",
        });
    }

    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (user) {
            const token = jwt.sign(
                {
                    userId: user._id,
                },
                JWT_SECRET
            );

            res.json({
                token,
            });
            return;
        }
        
        res.status(411).json({
            message: "Error while logging in",
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while logging in",
        });
    }
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
        });
    }

    try {
        await User.updateOne(
            {
                _id: req.userId,
            },
            req.body
        );

        res.json({
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while updating user",
        });
    }
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: new RegExp(filter, "i"),
                },
            },
            {
                lastName: {
                    $regex: new RegExp(filter, "i"),
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

router.get("/me", authMiddleware, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.userId});

        res.json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            }
        });
    } catch(err) {
        res.status(404).json({
            message: "User not found"
        })
    }
})

module.exports = router;
