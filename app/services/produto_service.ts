import Produto from '#models/produto'
import ProdutoPayload from '../payloads/produtoPayload.js'

export default class ProdutoService {
  async encontrarProdutoPorId(id: number) {
    return await Produto.findByOrFail('prod_id', id)
  }

  async encontrarProdutosPorComerciante(
    comerciante_id: number,
    pagina: number,
    quantidade: number
  ) {
    return await Produto.query()
      .where('comerciante_id', comerciante_id)
      .paginate(pagina, quantidade)
  }

  async criarProduto(dados: ProdutoPayload) {
    let novoProduto = new Produto().merge(dados)

    novoProduto.related('categorias').createMany(dados.categorias)

    return await Produto.create(novoProduto)
  }

  async atualizarProduto(id: number, dados: ProdutoPayload) {
    if (!(await Produto.findBy('prod_id', id))) {
      throw new Error('Produto não encontrado')
    }

    const produto = await Produto.findByOrFail('prod_id', id)

    produto.merge(dados)

    await produto.save()
  }

  async deletarProduto(id: number) {
    const produto = await Produto.findByOrFail('prod_id', id)

    await produto.delete()
  }
}
