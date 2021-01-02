import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import { AddressInfo, Server } from 'net'

import './controllers/LoginController'
import './controllers/RootController'

export class App {
  private app: express.Express = express()
  private port: number = 0
  private server: Server | null = null

  public getApp(): express.Express {
    return this.app
  }

  public ApplyMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieSession({ keys: ['alsdfsdf'] }))
    this.app.use(AppRouter.getInstance())
  }

  public startServer(): void {
    const server = this.app.listen(3000, () => {
      const { port } = server.address() as AddressInfo
      this.port = port
      console.log('Listening on port ' + this.port)
    })
    this.server = server
  }

  public getPort(): number {
    return this.port
  }

  public closeServer(): void {
    if (this.server) this.server.close()
  }
}