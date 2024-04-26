import MainComercianteService from '#services/Comerciante/main_comerciante_service'
import { alteraComercianteValidador } from '#validators/Comerciante/alterar'
import { cadastroComercianteValidador } from '#validators/Comerciante/criar'
import { pesquisaComercianteValidator } from '#validators/Comerciante/encontrar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MainComercianteController {
  constructor(protected comercianteService: MainComercianteService) {}

  public async criar({ request }: HttpContext) {
    const data = request.body()
    const payload = await cadastroComercianteValidador.validate(data)
    const result = await this.comercianteService.create(payload)

    return result
  }

  public async index({ request }: HttpContext){
    const data = request.param('id')
    console.log(data)
    const id = await pesquisaComercianteValidator.validate(data)
    const result = await this.comercianteService.search(id)

    return result
  }

  public async alterar({ request, auth }: HttpContext){
    await auth.use('comerciante').authenticate()
    const comerciante = await auth.use('comerciante').user
    const data = request.body()
    console.log(comerciante?.id_comerciante)
    const payload = await alteraComercianteValidador.validate(data)
    const result = await this.comercianteService.update(payload, comerciante?.id_comerciante!)

    return result
  }
}
//cnpj 22071709000110
