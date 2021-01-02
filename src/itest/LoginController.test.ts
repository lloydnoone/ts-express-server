import { request } from '../test/helper'

describe('LoginController test suite', () => {
  test('should get the login endpoint', async (done) => {
    request
    .get('/auth/login')
    .end((err: any, res: any) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})