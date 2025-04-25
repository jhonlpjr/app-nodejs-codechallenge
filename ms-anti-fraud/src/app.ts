import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { setRoutes } from './routes/index';
import { loggerMiddleware } from './middleware/logger';
import { validateTransactionListener } from './infraestructure/kafka/listeners/validate-transaction.listener';

const app = new Koa();

// Middleware
app.use(loggerMiddleware);
app.use(bodyParser());

// Routes
setRoutes(app);

const PORT = process.env.PORT || 3000;

validateTransactionListener(); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});