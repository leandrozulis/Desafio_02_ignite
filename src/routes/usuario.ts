import { FastifyInstance } from 'fastify';
import knex from '../database';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { validaIdentificadorUser } from '../middleware/valida_identificador_user';

export async function routeUsers(app: FastifyInstance) {

    app.post('/', async (request, reply) => {

        const userSchema = z.object({
            nome: z.string(),
            senha: z.string(),
        });

        const {nome, senha} = userSchema.parse(request.body);

        let { identificacaoUser } = request.cookies;

        if (!identificacaoUser) {
            identificacaoUser = randomUUID();

            reply.cookie('identificacaoUser', identificacaoUser, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });
        }

        await knex('usuario')
            .insert({
                id: randomUUID(),
                identificacaoUser,
                nome,
                senha,
            });

        reply.status(201).send('Usuário Criado');

    });

    app.get('/', {
        preHandler: validaIdentificadorUser
    }, async (request) => {
        const { identificacaoUser } = request.cookies;

        const usuarios = await knex('usuario')
            .where('identificacaoUser', identificacaoUser);

        return { usuarios };
    });

    app.get('/:id', {
        preHandler: validaIdentificadorUser
    }, async (request) => {

        const idShema = z.object({
            id: z.string().uuid()
        });

        const {id} = idShema.parse(request.params);

        const { identificacaoUser } = request.cookies;

        const usuario = await knex('usuario')
            .where({
                id,
                identificacaoUser
            })
            .first();

        return { usuario };
    });

    app.get('/metricas', {
        preHandler: validaIdentificadorUser
    }, async (request, reply) => {

        const { identificacaoUser } = request.cookies;

        const usuario = await knex('quantidades')
            .where({
                identificacaoUser
            })
            .first();

        const metrica = (100 * usuario.quantidadeDentro) / usuario.quantidadeTotal;

        return reply.status(200).send({
            mensagem: `${metrica.toFixed(2)}% das refeições dentro da dieta`
        });
    });

}