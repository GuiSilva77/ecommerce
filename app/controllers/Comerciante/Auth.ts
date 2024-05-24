import AuthComercianteService from '#services/Comerciante/auth_comerciante_service'
import { AuthComercianteValidador } from '#validators/Comerciante/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthComercianteController {
  constructor(protected comercianteService: AuthComercianteService) {}

  public async criar({ request }: HttpContext) {
    const data = request.body()
    const payload = await AuthComercianteValidador.validate(data)
    const result = await this.comercianteService.create(payload)

    return result
  }

  public async deletar({ auth, response }: HttpContext){
    const comerciante = auth.use('comerciante').user

    if (!comerciante) return

    await this.comercianteService.delete(comerciante)

    return response.status(200).send('Sessão finalizada')
  }
}
//cnpj 22071709000110
