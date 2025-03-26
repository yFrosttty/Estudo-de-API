import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import url from 'url';
import { createFoto, deleteFoto, readFoto, showOneFoto, updateFoto } from './controllers/FotoController.js';
import cors from 'cors';

const port = 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adicione isso ANTES das rotas
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
//Habilitando uso do JSON importante pois permite o uso JSON
app.use(express.json());

//Habilitando upload de arquivos
app.use(fileUpload())

//permitindo acesso ao public
app.use('/public/img',express.static(path.join(__dirname,'..','public','img')));

app.get('/',(req,res)=>{
    res.status(200).json({mensagem:'API Funcionando'})
});

//CRUD Fotos
app.post('/foto',createFoto);
app.get('/foto',readFoto);
app.put('/foto/:id_fotos',updateFoto);
// Certifique-se que a rota DELETE está correta
app.delete('/foto/:id_fotos', deleteFoto); // Deve bater com a URL chamada (/foto/6)

app.get('/foto/:id_fotos',showOneFoto);

app.listen(port,()=>{
    console.log(`API Funcionando ${port}`);
});