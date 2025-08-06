import express, { Request, Response } from 'express';
import cors from 'cors';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use(express.json());


const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('São Paulo Futebol Clube');
});

app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API do Back-End!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});