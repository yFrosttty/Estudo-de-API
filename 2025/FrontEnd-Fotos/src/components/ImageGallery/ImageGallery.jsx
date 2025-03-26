import { useState, useEffect } from 'react';
import './ImageGallery.css';
import { updatePhotoDescription, deletePhoto } from '../../services/api';

const ImageGallery = ({ photos, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (photo) => {
    setEditingId(photo.id_fotos);
    setEditDescription(photo.alternativo);
  };

  const handleUpdate = async (id) => {
    const result = await updatePhotoDescription(id, editDescription);
    if (!result.error) {
      onUpdate();
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    console.log('Tentando deletar foto com ID:', id);
    try {
      const response = await fetch(`/foto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Resposta do servidor:', response);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        alert(`Erro ao deletar: ${errorData.mensagem || 'Erro desconhecido'}`);
        return;
      }
      
      const result = await response.json();
      console.log('Resultado:', result);
      onUpdate(); // Atualiza a lista de fotos
      
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="gallery-container">
      <h2>Galeria de Imagens</h2>
      {photos.length === 0 ? (
        <p className="empty-message">Nenhuma imagem cadastrada</p>
      ) : (
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo.id_fotos} className="gallery-item">
              <div className="image-container">
                <img 
                  src={`http://localhost:3000/public/img/${photo.caminho}`} 
                  alt={photo.alternativo} 
                />
              </div>
              
              {editingId === photo.id_fotos ? (
                <div className="edit-form">
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="edit-textarea"
                  />
                  <div className="edit-buttons">
                    <button 
                      onClick={() => handleUpdate(photo.id_fotos)}
                      className="save-button"
                    >
                      Salvar
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="cancel-button"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="photo-info">
                  <p className="photo-description">{photo.alternativo}</p>
                  <div className="photo-actions">
                    <button 
                      onClick={() => handleEdit(photo)}
                      className="edit-button"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(photo.id_fotos)}
                      className="delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;