import ProdutoService from '#services/produto_service'
import { criarValidador } from '#validators/Produto/criar'
import { encontrarValidador } from '#validators/Produto/encontrar'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  constructor(protected produtoService: ProdutoService) {}

  async encontrarProdutoPorId({ request, response }: HttpContext) {
    const id = request.param('id')

    const produto = await this.produtoService.encontrarProdutoPorId(id)

    return response.ok(produto)
  }

  async encontrarProdutos({ request, response }: HttpContext) {
    const comercianteId = request.param('id')
    const linhaDeBusca = await encontrarValidador.validate(request.qs())

    const produtos = await this.produtoService.encontrarProdutosPorComerciante(
      comercianteId,
      linhaDeBusca.pagina,
      linhaDeBusca.quantidade
    )

    return response.ok(produtos)
  }

  async criarProduto({ request, response }: HttpContext) {
    const dadosValidados = await request.validateUsing(criarValidador)

    const produto = await this.produtoService.criarProduto(dadosValidados)

    return response.created(produto)
  }

  async atualizarProduto({ request, response }: HttpContext) {
    const id = request.param('id')
    const dadosValidados = await request.validateUsing(criarValidador)

    const produto = await this.produtoService.atualizarProduto(id, dadosValidados)

    return response.ok(produto)
  }

  async deletarProduto({ request, response }: HttpContext) {
    const id = request.param('id')

    await this.produtoService.deletarProduto(id)

    return response.noContent()
  }
}
