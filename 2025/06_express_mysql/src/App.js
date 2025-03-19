import express from 'express'; // Importa o módulo express
import { createProduto, deleteProduto, readProduto, updateProduto } from './controllers/ProdutoController.js'; // Importa a função createProduto do arquivo ProdutoController.js

const app = express(); // Cria uma instância do aplicativo express
const port = 3000; // Define a porta na qual o servidor irá escutar

app.use(express.json()); // Permite que o aplicativo utilize JSON para enviar e receber dados
// Define uma rota GET para o caminho raiz ('/')

app.get('/', (req, res) => {
    res.send('API Funcionando'); // Envia uma resposta de texto quando a rota é acessada
});

// CRUD produto

app.post('/produto', createProduto)
app.get('/produto', readProduto)
app.put('/produto/:id', updateProduto)
app.delete('/produto/:id', deleteProduto)

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`); // Loga uma mensagem no console indicando que o servidor está rodando
});