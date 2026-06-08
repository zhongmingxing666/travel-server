import express from "express";
import travelService from "../services/travelService.js";
import { createStreamResponse } from "../utils/streamUtils.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  // return res.json({ message: "推荐景点", timestamp: new Date().toISOString() });
  const { city, budget, days } = req.body;
  if (!city || !budget || !days) {
    return res.status(400).json({ success: false, error: "参数缺失" });
  }
  const result = await travelService.recommend(city, budget, days);
  return res.json(result);
});
router.post("/chat", async (req, res) => {
  // return res.json({ message: "聊天", timestamp: new Date().toISOString() });
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: "参数缺失" });
  }
  //采用SSE流式接口
  const stream = createStreamResponse(res);
  const result = await travelService.chat(message, (chunk) => {
    stream.send({ type: "chunk", content: chunk });
  });
  stream.send({ type: "complete", data: result });
  stream.end();
});

export default router;
