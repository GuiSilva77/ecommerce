import EstoqueService from '#services/Estoque/main'
import { estoqueCriarEntradaValidador } from '#validators/Estoque/criar_entrada'
import { estoqueCriarSaidaValidador } from '#validators/Estoque/criar_saida'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { atualizarEntradaValidador } from '#validators/Estoque/atualizar_entrada'
import { atualizarSaidaValidador } from '#validators/Estoque/atualizar_saida'

@inject()
export default class EstoqueController {
  constructor(protected estoqueService: EstoqueService) {}

  async buscarLancamentos({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const { produtoIds, filtro, pagina, quantidade } = request.only([
      'produtoIds',
      'filtro',
      'pagina',
      'quantidade',
    ])

    const lancamentos = await this.estoqueService.buscarLancamentos(
      id_comerciante,
      produtoIds,
      filtro,
      pagina,
      quantidade
    )

    return response.ok(lancamentos)
  }

  async buscarLancamentoPorId({ request, response }: HttpContext) {
    const id = request.param('id')
    const { tipo } = request.only(['tipo'])

    const lancamento = await this.estoqueService.buscarLancamentoPorId(id, tipo)

    return response.ok(lancamento)
  }

  async criarLancamento({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const { tipo } = request.only(['tipo'])

    let payload, resultado
    if (tipo === 'entrada') {
      payload = await request.validateUsing(estoqueCriarEntradaValidador)
      resultado = await this.estoqueService.criarLancamentoEntrada(id_comerciante, payload)
    } else {
      payload = await request.validateUsing(estoqueCriarSaidaValidador)
      resultado = await this.estoqueService.criarLancamentoSaida(id_comerciante, payload)
    }

    return response.ok(resultado)
  }

  async atualizarLancamento({ request, response, auth }: HttpContext) {
    const id = request.param('id')
    const { tipo } = request.only(['tipo'])

    let payload, resultado
    if (tipo === 'entrada') {
      payload = await request.validateUsing(atualizarEntradaValidador)
      resultado = await this.estoqueService.atualizarLancamentoEntrada(id, payload)
    } else {
      payload = await request.validateUsing(atualizarSaidaValidador)
      resultado = await this.estoqueService.atualizarLancamentoSaida(id, payload)
    }

    return response.ok(resultado)
  }

  async deletarLancamento({ request, response, auth }: HttpContext) {
    const id = request.param('id')
    const { tipo } = request.only(['tipo'])

    await this.estoqueService.deletarLancamento(id, tipo)

    return response.ok({
      codigo: 200,
      mensagem: 'Lançamento deletado com sucesso',
    })
  }

  async buscarStatusDeProdutos({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const { produtoIds } = request.only(['produtoIds'])

    const statusDeProdutos = await this.estoqueService.buscarStatusDeProdutos(
      id_comerciante,
      produtoIds
    )

    return response.ok(statusDeProdutos)
  }

  async buscarStatusDeProdutoPorId({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const id = request.param('id')

    const statusDeProduto = await this.estoqueService.buscarStatusDeProdutoPorId(id_comerciante, id)

    return response.ok(statusDeProduto)
  }

  async buscarLancamentosDeProdutoPorId({ request, response, auth }: HttpContext) {
    const id_comerciante = auth.getUserOrFail().currentAccessToken.tokenableId as number
    const id = request.param('id')
    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const lancamentos = await this.estoqueService.buscarLancamentosDeProdutoPorId(
      id_comerciante,
      id,
      pagina,
      quantidade
    )

    return response.ok(lancamentos)
  }
}
