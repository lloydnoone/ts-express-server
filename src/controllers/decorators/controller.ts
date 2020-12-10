import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance()
    
    for (let key in target.prototype) {
      // get each piece of metadata of each key
      const routeHandler = target.prototype[key]
      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      )

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype,
        key
      ) || []

      if (path) {
        //set each http method on router with path, handler and middlewares
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler)
      }
    }
  }
}