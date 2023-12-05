import { FastifyReply, FastifyRequest } from 'fastify';

export async function validaIdentificadorUser(request: FastifyRequest, reply: FastifyReply) {
    const identificacaoUser = request.cookies.identificacaoUser;

    if (!identificacaoUser) {
        return reply.status(401).send({
            error: 'Não autorizado - Verifique sua identificação de usuário.'
        });
    }
}