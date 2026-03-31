import express from "express";
import dotenv from "dotenv";

dotenv.config();

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

const app = express();

console.log("Starting app...");
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI exists =", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists =", !!process.env.JWT_SECRET);

async function startServer() {
    try {
        const PORT = process.env.PORT || 10000;

        app.get("/", (req, res) => {
            res.send("Server running");
        });

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("STARTUP ERROR:", error);
        process.exit(1);
    }
}

startServer();