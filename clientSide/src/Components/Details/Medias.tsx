import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface MediaImage {
  file_path: string;
}

interface MediaData {
  [language: string]: MediaImage[];
}

interface MediasProps {
  data: MediaData;
}

type MediaType = 'logos' | 'posters' | 'backdrops';

interface MediaDimensions {
  width: string;
  height: string;
  gap: string;
}

const Medias = ({ data }: MediasProps) => {
  const params = useParams<{ mediaType: MediaType }>();
  const [selectedLang, setSelectedLang] = useState<string | null>(Object.keys(data)[0] || null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mediaDimensions: Record<MediaType, MediaDimensions> = {
    logos: {
      width: 'w-[22.5625rem]',
      height: 'h-[9.691375rem]',
      gap: 'gap-[1.7rem]',
    },
    posters: {
      width: 'w-[14.875rem]',
      height: 'h-[22.75rem]',
      gap: 'gap-[1rem]'
    },
    backdrops: {
      width: 'w-[22.5625rem]',
      height: 'h-[12.691375rem]',
      gap: 'gap-[1.7rem]'
    }
  };

  console.log(selectedImage);

  const widthClass = params.mediaType ? mediaDimensions[params.mediaType]?.width : '';
  const heightClass = params.mediaType ? mediaDimensions[params.mediaType]?.height : '';
  const gapClass = params.mediaType ? mediaDimensions[params.mediaType]?.gap : '';

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (data) {
    return (
      <>
        <div className='w-[66.5rem] flex py-[3.3125rem] gap-[3.6875rem]'>
          <ul className='w-[15.9375rem] h-full flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
            {Object.keys(data).map(language => (
              <li
                key={language}
                className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer'
                onClick={() => setSelectedLang(language)}
              >
                <span>{language}</span>
                <span>{data[language].length}</span>
              </li>
            ))}
          </ul>
          <div className={`w-[46.875rem] h-full flex flex-grow-0 flex-wrap ${gapClass}`}>
            {selectedLang && data[selectedLang].map((image, index) => {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  onError={(e) => (e.target as HTMLImageElement).src = `http://localhost:3000/images/${image.file_path}`}
                  className={`${widthClass} ${heightClass} object-contain cursor-pointer hover:opacity-80 transition-opacity`}
                  alt="Movie Poster"
                  onClick={() => handleImageClick(image.file_path)}
                />
              )
            })}
          </div>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
            onClick={closeModal}
          >
            <div className='relative max-w-[90vw] max-h-[90vh]'>
              <button
                className='absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10'
                onClick={closeModal}
              >
                ×
              </button>
              <img
                src={`https://image.tmdb.org/t/p/original${selectedImage}`}
                onError={(e) => (e.target as HTMLImageElement).src = `http://localhost:3000/images/${selectedImage}`}
                className='max-w-full max-h-[90vh] object-contain'
                alt="Selected Media"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </>
    )
  }
  else {
    return (
      <>
        <p>No media yet available.</p>
      </>
    )
  }
};

export default Medias;