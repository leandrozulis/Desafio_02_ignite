import fastify from 'fastify';
import env from './env';
import { routeUsers } from './routes/usuario';
import { routeRefeicoes } from './routes/refeicoes';
import { routeQuantidade } from './routes/quantidade';
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie);
app.register(routeUsers, {
    prefix: '/usuario'
});
app.register(routeRefeicoes, {
    prefix: '/refeicoes'
});
app.register(routeQuantidade, {
    prefix: '/quantidades'
});

app.listen({
    port: env.PORT
}).then(() => console.log('HTTP Running!'));