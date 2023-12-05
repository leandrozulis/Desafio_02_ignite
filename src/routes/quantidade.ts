import { FastifyInstance } from 'fastify';
import knex from '../database';
import { z } from 'zod';
import { validaIdentificadorUser } from '../middleware/valida_identificador_user';

export async function routeQuantidade(app: FastifyInstance) {

    // Lista Total de refeições registradas
    app.get('/:id', {
        preHandler: validaIdentificadorUser
    },async (request) => {

        const idSchema = z.object({
            id: z.string().uuid()
        });

        const { identificacaoUser } = request.cookies;

        const { id } = idSchema.parse(request.params);

        const users = await knex('quantidades')
            .where({
                id,
                identificacaoUser
            })
            .select('*');
        return {users};
    });

    app.get('/', {
        preHandler: validaIdentificadorUser
    },async (request) => {

        const { identificacaoUser } = request.cookies;

        const quantidade = await knex('quantidades')
            .where('identificacaoUser', identificacaoUser)
            .select('*');

        return {quantidade};
    });

    app.get('/quantidadeTotal', {
        preHandler: validaIdentificadorUser
    }, async (request) => {
        const { identificacaoUser } = request.cookies;

        const quantidadeTotal = await knex('quantidades')
            .sum('quantidadeTotal', {as: 'total'})
            .where('identificacaoUser', identificacaoUser);
        
        return {quantidadeTotal};
    });

    app.get('/quantidadeDentro', {
        preHandler: validaIdentificadorUser
    }, async (request) => {
        const { identificacaoUser } = request.cookies;

        const quantidadeDentro = await knex('quantidades')
            .sum('quantidadeDentro', {as: 'total'})
            .where('identificacaoUser', identificacaoUser);
        
        return {quantidadeDentro};
    });

    app.get('/quantidadeFora', {
        preHandler: validaIdentificadorUser
    }, async (request) => {
        const { identificacaoUser } = request.cookies;

        const quantidadeFora = await knex('quantidades')
            .sum('quantidadeFora', {as: 'total'})
            .where('identificacaoUser', identificacaoUser);
        
        return {quantidadeFora};
    });

}