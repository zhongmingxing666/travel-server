export const createStreamResponse = (res) => {
  //设置响应头
  res.setHeader("Content-Type", "text/event-stream");
  //确保客户端接收最新的数据
  res.setHeader("Cache-Control", "no-cache");
  //保持连接打开，避免客户端关闭连接
  res.setHeader("Connection", "keep-alive");
  return {
    send: (data) => {
      try {
        console.log(`发送数据: ${JSON.stringify(data)}`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (err) {
        console.error("流式数据发送失败:", err);
      }
    },
    end: () => {
        try{
          res.write(`event: end\ndata: {"done": true}\n\n`);
          res.end();
        }catch(err){
          console.error("流式数据结束失败:", err);
        }
    },
    error: (message) => {
      try{
        res.write(`data: ${JSON.stringify(message)}\n\n`);
        res.end();
      }catch(err){
        console.error("流式数据错误:", err);
      }
    },
  };
};
