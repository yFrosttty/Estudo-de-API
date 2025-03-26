import { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import { getPhotos, uploadPhoto } from '../services/api';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhotos = async () => {
    setIsLoading(true);
    const data = await getPhotos();
    setPhotos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (image, description) => {
    await uploadPhoto(image, description);
    await fetchPhotos();
  };

  return (
    <div className="page-container">
      <ImageUploader onUpload={handleUpload} />
      {isLoading ? (
        <p>Carregando imagens...</p>
      ) : (
        <ImageGallery photos={photos} onUpdate={fetchPhotos} />
      )}
    </div>
  );
};

export default GalleryPage;