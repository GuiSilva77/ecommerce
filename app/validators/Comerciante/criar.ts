import vine from '@vinejs/vine'
import { cpnjRegra } from '../../utils/isValidCPNJ.js'

export const cadastroComercianteValidador = vine.compile(vine.object({
  email: vine.string().email().toLowerCase().trim(),
  password: vine.string().regex(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?.&])[A-Za-z\d@$!%?.&]{8,}$/).minLength(8),
  cnpj: vine.string().minLength(14).use(cpnjRegra()),
}))
