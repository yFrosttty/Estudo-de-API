import db from '../conexao.js';
import mysql from 'mysql2/promise';

// Criando conexão com o banco de dados inet
const conexao = mysql.createPool(db);

//Criando Produto
const criandoProduto = async (nomeProduto) => {
    console.log('ProdutoModel :: criandoProduto');

    const sql = 'INSERT INTO produtos (nome_produto) VALUES (?)';

    const params = [nomeProduto];

    try {
        const resposta = await conexao.query(sql, params);
        console.log(resposta);
    } catch (error) {
        console.error(error);
    }
}

// Mostrando produtos da tabela
const mostrarProdutos =  async () => {
    console.log('ProdutoModel :: mostrarProdutos');

    //SQL para realizar consulta
    const sql = 'SELECT * FROM produtos';
    try {
        //Pegando primeiro array de resposta
        const [resposta] = await conexao.query(sql);
        console.log(resposta);
    } catch (error) {
        console.error(error);
    }
}

const atualizandoProduto = async (id_produtos, nomeProduto) => {
    console.log('ProdutoModel :: atualizandoProduto');

    const sql = 'UPDATE produtos SET nome_produto = ? WHERE id_produtos = ?';

    const params = [nomeProduto, id_produtos];

    try {
        const [resposta] = await conexao.query(sql, params);
        console.log(resposta);
    } catch (error) {
        console.error(error);   
    }
}

const deletandoProduto = async (id_produtos) => {
    console.log('ProdutoModel :: deletandoProduto');
    const sql = 'DELETE FROM produtos WHERE id_produtos = ?';
    const params = [id_produtos];

    try {
        const [resposta] = await conexao.query(sql, params);
        // console.log(resposta);
        if(resposta.affectedRows < 1){
            return [404, {mensagem: 'Produto não encontrado'}];
        } else {
            return [200, {mensagem: 'Produto deletado com sucesso'}];
        }
    } catch (error) {
        return [500, {mensagem: 'Erro Servidor', 
            code:error.code,
            sql:error.sqlMessage
        }];
        console.error(error);
    }
}

console.log(await deletandoProduto(1));
// atualizandoProduto(6, 'kiwires');
//criandoProduto('melão');
//mostrarProdutos();