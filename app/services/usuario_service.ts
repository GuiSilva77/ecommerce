import Usuario from '#models/usuario'
import { inject } from '@adonisjs/core'
import UsuarioPayload from '../payloads/usuarioPayload.js'
import TelefoneService from './telefone_service.js'
import UsuarioPutPayload from '../payloads/usuarioPutPayload.js'
import AlreadyExistsException from '#exceptions/already_exists_exception'
import isValidCPF from '../utils/isValidCPF.js'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import BadRequestException from '#exceptions/bad_request_exception'

@inject()
export default class UsuarioService {
  constructor(protected telefoneService: TelefoneService) {}

  async encontrarPorId(id: bigint | undefined) {
    const usuario = await Usuario.findBy('id', id)

    if (!usuario) {
      throw new ResourceNotFoundException('Usuário não encontrado')
    }

    return usuario
  }

  async criar(usuario: UsuarioPayload) {
    if (await Usuario.findBy('cpf', usuario.cpf)) {
      throw new AlreadyExistsException('CPF já cadastrado')
    }

    if (!isValidCPF(usuario.cpf)) {
      throw new BadRequestException('CPF inválido')
    }

    let novoUsuario = new Usuario().merge(usuario)
    await novoUsuario.related('telefones').createMany(usuario.telefones)

    novoUsuario.ativo = true
    novoUsuario.validado = false

    return await Usuario.create(novoUsuario)
  }

  async atualizar(id: bigint, carga: UsuarioPutPayload) {
    const usuario = await Usuario.findBy('id', id)

    if (!usuario) {
      throw new ResourceNotFoundException('Usuário não encontrado')
    }

    usuario.merge(carga)
    return await usuario.save()
  }

  async deletar(id: bigint) {
    const usuario = await Usuario.findBy('id', id)

    if (!usuario) {
      throw new ResourceNotFoundException('Usuário não encontrado')
    }

    return await usuario?.delete()
  }
}
