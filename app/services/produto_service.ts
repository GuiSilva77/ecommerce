import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Produto from '#models/produto'
import ProdutoPayload from '../payloads/produtoPayload.js'
import Comerciante from '#models/comerciante'
import UnauthorizedException from '#exceptions/unauthorized_exception'
import ProdutoPutPayload from '../payloads/produtoPutPayload.js'

export default class ProdutoService {
  async encontrarProdutoPorId(id: bigint | undefined) {
    const produto = await Produto.findBy('id', id)

    if (!produto) throw new ResourceNotFoundException('Produto não encontrado')

    await produto.load('categorias')
    return produto
  }

  async encontrarProdutosPorComerciante(
    comerciante_id: number,
    pagina: number,
    quantidade: number
  ) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    let produtos = await Produto.query()
      .where('id_comerciante', comerciante_id)
      .paginate(pagina, quantidade)

    return produtos
  }

  async criarProduto(id_comerciante: bigint | undefined, dados: ProdutoPayload) {
    const comerciante = await Comerciante.findBy('id_comerciante', id_comerciante)

    if (!comerciante) {
      throw new UnauthorizedException('Não Autorizado!')
    }

    let novoProduto = new Produto().merge(dados)

    await novoProduto.related('comerciante').associate(comerciante)

    novoProduto = await Produto.create(novoProduto)

    await novoProduto.related('categorias').createMany(dados.categorias)

    return novoProduto
  }

  async atualizarProduto(id: number, dados: ProdutoPutPayload) {
    const produto = await Produto.findBy('id', id)

    if (!produto) {
      throw new ResourceNotFoundException('Produto não encontrado!')
    }

    produto.merge(dados)

    await produto.load('categorias')
    if (dados.categorias && dados.categorias.length > 0) {
      /*

      await produto.related('categorias').sync(
        await produto.categorias.map((c) => {
          return c.id.toString()
        })
      )

      await dados.categorias.map(async (c) => {
        if (!c.id_categoria) {
          await produto.related('categorias').create(c)
        }
      })

      */
      /*
        Verificar se a categoria já existe no produto, se não existir, criar
        Se existir no produto mas não existir no payload, deletar
         - A categoria existente deve vir com o id, se não tiver id, é uma categoria nova
          - Se a categoria não tem id, ela é nova
        */
      await produto.related('categorias').sync(
        dados.categorias.map((c) => {
          return c.id_categoria?.toString() ?? ''
        })
      )

      dados.categorias.map(async (c) => {
        if (!c.id_categoria) {
          await produto.related('categorias').create(c)
        }
      })

      produto.categorias.map(async (pc) => {
        if (
          dados.categorias &&
          !dados.categorias.find((c) => {
            return c.id_categoria == pc.id
          })
        ) {
          await produto.related('categorias').detach([pc.id.toString()])
        }
      })
    }

    return await produto.save()
  }

  async deletarProduto(id: number) {
    const produto = await Produto.findBy('id', id)

    if (!produto) throw new ResourceNotFoundException('Produto não Encontrado!')

    await produto.delete()
  }

  async listarCategorias(id: number) {
    const produto = await Produto.findBy('id', id)

    if (!produto) throw new ResourceNotFoundException('Produto não Encontrado!')

    await produto.load('categorias')

    return produto.categorias
  }
}
