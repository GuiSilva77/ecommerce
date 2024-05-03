import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produto_categorias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('produto_id').unsigned().references('produtos.id').onDelete('CASCADE')
      table.integer('categoria_id').unsigned().references('categorias.id').onDelete('CASCADE')
      table.unique(['produto_id', 'categoria_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
