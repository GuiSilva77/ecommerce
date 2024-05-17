import BadRequestException from '#exceptions/bad_request_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import EntradaEstoque from '#models/entrada_estoque'
import SaidaEstoque from '#models/saida_estoque'
import { DateTime } from 'luxon'
import Comerciante from '#models/comerciante'
import Produto from '#models/produto'

type EntradaEstoquePayload = {
  quantidade: number
  produtoId: number
  validade: Date
  lote: string
}

type SaidaEstoquePayload = {
  quantidade: number
  lote: string
  produtoId: number
  motivo: string | null
}

type EntradaEstoquePutPayload = {
  quantidade: number | undefined
  produtoId: number | undefined
  validade: Date | undefined
  lote: string | undefined
}

type SaidaEstoquePutPayload = {
  quantidade: number | undefined
  lote: string | undefined
  motivo: string | null | undefined
  vendaId: number | null | undefined
}

export default class EstoqueService {
  async buscarLancamentos(
    comerciante_id: number,
    produtoIds: string[],
    filtro: string,
    pagina: number,
    quantidade: number
  ) {
    pagina = pagina || 1
    quantidade = quantidade || 10
    produtoIds = produtoIds || ''
    filtro = filtro || 'entrada,saida,venda'
    const filtroTransformado = filtro.split(',')

    const entradaEstoques =
      filtroTransformado.includes('entrada') && produtoIds.length > 0
        ? await EntradaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .whereIn('produto_id', produtoIds)
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)
        : await EntradaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)

    const saidaEstoques =
      filtroTransformado.includes('saida') && produtoIds.length > 0
        ? await SaidaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .whereIn('produto_id', produtoIds)
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)
        : await SaidaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)

    const vendas =
      filtroTransformado.includes('venda') && produtoIds.length > 0
        ? await SaidaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .whereIn('produto_id', produtoIds)
            .where('motivo', 'VENDA')
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)
        : await SaidaEstoque.query()
            .where('comerciante_id', comerciante_id)
            .where('motivo', 'VENDA')
            .orderBy('data_criacao', 'desc')
            .paginate(pagina, quantidade)

    return {
      quantidade: quantidade,
      pagina: pagina,
      data: {
        entradaEstoques,
        saidaEstoques,
        vendas,
      },
    }
  }

  async buscarLancamentoPorId(id_lancamento: number, tipo: 'entrada' | 'saida') {
    if (tipo !== 'entrada' && tipo !== 'saida')
      throw new BadRequestException('Tipo de lançamento inválido')

    let resultado
    if (tipo === 'entrada') resultado = await EntradaEstoque.find(id_lancamento)
    else if (tipo === 'saida') resultado = await SaidaEstoque.find(id_lancamento)

    if (!resultado) throw new ResourceNotFoundException('Lançamento não encontrado')

    return resultado
  }

  async criarLancamentoEntrada(comerciante_id: number, payload: EntradaEstoquePayload) {
    const comerciante = await Comerciante.find(comerciante_id)
    const produto = await Produto.find(payload.produtoId)

    if (!comerciante || !produto) throw new BadRequestException('Entidade não encontrada!')

    let novoLancamento = new EntradaEstoque().merge({
      ...payload,
      validade: DateTime.fromJSDate(payload.validade),
      data_lancamento: DateTime.now(),
    })

    await novoLancamento.related('comerciante').associate(comerciante)
    await novoLancamento.save()

    return novoLancamento
  }

  async criarLancamentoSaida(comerciante_id: number, payload: SaidaEstoquePayload) {
    const comerciante = await Comerciante.find(comerciante_id)
    const produto = await Produto.find(payload.produtoId)

    if (!comerciante || !produto) throw new BadRequestException('Entidade não encontrada!')

    let novoLancamento = new SaidaEstoque().merge({
      ...payload,
      data_lancamento: DateTime.now(),
    })

    await novoLancamento.related('comerciante').associate(comerciante)
    await novoLancamento.save()

    return novoLancamento
  }

  async atualizarLancamentoEntrada(id_lancamento: number, payload: EntradaEstoquePutPayload) {
    let lancamento = await EntradaEstoque.find(id_lancamento)

    if (!lancamento) throw new ResourceNotFoundException('Lançamento não encontrado')

    await lancamento
      .merge({
        ...payload,
        validade: payload.validade ? DateTime.fromJSDate(payload.validade) : undefined,
      })
      .save()

    return lancamento
  }

  async atualizarLancamentoSaida(id_lancamento: number, payload: SaidaEstoquePutPayload) {
    let lancamento = await SaidaEstoque.find(id_lancamento)

    if (!lancamento) throw new ResourceNotFoundException('Lançamento não encontrado')

    await lancamento
      .merge({
        ...payload,
        vendaId: payload.vendaId || null,
      })
      .save()

    return lancamento
  }

  async deletarLancamento(id_lancamento: number, tipo: 'entrada' | 'saida') {
    if (tipo !== 'entrada' && tipo !== 'saida')
      throw new BadRequestException('Tipo de lançamento inválido')

    let resultado
    if (tipo === 'entrada') resultado = await EntradaEstoque.find(id_lancamento)
    else if (tipo === 'saida') resultado = await SaidaEstoque.find(id_lancamento)

    if (!resultado) throw new ResourceNotFoundException('Lançamento não encontrado')

    await resultado.delete()
  }

  async buscarStatusDeProdutos(comerciante_id: number, produtoIds: string[]) {
    const entradas = await EntradaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .whereIn('produto_id', produtoIds)
      .select('produto_id', 'quantidade', 'data_criacao')

    const saidas = await SaidaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .whereIn('produto_id', produtoIds)
      .select('produto_id', 'quantidade', 'data_criacao')

    const statusDeProdutos = await produtoIds.map((produtoId) => {
      const entradasProduto = entradas.filter(
        (entrada) => entrada.produtoId.toString() === produtoId
      )
      const saidasProduto = saidas.filter((saida) => saida.produtoId.toString() === produtoId)

      const saldo =
        entradasProduto.reduce((acc, entrada) => acc + entrada.quantidade, 0) -
        saidasProduto.reduce((acc, saida) => acc + saida.quantidade, 0)

      return {
        produto_id: produtoId,
        saldo,
        entradas: entradasProduto,
        saidas: saidasProduto,
      }
    })
    return statusDeProdutos
  }
  async buscarStatusDeProdutoPorId(comerciante_id: number, produto_id: number) {
    const entradas = await EntradaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .where('produto_id', produto_id)
      .select('produto_id', 'quantidade', 'data_criacao')

    const saidas = await SaidaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .where('produto_id', produto_id)
      .select('produto_id', 'quantidade', 'data_criacao')

    const saldo =
      entradas.reduce((acc, entrada) => acc + entrada.quantidade, 0) -
      saidas.reduce((acc, saida) => acc + saida.quantidade, 0)

    return {
      produto_id,
      saldo,
      entradas,
      saidas,
    }
  }

  async buscarLancamentosDeProdutoPorId(
    comerciante_id: number,
    produto_id: number,
    pagina: number,
    quantidade: number
  ) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    const entradas = await EntradaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .where('produto_id', produto_id)
      .orderBy('data_criacao', 'desc')
      .paginate(pagina, quantidade)

    const saidas = await SaidaEstoque.query()
      .where('comerciante_id', comerciante_id)
      .where('produto_id', produto_id)
      .orderBy('data_criacao', 'desc')
      .paginate(pagina, quantidade)

    return {
      quantidade,
      pagina,
      data: {
        entradas,
        saidas,
      },
    }
  }
}
