import { FastifyInstance } from 'fastify';
import knex from '../database';
import { validaIdentificadorUser } from '../middleware/valida_identificador_user';

export async function routeQuantidade(app: FastifyInstance) {

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

    app.get('/quantidadeMelhorSequencia', {
        preHandler: validaIdentificadorUser
    }, async (request) => {
        const { identificacaoUser } = request.cookies;

        const melhorSequencia = await knex('quantidades')
            .sum('melhorSequencia', {as: 'total'})
            .where('identificacaoUser', identificacaoUser);
        
        return {melhorSequencia};
    });

}