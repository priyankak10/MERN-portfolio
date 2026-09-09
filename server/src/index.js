import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db.js";
import { profile } from "./data/profile.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Server running at http://localhost:${port}`);
});
