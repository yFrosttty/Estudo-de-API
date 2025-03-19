import express from 'express';
import path from 'path';
import url from 'url';

const port = 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, '..', 'public', 'img')));

app.get('/', (req, res) => {
    res.status(200).json({mensagem: 'API em execução'});
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});