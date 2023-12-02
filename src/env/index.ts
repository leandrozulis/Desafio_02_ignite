import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333)
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('Variável incorreta!');
    throw new Error('Variável incorreta!');
}

const env = _env.data;

export default env;