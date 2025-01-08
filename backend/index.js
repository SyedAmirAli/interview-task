import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Mock admin user
const ADMIN_USER = {
    id: 1,
    email: "admin@example.com",
    password: "admin123", // In production, this should be hashed
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// Login route
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        const token = jwt.sign(
            { id: ADMIN_USER.id, email: ADMIN_USER.email },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });

        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Protected route example
app.get("/api/dashboard", authenticateToken, (req, res) => {
    res.json({
        stats: {
            users: 120,
            orders: 450,
            revenue: 25000,
        },
    });
});

// Logout route
app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
