import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('usuario', (table) => {
        table.uuid('id').primary(),
        table.uuid('identificacaoUser').index().notNullable(),
        table.text('nome').notNullable(),
        table.text('senha').notNullable(),
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('usuario');
}