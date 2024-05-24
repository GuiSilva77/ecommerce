import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UploadFailureException extends Exception {
  static status = 500
  static code = 'UPDATE_FAILURE'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({code: error.code, status: error.status, message: error.message})
  }
}
