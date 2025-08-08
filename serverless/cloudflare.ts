import app from '../src/app'
import { createServer } from 'http'

export default {
  async fetch(request: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      const server = createServer(app.callback())
      const { method, headers } = request
      const req = new Request(request.url, { method, headers })
      const res = {
        writeHead(status: number, headers: any) {
          this.status = status
          this.headers = headers
        },  
        end(body: string) {
          resolve(new Response(body, { status: this.status, headers: this.headers }))
        },
        status: 200,
        headers: {}
      }

      server.emit('request', req, res)
    })
  }
}
