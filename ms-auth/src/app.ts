import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { setRoutes } from './routes/index';
import { loggerMiddleware } from './middleware/logger';

dotenv.config();

const app = new Koa();

// Middleware
app.use(loggerMiddleware);
app.use(bodyParser());

// Routes
setRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});