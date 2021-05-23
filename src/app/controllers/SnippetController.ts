import { Request, Response } from 'express'
import { controller, bodyValidator, post } from './decorators'
import { Controller } from '../controllers/Controller'

@controller('')
export class SnippetController extends Controller {
  @post('/snippets')
  @bodyValidator('snippet')
  postSnippet(req: Request, res: Response): void {
    const { snippet } = req.body
    console.log('typeof snippet: ', typeof snippet)
    if (snippet !== '') {
      res.status(200).send('valid snippet received.')
    } else {
      res.status(422).send('Invalid snippet received.')
    }
  }
}