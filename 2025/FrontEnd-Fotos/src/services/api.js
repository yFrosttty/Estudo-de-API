const API_URL = 'http://localhost:3000';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const deletePhoto = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foto/${id}`, {
      method: 'DELETE',
      credentials: 'include' // Importante para cookies/sessão
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.mensagem || 'Erro ao deletar foto');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
};

export const getPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}/foto`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

export const uploadPhoto = async (photo, description) => {
  const formData = new FormData();
  formData.append('fotos', photo);
  formData.append('alternativo', description);

  try {
    const response = await fetch(`${API_URL}/foto`, {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading photo:', error);
    return { error: 'Failed to upload photo' };
  }
};

export const updatePhotoDescription = async (id, description) => {
  try {
    const response = await fetch(`${API_URL}/foto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alternativo: description })
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating photo:', error);
    return { error: 'Failed to update photo' };
  }
};

