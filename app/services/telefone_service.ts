import Telefone from '#models/telefone'

export default class TelefoneService {
  async criar(telefone: Partial<Telefone>) {
    return await Telefone.create(telefone)
  }

  async atualizar(numero: string, carga: Partial<Telefone>) {
    let telefone = await Telefone.findBy('numero', numero)

    if (!telefone) {
      throw new Error('Telefone não encontrado')
    }

    telefone.merge(carga)
    await telefone.save()
  }

  async deletar(id: number) {
    const telefone = await Telefone.find(id)

    return await telefone?.delete()
  }
}
