import 'reflect-metadata'
import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    // get middlewares that have already been added or return empty array
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target,
      key
    ) || []

    // then add the current middleware to the array and set that as new metadata
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    )
  }
}