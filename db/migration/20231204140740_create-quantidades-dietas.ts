import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('quantidades', (table) => {
        table.uuid('id').primary(),
        table.uuid('identificacaoUser').index().notNullable(),
        table.decimal('quantidadeTotal'),
        table.decimal('quantidadeDentro'),
        table.decimal('quantidadeFora'),
        table.decimal('melhorSequencia');
    });
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('quantidades');

}