import PedidoService from '#services/pedido_service'
import { atualizarPedidoValidador } from '#validators/Pedidos/atualizar'
import { criarPedidoValidador } from '#validators/Pedidos/criar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PedidosController {
  constructor(protected pedidoService: PedidoService) {}

  async buscarPedidoPorId({ request, response }: HttpContext) {
    const id = request.param('id')
    const resultado = await this.pedidoService.buscarPedidoPorId(id)
    return response.ok(resultado)
  }

  async buscarPedidosPorUsuario({ request, response, auth }: HttpContext) {
    const id_usuario = auth.getUserOrFail().currentAccessToken.tokenableId as number

    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const resultado = await this.pedidoService.buscarPedidosPorUsuario(
      id_usuario,
      pagina,
      quantidade
    )
    return response.ok(resultado)
  }

  async buscarPedidosPorComerciante({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number

    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const resultado = await this.pedidoService.buscarPedidosPorComerciante(
      id_comerciante,
      pagina,
      quantidade
    )
    return response.ok(resultado)
  }

  async criarPedido({ request, response, auth }: HttpContext) {
    const id = auth.user?.currentAccessToken.tokenableId as number
    const payload = await request.validateUsing(criarPedidoValidador)
    const resultado = await this.pedidoService.criarPedido(id, payload)
    return response.created(resultado)
  }

  async atualizarPedido({ request, response, auth }: HttpContext) {
    const id = request.param('id')
    const payload = await request.validateUsing(atualizarPedidoValidador)
    const resultado = await this.pedidoService.atualizarPedido(id, payload)
    return response.ok(resultado)
  }

  async deletarPedido({ request, response, auth }: HttpContext) {
    const id = request.param('id')
    const resultado = await this.pedidoService.deletarPedido(id)
    return response.ok(resultado)
  }
}
