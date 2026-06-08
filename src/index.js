import express from "express";
import travelRouter from "./routes/travel.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3300;
// 中间件，解析请求体为 JSON
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/heartbeat", (req, res) => {
  res.json({ message: "服务正常运行", timestamp: new Date().toISOString() });
});

app.use("/api/travel", travelRouter);

app.listen(port, () => {
  console.log(`服务已启动，监听端口 http://localhost:${port}`);
});
