import ComercianteService from '#services/Implementation/comerciante_service'
import { cadastroComercianteValidador } from '#validators/Comerciante/criar'
import type { HttpContext } from '@adonisjs/core/http'

export default class MainController {
  constructor(protected comercianteService: ComercianteService) {}

  public async store({ request }: HttpContext) {
    const data = request.all()
    const payload = cadastroComercianteValidador.validate(data)
  }
}
