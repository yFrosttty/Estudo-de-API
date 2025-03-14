import express from 'express'; // Importa o módulo express

const app = express(); // Cria uma instância do aplicativo express
const port = 3000; // Define a porta na qual o servidor irá escutar

// Define uma rota GET para o caminho raiz ('/')
app.get('/', (req, res) => {
    res.send('API Funcionando'); // Envia uma resposta de texto quando a rota é acessada
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`); // Loga uma mensagem no console indicando que o servidor está rodando
});