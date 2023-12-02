import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('refeicoes', (user) => {
        user.uuid('id').primary(),
        user.uuid('identificacaoUser').notNullable(),
        user.text('nome').notNullable(),
        user.text('descricao').notNullable(),
        user.boolean('dieta').notNullable(),
        user.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('refeicoes');
}

