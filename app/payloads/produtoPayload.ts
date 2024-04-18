export default class ProdutoPayload {
  declare nome: string
  declare valor_venda: number
  declare valor_custo: number
  declare descricao: string
  declare img_url: string
  declare unidade: 'UN' | 'KG' | 'L' | 'M' | 'CM' | 'MM'
  declare categorias: { nome: string }[]
  declare comerciante_id: number
}
