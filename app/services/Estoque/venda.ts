import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Comerciante from '#models/comerciante'
import EntradaEstoque from '#models/entrada_estoque'
import Pedido from '#models/pedido'
import PedidoProduto from '#models/pedido_produto'
import Venda from '#models/venda'
import { DateTime } from 'luxon'

type VendaPayload = {
  total: number
  descontos: number
  pedidoId: number
  comercianteId: number
}

type VendaPutPayload = {
  total: number | undefined
  descontos: number | undefined
  pedidoId: number | undefined
  comercianteId: number | undefined
}

export default class VendaService {
  async buscarVendas(comerciante_id: number, pagina: number, quantidade: number) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    const vendas = await Venda.query()
      .where('comerciante_id', comerciante_id)
      .paginate(pagina, quantidade)

    return vendas
  }

  async buscarVenda(venda_id: number) {
    const venda = await Venda.find(venda_id)
    if (!venda) throw new ResourceNotFoundException('Venda não encontrada')
    return venda
  }

  async criarVenda(payload: VendaPayload) {
    const comerciante = await Comerciante.find(payload.comercianteId)
    const pedido = await Pedido.find(payload.pedidoId)

    if (!comerciante || !pedido)
      throw new ResourceNotFoundException('Comerciante ou pedido não encontrado')

    const venda = new Venda().merge({ ...payload, data_venda: DateTime.now() })

    await venda.save()

    await pedido.load('produto')

    pedido.produto.forEach(async (produto) =>
      venda.related('saida_estoques').create({
        quantidade: produto.quantidade,
        lote: await getLote(produto),
        produtoId: produto.id as unknown as number,
        comercianteIdComerciante: payload.comercianteId as unknown as bigint,
        data_lancamento: DateTime.now(),
        motivo: 'VENDA',
      })
    )

    return venda

    async function getLote(produto: PedidoProduto): Promise<string> {
      const lancamento = await EntradaEstoque.query().where('produto_id', produto.produtoId).first()
      return lancamento?.lote || ''
    }
  }

  async atualizarVenda(venda_id: number, payload: VendaPutPayload) {
    const venda = await Venda.find(venda_id)
    if (!venda) throw new ResourceNotFoundException('Venda não encontrada')

    venda.merge(payload)

    await venda.save()

    return venda
  }

  async deletarVenda(venda_id: number) {
    const venda = await Venda.find(venda_id)
    if (!venda) throw new ResourceNotFoundException('Venda não encontrada')
    await venda.delete()
  }
}
