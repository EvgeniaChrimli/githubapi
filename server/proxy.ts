import express from "express";
import dotenv from "dotenv";
const fetch = require("node-fetch");
import cors from "cors";

dotenv.config();

const app = express();
const TOKEN = process.env.API_TOKEN;

app.use(cors());

app.get("/api/*", async (req, res) => {
  const githubPath = req.path.replace("/api/", "");
  const queryString = req.originalUrl.split("?")[1] || "";
  const gitHubUrl = `https://api.github.com/${githubPath}${
    queryString ? "?" + queryString : ""
  }`;
  try {
    const response = await fetch(gitHubUrl, {
      headers: {
        Authorization: `Bearer  ${TOKEN}`,
        "User-Agent": "proxy-server",
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching from GitHub API", details: err });
  }
});

export default app;
