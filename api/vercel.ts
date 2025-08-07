import type { VercelRequest, VercelResponse } from '@vercel/node'
import app from '../src/app'
import { createServer } from 'http'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = createServer(app.callback())
  server.listen(0, () => {
    server.emit('request', req, res)
  })
}
