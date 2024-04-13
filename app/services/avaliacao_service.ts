import Avaliacao from '#models/avaliacao'
import db from '@adonisjs/lucid/services/db'

export default class AvaliacaoService {
  async encontrarPorComerciante_Id(id: number, pagina: number, quantidade: number) {
    return await db
      .from('avaliacoes')
      .where('comerciante_id', String(id))
      .orderBy('data_mod', 'desc')
      .paginate(pagina, quantidade)
  }

  async criarAvaliacao(avaliacao: Partial<Avaliacao>) {
    return await Avaliacao.create(avaliacao)
  }

  async atualizar(id: bigint, carga: Partial<Avaliacao>) {
    return await Avaliacao.updateOrCreate({ ava_id: id }, carga)
  }

  async deletar(id: bigint, carga: Partial<Avaliacao>) {
    const avaliacao = await Avaliacao.findBy('ava_id', id)

    return await avaliacao?.delete()
  }
}
