import { FastifyInstance } from 'fastify';
import knex from '../database';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export async function routeUsers(app: FastifyInstance) {

    app.get('/', async (request) => {
        const { identificacaoUser } = request.cookies;

        const users = await knex('refeicoes')
            .where('identificacaoUser', identificacaoUser)
            .select('*');
        return {users};
    });

    app.get('/:id', async (request) => {

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

    app.post('/', async (request, reply) => {
        const userSchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dieta: z.boolean()
        });

        const {nome, descricao, dieta} = userSchema.parse(request.body);

        let { identificacaoUser } = request.cookies;

        if (!identificacaoUser) {
            identificacaoUser = randomUUID();

            reply.cookie('identificacaoUser', identificacaoUser, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });
        }

        await knex('refeicoes')
            .insert({
                id: randomUUID(),
                identificacaoUser,
                nome: nome,
                descricao: descricao,
                dieta: dieta
            });    

        return reply.status(201).send('User criado com sucesso!');
    });

}