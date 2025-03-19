import { criandoFoto } from "../models/FotoModel.js";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createFoto = async (req, res) => {
    console.log('FotoController :: createFoto');
    // const caminho = req.body.caminho;
    const {alternativo} = req.body;
    const {foto} = req.files;
    // const alternativo = req.body.alternativo;

    if (!alternativo || !foto) {
        res.status(400).json({mensagem: 'Dados inválidos'});
    }

    const nomeFoto = foto.name;
    const extensao = path.extname(nomeFoto).toLocaleLowerCase();
    const caminho = `${Date.now()}${extensao}`;

    try {
        await foto.mv(path.join(__dirname, '..', 'public', 'img', nomeFoto));
        const [status, resposta] = await criandoFoto(caminho, alternativo);
        return res.status(status).json
    } catch (error) {
        res.status(500).json({mensagem: 'Erro ao cadastrar foto'});
    }
}