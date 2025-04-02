import db from "../conexao.js";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

//Criando pool de conexões com o banco de dados

const conexao = mysql.createPool(db);

export const criandoUsuario = async (nome, usuario, senha, tipo) => {
  console.log("UsuarioModel :: criandoUsuario");

  // Encriptando a senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `INSERT INTO usuarios 
    (nome, usuario, senha, tipo) VALUES 
    (?, ?, ?, ?)`;

  const params = [nome, usuario, hash, tipo];

  try {
    const [resposta] = await conexao.query(sql, params);
    return [201, { mensagem: "Usuário criado com sucesso!" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const mostrandoUsuario = async () => {
  console.log("UsuarioModel :: mostrandoUsuarios");

  const sql = `SELECT * FROM usuarios`;

  try {
    const [resposta] = await conexao.query(sql);
    return [200, { resposta }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const atualizarUsuario = async (
  nome,
  usuario,
  senha,
  tipo,
  id_usuario
) => {
  console.log("UsuarioModel :: atualizarUsuario");

  // Encriptando a senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `UPDATE usuarios SET nome = ?, 
    usuario = ?, 
    senha = ?,
     tipo = ? WHERE
      id_usuario = ?`;
  const params = [nome, usuario, hash, tipo, id_usuario];

  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows<1){
        return [404, { mensagem: "Usuário não encontrado!" }];
    }
    return [200, { mensagem: "Usuário atualizado com sucesso!" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const deletarUsuario = async (id_usuario) => {
  console.log("UsuarioModel :: deletarUsuario");

  const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
  const params = [id_usuario];

  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows<1){
        return [404, { mensagem: "Usuário não encontrado!" }];
    }
    return [200, { mensagem: "Usuário deletado com sucesso!" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
}

export const verificarUsuarioSenha = async (usuario, senha) => {
    
}

// const retorno = await mostrandoUsuarios();
// const retorno = await (criandoUsuario("Thales da Silva", "ttthales", "250302", "a"));
console.log(JSON.stringify(retorno));
