import BadRequestException from '#exceptions/bad_request_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Avaliacao from '#models/avaliacao'
import Usuario from '#models/usuario'

type AvaliacaoPayload = {
  avaliacao: number
  conteudo: string
  comercianteId: number
}

type AvaliacaoPutPayload = Partial<AvaliacaoPayload>

export default class AvaliacaoService {
  async buscarAvaliacoesPorUsuarioId(id: number, pagina: number, quantidade: number) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    const avaliacoes = await Avaliacao.query().where('usuario_id', id).paginate(pagina, quantidade)

    return avaliacoes
  }

  async buscarAvaliacoesPorComercianteId(id: number, pagina: number, quantidade: number) {
    pagina = pagina || 1
    quantidade = quantidade || 10

    const avaliacoes = await Avaliacao.query()
      .where('comerciante_id', id)
      .paginate(pagina, quantidade)

    return avaliacoes
  }

  async criarAvaliacao(id_usuario: number, payload: AvaliacaoPayload) {
    const usuario = await Usuario.find(id_usuario)

    if (!usuario) throw new BadRequestException('Usuário não validado')

    let novaAvaliacao = new Avaliacao().merge(payload)

    await novaAvaliacao.save()
    await novaAvaliacao.related('criador').associate(usuario)

    return novaAvaliacao
  }

  async atualizarAvaliacao(id_usuario: number, id_avaliacao: number, payload: AvaliacaoPutPayload) {
    const avaliacao = await Avaliacao.find(id_avaliacao)

    if (!avaliacao || avaliacao.usuarioId != id_usuario)
      throw new ResourceNotFoundException('Avaliacao não encontrada')

    avaliacao.merge(payload)

    await avaliacao.save()

    return avaliacao
  }

  async deletarAvaliacao(id_avaliacao: number, id_usuario: number) {
    const avaliacao = await Avaliacao.find(id_avaliacao)

    if (!avaliacao || avaliacao.usuarioId != id_usuario)
      throw new ResourceNotFoundException('Avaliacao não encontrada')

    await avaliacao.delete()
  }
}
