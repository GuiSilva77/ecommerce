export default function isValidCPF(cpf: string): boolean {
  // Se não for string, o CPF é inválido
  if (typeof cpf !== 'string') {
    return false
  }

  // Remove todos os caracteres que não sejam números
  cpf = cpf.replace(/[^\d]+/g, '')

  // Se o CPF não tem 11 dígitos ou todos os dígitos são repetidos, o CPF é inválido
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false
  }

  // Transforma de string para number[] com cada dígito sendo um número no array
  const digits = cpf.split('').map((el) => +el)

  // Função que calcula o dígito verificador de acordo com a fórmula da Receita Federal
  function getVerifyingDigit(arr: number[]) {
    const reduced = arr.reduce((sum, digit, index) => sum + digit * (arr.length - index + 1), 0)
    return ((reduced * 10) % 11) % 10
  }

  // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
  return (
    getVerifyingDigit(digits.slice(0, 9)) === digits[9] &&
    getVerifyingDigit(digits.slice(0, 10)) === digits[10]
  )
}
