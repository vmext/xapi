//import serverless from "serverless-http";
//import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
 
//export const handler = serverless(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});