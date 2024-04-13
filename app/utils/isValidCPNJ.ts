import vine from "@vinejs/vine"
import { FieldContext } from "@vinejs/vine/types"

export function isValideCNPJ(value: unknown, options: any, field: FieldContext){
  if (typeof value !== 'string') {
    return
  }
  // Remove any non-digit characters from the input
  const cleanedCNPJ = value.replace(/\D/g, '')

  // Check if CNPJ has the correct length after cleaning
  if (cleanedCNPJ.length !== 14) {
    return
  }

  // Validate format using regex
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  if (!regex.test(value)) {
    return
  }

  // Check digits calculation
  const digits = cleanedCNPJ.split('').map(Number)
  const calculatedCheckDigit1 = calculateCheckDigit(digits.slice(0, 12))
  const calculatedCheckDigit2 = calculateCheckDigit(digits.slice(0, 13))

  const resultado = (
    Number(cleanedCNPJ.charAt(12)) === calculatedCheckDigit1 &&
    Number(cleanedCNPJ.charAt(13)) === calculatedCheckDigit2
  )

  if (resultado) {
    field.report(
      'O {{ field }} é invalido',
      'CNPJ invalido',
      field
    )
  }
}

function calculateCheckDigit(digits: number[]): number {
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0)
  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

export const cpnjRegra = vine.createRule(isValideCNPJ)
