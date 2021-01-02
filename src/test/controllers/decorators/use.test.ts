import 'reflect-metadata'
import { use } from '../../../app/controllers/decorators/use'

function testMiddleware() {}
function anotherMiddleware() {}

describe('use decorator test suite', () => {
  test('Should apply middleware as Metadata on a function', () => {
    class TestClass {
      @use(testMiddleware)
      testFunc(): void {}
    }

    const middlewares = Reflect.getMetadata(
      'middleware',
      TestClass.prototype,
      'testFunc'
    ) || []
    expect(middlewares).toEqual([testMiddleware])
  })

  test('Should handle multple middlewares correctly', () => {
    class TestClass {
      @use(testMiddleware)
      @use(anotherMiddleware)
      testFunc(): void {}
    }

    const middlewares = Reflect.getMetadata(
      'middleware',
      TestClass.prototype,
      'testFunc'
    ) || []
    expect(middlewares).toEqual([anotherMiddleware, testMiddleware])
  })
})

