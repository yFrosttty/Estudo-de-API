import {
    apagarFoto,
  atualizarFoto,
  criandoFoto,
  mostrandoFoto,
  mostraUmaFoto,
} from "../models/FotoModel.js";
import path from "path";
import url from "url";
import {promises as fs} from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createFoto = async (req, res) => {
  console.log("FotoController :: createFoto");
  // const caminho = req.body.caminho;
  const { alternativo } = req.body;
  // o ou representado pelo '||' faz com que se não receber arquivo receba um '{}' que é objeto vazio
  const { fotos } = req.files || {};
  //const [caminho,alternativo] = req.body;

  if (!alternativo || !fotos) {
    return res
      .status(400)
      .json({ mensagem: "A imagem e a descrição são obrigatórios" });
  }
  const nomeFoto = fotos.name;
  const extensao = path.extname(nomeFoto).toLocaleLowerCase();
  
  //Extensões permitidas
  const extensoesPermitidas = ['.jpg','.jpeg','.png','.gif', '.webp'];
  if(!extensoesPermitidas.includes(extensao)){
    return res.status(400).json({ mensagem: "Extensão invalida" });
  }

  const caminho = `${Date.now()}${extensao}`;
  try {
    await fotos.mv(path.join(__dirname, "..", "..", "public", "img", caminho));
    const [status, resposta] = await criandoFoto(caminho, alternativo);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao criar foto" });
  }
};

export const readFoto = async (req, res) => {
  console.log("FotoController :: readFoto");
  try {
    const [status, resposta] = await mostrandoFoto();
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao mostra fotos" });
  }
};

export const updateFoto = async (req, res) => {
  console.log("FotoController :: updateFoto");
  const { id_fotos } = req.params;
  const { alternativo } = req.body;
  try {
    const [status, resposta] = await atualizarFoto(alternativo, id_fotos);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao atualizar fotos" });
  }
};

export const deleteFoto = async (req, res) => {
  const { id_fotos } = req.params;
  
  // Adicione logs para depuração
  console.log(`Recebida requisição para deletar foto ID: ${id_fotos}`);
  
  try {
    // 1. Verifique se a foto existe
    const [statusFoto, respostaFoto] = await mostraUmaFoto(id_fotos);
    
    if (statusFoto === 404) {
      console.log('Foto não encontrada');
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }

    // 2. Delete o arquivo físico
    const caminhoImagem = path.join(__dirname, "..", "..", "public", "img", respostaFoto.caminho);
    await fs.unlink(caminhoImagem);
    
    // 3. Delete do banco de dados
    const [status, resposta] = await apagarFoto(id_fotos);
    
    console.log('Resultado da exclusão:', {status, resposta});
    return res.status(status).json(resposta);
    
  } catch (error) {
    console.error('Erro ao deletar foto:', error);
    return res.status(500).json({ 
      mensagem: "Erro ao deletar foto",
      error: error.message 
    });
  }
}

export const showOneFoto = async (req,res)  =>{
  console.log('FotoController :: showOneFoto');
  const [status,resposta] = await mostrarCaminho(req,res);
  return res.status(status).json(resposta);       
}

export const mostrarCaminho = async (req,res) =>{
    console.log('FotoController :: mostrarCaminho');
    const {id_fotos} = req.params;
    try {
        const [status,resposta] = await mostraUmaFoto(id_fotos);
        return [status,resposta];
        //return res.status(status).json(resposta);    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "erro ao mostrar uma foto" });   
    }    
}