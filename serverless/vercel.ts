//import serverless from "serverless-http"
import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  app.callback()(req, res);
}
//export default serverless(app);
