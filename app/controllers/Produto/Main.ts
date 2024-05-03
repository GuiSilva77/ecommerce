import ProdutoService from '#services/produto_service'
import { criarValidador } from '#validators/Produto/criar'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProdutosController {
  constructor(protected produtoService: ProdutoService) {}

  async encontrarProdutoPorId({ request, response }: HttpContext) {
    const id = parseInt(request.param('id'))

    const produto = await this.produtoService.encontrarProdutoPorId(id)

    return response.ok(produto)
  }

  async encontrarProdutos({ request, response }: HttpContext) {
    const comercianteId = request.param('id')

    const { pagina, quantidade } = request.only(['pagina', 'quantidade'])

    const produtos = await this.produtoService.encontrarProdutosPorComerciante(
      comercianteId,
      pagina,
      quantidade
    )

    return response.ok(produtos)
  }

  async criarProduto({ request, response, auth }: HttpContext) {
    const dadosValidados = await request.validateUsing(criarValidador)

    const id_comerciante: bigint | undefined = auth.user?.currentAccessToken.identifier
    const produto = await this.produtoService.criarProduto(id_comerciante, dadosValidados)

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

    return response.ok({})
  }

  async listarCategoria({ request, response }: HttpContext) {
    const id = request.param('id')

    const categorias = await this.produtoService.listarCategorias(id)

    return response.ok(categorias)
  }
}
