import 'dotenv/config';
import expess, { Request, Response } from 'express';
import routes from './routes';

const app = expess()

app.use(expess.json())

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server rodando na porta ${process.env.PORT}`);   
})