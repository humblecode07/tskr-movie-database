import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchSearchTVWithCredits } from '../../../api/api'

interface Actor {
  name: string
}

interface TVCredits {
  cast?: Actor[]
}

interface TVContent {
  id: string | number
  name: string
  poster_path?: string
  credits?: TVCredits
}

interface MovieDetailsProps {
  movieDetails?: {
    original_title?: string
  }
}

const TvContentCheck = ({ movieDetails }: MovieDetailsProps) => {
  const query = movieDetails?.original_title;
  const [duplicateContent, setDuplicateContent] = useState<TVContent[]>([]);

  const { data, isLoading, isError, isSuccess } : any = useQuery({
    queryKey: ['tvSearch', query],
    queryFn: () => fetchSearchTVWithCredits(query as string),
    enabled: !!query,
  });

  useEffect(() => {
    if (isSuccess && data?.results) {
      setDuplicateContent(data.results);
    }
  }, [isSuccess, data]);

  if (!query) {
    return null;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span className="error-message">Error fetching TV content data.</span>;
  }

  console.log(duplicateContent);

  if (duplicateContent.length > 0) {
    return (
      <div className='w-full flex flex-col gap-[1.125rem]'>
        <span className='text-[1.5rem] font-bold'>
          TV Content Duplication Alert
        </span>
        <span>
          {duplicateContent.length > 0
            ? 'The title you provided matches an existing TV show. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
            : 'No duplicate TV content found. You may proceed :)'}
        </span>
        <div className='w-full flex flex-wrap gap-x-[3.75rem] gap-y-[0.5625rem]'>
          {duplicateContent.map((tvContent: TVContent) => {
            return (
              <div
                key={tvContent.id}
                className='w-[23.9375rem] h-[7.5rem] flex items-center gap-[1.5625rem] text-[0.875rem] mb-[1rem] overflow-auto scrollbar-none'
              >
                <img
                  className='w-[5rem] h-full'
                  src={tvContent.poster_path
                    ? `https://image.tmdb.org/t/p/original${tvContent.poster_path}`
                    : 'https://placehold.co/80x120'}
                  alt={tvContent.name}
                />
                <div className='flex flex-col gap-[0.75rem]'>
                  <span className='text-[#9C4BFF] font-bold underline'>{tvContent.name}</span>
                  <span className='text-[#8D8D8D]'>
                    {tvContent.credits?.cast?.slice(0, 3).map((actor: Actor, index: number) => (
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

export default TvContentCheck