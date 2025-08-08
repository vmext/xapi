import serverless from "serverless-http";
import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";

export const handler = serverless(app);
