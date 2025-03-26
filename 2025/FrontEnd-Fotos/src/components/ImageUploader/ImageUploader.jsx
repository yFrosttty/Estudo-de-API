import { useState, useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onUpload }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) {
      alert('Por favor, selecione uma imagem e adicione uma descrição');
      return;
    }
    
    await onUpload(image, description);
    setDescription('');
    setImage(null);
    setPreview(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="uploader-container">
      <h2>Adicionar Nova Imagem</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="image-upload" className="upload-label">
            {preview ? 'Alterar Imagem' : 'Selecionar Imagem'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="file-input"
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="description-label">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            required
          />
        </div>

        <button type="submit" className="upload-button">
          Enviar Imagem
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;