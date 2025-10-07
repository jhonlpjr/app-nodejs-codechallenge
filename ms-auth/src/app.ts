import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { setRoutes } from './routes/index';
import { loggerMiddleware } from './middleware/logger';

dotenv.config();

const app = new Koa();

app.use(loggerMiddleware);
app.use(bodyParser());

setRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});