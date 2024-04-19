import ComercianteService from '#services/comerciante_service'
import { cadastroComercianteValidador } from '#validators/Comerciante/criar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MainComercianteController {
  constructor(protected comercianteService: ComercianteService) {}

  public async criar({ request }: HttpContext) {
    console.log('chegou aqui')
    const data = request.body()
    console.log(data)
    const payload = await cadastroComercianteValidador.validate(data)

    const result = await this.comercianteService.create(payload)

    return result
  }
}
//cnpj 22071709000110
