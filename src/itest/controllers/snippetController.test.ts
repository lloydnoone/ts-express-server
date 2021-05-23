import { request } from '../../test/helper'
import { Response } from 'supertest';

const snippetCorrect = {
  snippet: "const Users = code"
}

const snippetIncorrect = {
  snippet: ""
}

describe('POST /snippets', () => {
  test('should return a 422 unproccessible entity response for snippet that isnt a string', async (done) => {
    request
      .post('/snippets')
      .type('form')
      .send(snippetIncorrect)
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(422)
        done()
      })
  })

  test('should return a 200 ok response for a snippet that is a string', async (done) => {
    request
      .post('/snippets')
      .type('form')
      .send(snippetCorrect)
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(200)
        done()
      })
  })
})