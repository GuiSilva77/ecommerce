export default class ProdutoPutPayload {
  declare nome: string | undefined
  declare valor_venda: number | undefined
  declare valor_custo: number | undefined
  declare descricao: string | undefined
  declare img_url: string | undefined
  declare unidade: 'UN' | 'KG' | 'L' | 'M' | 'CM' | 'MM' | undefined
  declare categorias: { id_categoria: number | undefined; nome: string | undefined }[] | undefined
}
