import { FastifyInstance } from 'fastify';
import knex from '../database';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { validaIdentificadorUser } from '../middleware/valida_identificador_user';

export async function routeRefeicoes(app: FastifyInstance) {

    // Cria uma rejeição
    app.post('/', {preHandler: validaIdentificadorUser},async (request, reply) => {
        const userSchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dieta: z.boolean()
        });

        const {nome, descricao, dieta} = userSchema.parse(request.body);

        const { identificacaoUser } = request.cookies;
    
        await knex('refeicoes')
            .insert({
                id: randomUUID(),
                identificacaoUser,
                nome,
                descricao,
                dieta
            });

        const validaRefeicoes = await knex('quantidades')
            .where('identificacaoUser', identificacaoUser)
            .select('*');

        if (validaRefeicoes[0]) {
            await knex('quantidades')
                .where('identificacaoUser', identificacaoUser)
                .insert({
                    id: randomUUID(),
                    identificacaoUser,
                    quantidadeTotal: 0,
                    quantidadeDentro: 0,
                    quantidadeFora: 0,
                    melhorSequencia: 0
                });

            if (dieta) {
                await knex('quantidades')
                    .where('identificacaoUser', identificacaoUser)
                    .increment({
                        quantidadeTotal: 1,
                        quantidadeDentro: 1,
                        melhorSequencia: 1
                    });
                return reply.status(200).send('Quantidade Increment!');
            } else {
                await knex('quantidades')
                    .where('identificacaoUser', identificacaoUser)
                    .increment({
                        quantidadeTotal: 1,
                        quantidadeFora: 1,
                    }).decrement({
                        melhorSequencia: 0
                    });
                return reply.status(200).send('Quantidade Decrement!');
            }
        } else {
            if (dieta) {
                await knex('quantidades')
                    .where('identificacaoUser', identificacaoUser)
                    .increment({
                        quantidadeTotal: 1,
                        quantidadeDentro: 1,
                        melhorSequencia: 1
                    });
                return reply.status(200).send('else increment');
            } else {
                await knex('quantidades')
                    .where('identificacaoUser', identificacaoUser)
                    .increment({
                        quantidadeTotal: 1,
                        quantidadeFora: 1,
                    }).decrement({
                        melhorSequencia: 0
                    });
                return reply.status(200).send('else decrement');
            }
        }
    });


    // Lista todas as refeições
    app.get('/', {
        preHandler: validaIdentificadorUser
    },async (request) => {
        const { identificacaoUser } = request.cookies;

        const refeicoes = await knex('refeicoes')
            .where('identificacaoUser', identificacaoUser)
            .select('*');
        return {refeicoes};
    });

    // Lista uma única refeição
    app.get('/:id', {
        preHandler: validaIdentificadorUser
    },async (request) => {

        const idSchema = z.object({
            id: z.string().uuid()
        });

        const { id } = idSchema.parse(request.params);

        const { identificacaoUser } = request.cookies;

        const user = await knex('refeicoes')
            .where({
                id,
                identificacaoUser
            })
            .first();

        return { user };
    });

    
    //Altera uma refeição
    app.put('/:id', {
        preHandler: validaIdentificadorUser
    },async (request, reply) => {

        const bodySchema = z.object({
            nome: z.optional(z.string()),
            descricao: z.optional(z.string()),
            dieta: z.optional(z.boolean())
        });

        const { identificacaoUser } = request.cookies;

        const { nome, descricao, dieta } = bodySchema.parse(request.body);

        await knex('refeicoes')
            .where('identificacaoUser', identificacaoUser)
            .update({
                nome: nome,
                descricao: descricao,
                dieta: dieta
            });

        reply.status(200).send('Dados alterados');
    });

    // Apaga uma refeição
    app.delete('/:id', {
        preHandler: validaIdentificadorUser
    },async (request, reply) => {
        const { identificacaoUser } = request.cookies;

        await knex('refeicoes')
            .where('identificacaoUser', identificacaoUser)
            .del();

        reply.status(200).send('Refeição Deletada!');
    });

}