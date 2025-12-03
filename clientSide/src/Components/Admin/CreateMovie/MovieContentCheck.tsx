import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { fetchSearchMovieWithCredits } from '../../../api/api';

interface Actor {
  name: string
}

interface MovieCredits {
  cast?: Actor[]
}

interface MovieContent {
  id: string | number
  title: string
  poster_path?: string
  credits?: MovieCredits
}

interface MovieDetailsProps {
  movieDetails?: {
    original_title?: string
  }
}

const MovieContentCheck = ({ movieDetails }: MovieDetailsProps) => {
  const query = movieDetails?.original_title;
  const [duplicateContent, setDuplicateContent] = useState<MovieContent[]>([]);

  const { data, isLoading, isError, isSuccess } : any = useQuery({
    queryKey: ['movieSearch', query],
    queryFn: () => {
      if (!query) throw new Error('Query is required');
      return fetchSearchMovieWithCredits(query);
    },
    enabled: !!query,
  });

  useEffect(() => {
    if (isSuccess && data?.results) {
      setDuplicateContent(data.results);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span className="error-message">Error fetching movie content data.</span>;
  }

  if (duplicateContent.length > 0) {
    return (
      <div className='w-full flex flex-col gap-[1.125rem]'>
        <span className='text-[1.5rem] font-bold'>
          Movie Content Duplication Alert
        </span>
        <span>
          {duplicateContent.length > 0
            ? 'The title you provided matches an existing movie. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
            : 'No duplicate movie content found. You may proceed :)'}
        </span>
        <div className='w-full flex flex-wrap gap-x-[3.75rem] gap-y-[0.5625rem]'>
          {duplicateContent.map((movieContent: MovieContent) => {
            return (
              <div
                key={movieContent.id}
                className='w-[23.9375rem] h-[7.5rem] flex items-center gap-[1.5625rem] text-[0.875rem] mb-[1rem] overflow-auto scrollbar-none'
              >
                <img
                  className='w-[5rem] h-full'
                  src={movieContent.poster_path
                    ? `https://image.tmdb.org/t/p/original${movieContent.poster_path}`
                    : 'https://placehold.co/80x120'}
                  alt={movieContent.title}
                />
                <div className='flex flex-col gap-[0.75rem]'>
                  <span className='text-[#9C4BFF] font-bold underline'>{movieContent.title}</span>
                  <span className='text-[#8D8D8D]'>
                    {movieContent.credits?.cast?.slice(0, 3).map((actor, index) => (
                      <span key={index}>
                        {actor.name}
                        {index < 2 && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  return null;
}

export default MovieContentCheck