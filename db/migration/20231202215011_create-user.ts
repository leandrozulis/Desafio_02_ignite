import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('refeicoes', (table) => {
        table.uuid('id').primary(),
        table.uuid('identificacaoUser').index(),
        table.text('nome').notNullable(),
        table.text('descricao').notNullable(),
        table.boolean('dieta').notNullable(),
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('refeicoes');
}