import express from "express";
import { getUserByEmail, createUser } from "../db/users";  // Ensure correct path
import { authentication, random } from "../helpers/helpers"; // Ensure correct path
import crypto from "crypto";  // For password hashing

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        // Check if any required fields are missing
        if (!email || !password || !username) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Generate salt and hash the password
        const salt = random();  // Ensure `random()` returns a valid salt
        const hashedPassword = crypto
            .createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        // Create new user
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        return res.status(201).json(user);  // 201 is more appropriate for resource creation
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal Server Error" });  // 500 for unexpected errors
    }
};
