import type { Response } from "express";
import { Request, onRequest } from "firebase-functions/https";

export const syncSubscriber = onRequest((req: Request, res: Response) => {
  res.send({
    message: "Subscriber synced",
    timestamp: new Date().toISOString(),
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
  });
});
