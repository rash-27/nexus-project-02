import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRouter from './routes/auth';
import userRouter from './routes/user';

const app = new Hono()


app.use('/*',cors());

app.route('/api/auth/', authRouter);
app.route('/api/v1/', userRouter);

export default app
