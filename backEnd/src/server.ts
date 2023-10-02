import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config'
import routes from './routes'
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})

