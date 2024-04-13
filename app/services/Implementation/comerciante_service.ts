import Comerciante from '#models/comerciante'

export default class ComercianteService {
  public async create(payload: Comerciante){
    const data = (await Comerciante.create(payload)).save()

    return data
  }
}

