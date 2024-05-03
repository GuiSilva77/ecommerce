import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ResourceNotFoundException extends Exception {
  static status = 404
  static code = 'RESOURCE_NOT_FOUND'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      codigo: error.status,
      mensagem: error.message,
      timestamp: new Date().toISOString(),
    })
  }
}
