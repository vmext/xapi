//import type { VercelRequest, VercelResponse } from '@vercel/node'
import serverless from "serverless-http"
import app from '../src/app'

/* export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = createServer(app.callback())
  server.listen(0, () => {
    server.emit('request', req, res)
  })
} */
export default serverless(app);
//export default app.callback(); 