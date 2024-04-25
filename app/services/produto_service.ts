import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Produto from '#models/produto'
import ProdutoPayload from '../payloads/produtoPayload.js'

export default class ProdutoService {
  async encontrarProdutoPorId(id: bigint | undefined) {
    const produto = Produto.findBy('prod_id', id)

    if (!produto) throw new ResourceNotFoundException('Produto não encontrado')

    return produto
  }

  async encontrarProdutosPorComerciante(
    comerciante_id: number,
    pagina: number,
    quantidade: number
  ) {
    return await Produto.query()
      .where('id_comerciante', comerciante_id)
      .paginate(pagina, quantidade)
  }

  async criarProduto(dados: ProdutoPayload) {
    let novoProduto = new Produto().merge(dados)

    novoProduto.related('categorias').createMany(dados.categorias)

    return await Produto.create(novoProduto)
  }

  async atualizarProduto(id: number, dados: ProdutoPayload) {
    const produto = await Produto.findBy('prod_id', id)

    if (!produto) {
      throw new ResourceNotFoundException('Produto não encontrado!')
    }

    produto.merge(dados)
    if (dados.categorias) produto.related('categorias').updateOrCreateMany(dados.categorias)

    return await produto.save()
  }

  async deletarProduto(id: number) {
    const produto = await Produto.findBy('prod_id', id)

    if (!produto) throw new ResourceNotFoundException('Produto não Encontrado!')

    await produto.delete()
  }
}
