import BadRequestException from '#exceptions/bad_request_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Pedido from '#models/pedido'
import Usuario from '#models/usuario'
import { DateTime } from 'luxon'
import PedidoPayload from '../payloads/pedidoPayload.js'
import PedidoPutPayload from '../payloads/pedidoPutPayload.js'

export default class PedidoService {
  async buscarPedidoPorId(id_pedido: number) {
    const pedido = await Pedido.find(id_pedido)

    if (!pedido) {
      throw new ResourceNotFoundException('Pedido não encontrado')
    }

    pedido.load('produto')
    return pedido
  }

  async buscarPedidosPorComerciante(id_comerciante: number, pagina: number, quantidade: number) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    const pedidos = await Pedido.query()
      .whereHas('produto', (query) => {
        query.whereHas('produto', (query) => {
          query.where('comerciante_id', id_comerciante)
        })
      })
      .paginate(1, 10)

    return pedidos
  }

  async buscarPedidosPorUsuario(id: number, pagina: number, quantidade: number) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    let pedidos = await Pedido.query().where('usuario_id', id).paginate(pagina, quantidade)

    return pedidos
  }

  async criarPedido(id: number, pedido: PedidoPayload) {
    if (!pedido.produtos || pedido.produtos.length === 0) {
      throw new BadRequestException('Pedido sem produtos')
    }

    let usuario = await Usuario.find(id)
    if (!usuario) {
      throw new ResourceNotFoundException('Usuário não encontrado')
    }

    let novoPedido = new Pedido()

    novoPedido.obs = pedido.obs || ''
    novoPedido.subtotal = pedido.subtotal
    novoPedido.data_recebimento = DateTime.fromISO(pedido.data_recebimento.toISOString())
    novoPedido.data_pedido = DateTime.now()

    await novoPedido.related('usuario').associate(usuario)
    await novoPedido.save()

    await novoPedido.related('produto').createMany(
      await Promise.all(
        pedido.produtos.map(async (produto) => {
          if (!produto.id_produto || !produto.quantidade) {
            throw new BadRequestException('Produto sem id ou quantidade')
          }

          return {
            produto_id: produto.id_produto,
            quantidade: produto.quantidade,
          }
        })
      )
    )
    await novoPedido.load('produto')
    return novoPedido
  }

  async deletarPedido(id_pedido: number) {
    const pedido = await Pedido.find(id_pedido)

    if (!pedido) {
      throw new ResourceNotFoundException('Pedido não encontrado')
    }

    await pedido.delete()
  }

  async atualizarPedido(id_pedido: number, pedido: PedidoPutPayload) {
    const pedidoExistente = await Pedido.find(id_pedido)

    if (!pedidoExistente) {
      throw new ResourceNotFoundException('Pedido não encontrado')
    }

    pedidoExistente.merge(pedido)
    await pedidoExistente.save()

    return pedidoExistente
  }
}
