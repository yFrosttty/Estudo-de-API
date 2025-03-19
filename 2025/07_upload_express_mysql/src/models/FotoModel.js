import db from '../conexao.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoFoto = async (caminho, alternativo) => {
    console.log('FotoModel :: criandoFoto');

    const sql = `INSERT INTO
                  fotos (caminho, alternativo)
                  VALUES (?, ?)`
                  ;
    const params = [caminho, alternativo];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201,{mensagem: 'Foto cadastrada'}]
    } catch (error) {
        return [500,{mensagem: 'Erro ao cadastrar foto', code:error.code, sql:error.sqlMessage}]
    }
}