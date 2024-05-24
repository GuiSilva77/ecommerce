import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AlreadyExistsException extends Exception {
  static status = 409
  static code = 'ALREADY_EXISTS'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({code: error.code, status: error.status, message: error.message})
  }
}
