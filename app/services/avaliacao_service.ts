import Avaliacao from '#models/avaliacao'
import db from '@adonisjs/lucid/services/db'

export default class AvaliacaoService {
  async encontrarPorid_comerciante(id: number, pagina: number, quantidade: number) {
    return await db
      .from('avaliacoes')
      .where('id_comerciante', String(id))
      .orderBy('data_mod', 'desc')
      .paginate(pagina, quantidade)
  }

  async criarAvaliacao(avaliacao: Partial<Avaliacao>) {
    return await Avaliacao.create(avaliacao)
  }

  async atualizar(id: number, carga: Partial<Avaliacao>) {
    if (carga.ava_id) {
      delete carga.ava_id
    }

    const avaliacao = await Avaliacao.findBy('ava_id', id)

    if (!avaliacao) {
      return null
    }

    avaliacao.merge(carga)

    return await avaliacao.save()
  }

  async deletar(id: number) {
    const avaliacao = await Avaliacao.findByOrFail('ava_id', id)

    return await avaliacao?.delete()
  }
}
