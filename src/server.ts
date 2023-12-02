import fastify from 'fastify';
import env from './env';
import { routeUsers } from './routes/users';
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie);
app.register(routeUsers, {
    prefix: '/users'
});

app.listen({
    port: env.PORT
}).then(() => console.log('HTTP Running!'));