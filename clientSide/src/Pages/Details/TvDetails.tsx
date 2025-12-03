import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../Components/Details/ShowCollage';
import Overview from '../../Components/Details/Overview';
import Recommendation from '../../Components/Details/Recommendation';
import Casts from '../../Components/Details/Casts';
import Media from '../../Components/Details/OverviewMedia';

// Fetch TV Data
interface Video {
  key: string;
  name: string;
  type: string;
  site: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Creator {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

interface ExternalIds {
  facebook_id: string | null;
  twitter_id: string | null;
  instagram_id: string | null;
  wikidata_id: string | null;
  imdb_id: string | null;
}

interface ImageData {
  file_path: string;
  width: number;
  height: number;
}

interface TvResponse {
  name: string;
  title?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  overview: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  videos: {
    results: Video[];
  };
  content_ratings: {
    results: ContentRating[];
  };
  origin_country: string[];
  original_language: string;
  original_name: string;
  created_by: Creator[];
  credits: {
    cast: CastMember[];
  };
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
  type: string;
  external_ids: ExternalIds;
  homepage: string | null;
  recommendations: unknown;
}

interface ImagesResponse {
  backdrops: ImageData[];
  posters: ImageData[];
  logos: ImageData[];
}

interface FetchTvDataResponse {
  response: TvResponse;
  responseImage: ImagesResponse;
}

interface ShowCollageData {
  title: string | undefined;
  poster_path: string | null;
  backdrop: string | null;
  backdrop_count: string;
  poster: string | null;
  poster_count: string;
  video: string | null;
  video_count: string;
  official_trailer: string | null;
}

interface OverviewData {
  type: 'tv';
  title: string;
  certifications: string | undefined;
  release_date: string;
  genres: string[];
  vote_average: string;
  vote_count: string;
  tagline: string;
  overview: string;
  original_language: string;
  original_name: string;
  created_by: string[];
  stars: string[];
  status: string;
  number_of_episodes: string;
  number_of_seasons: string;
  first_air_date: string;
  last_air_date: string;
  tv_type: string;
  facebook_id: string | null;
  twitter_id: string | null;
  instagram_id: string | null;
  wikidata: string | null;
  imdb_id: string | null;
  homepage: string | null;
}

interface Credits {
  type: 'tv';
  casts: CastMember[] | undefined;
}

interface Medias {
  videos: Video[] | undefined;
  posters: ImageData[] | undefined;
  backdrops: ImageData[] | undefined;
  logos: ImageData[] | undefined;
}

interface Recommendations {
  recommendations: unknown;
}

const fetchTvData = async (tvId: string): Promise<FetchTvDataResponse> => {
  const response = await dataApi('tv', tvId);
  const responseImage = await imagesApi('tv', tvId);
  return { response, responseImage };
};

const TvDetails = () => {
  const { tvId } = useParams<{ tvId: string }>();
  const id = tvId?.split('-')[0] || '';  // Get the ID portion before the dash

  // Using React Query to fetch data
  const { data, error, isLoading } = useQuery<FetchTvDataResponse, Error>({
    queryKey: ['tvData', id], // Unique query key
    queryFn: () => fetchTvData(id), // Function to fetch data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { response, responseImage } = data!;

  // Update document title
  document.title = response.name;

  const officialTrailer = response.videos.results.filter(
    (video) => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
  );
  const trailer = officialTrailer.length > 0
    ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
    : response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
      ? `https://www.youtube.com/embed/${response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')!.key}?si=8l7P2cs2GNCdH2-L`
      : null;

  // Helper functions
  const generateCountMessage = (count: number, singularLabel: string, pluralLabel: string): string => {
    if (count > 99) return `99+ ${pluralLabel}`;
    if (count > 1) return `${count} ${pluralLabel}`;
    return count === 1 ? `${count} ${singularLabel}` : `NO ${pluralLabel}`;
  };

  const getRandomIndex = (count: number): number => Math.floor(Math.random() * count);

  // Data to pass on to ShowCollage component
  const backdropCount = responseImage.backdrops?.length || 0;
  const posterCount = responseImage.posters?.length || 0;
  const videosCount = response.videos.results?.length || 0;

  const showCollageData: ShowCollageData = {
    title: response.title,
    poster_path: response.poster_path ? `https://image.tmdb.org/t/p/w500${response.poster_path}` : null,
    backdrop: backdropCount ? `https://image.tmdb.org/t/p/w500${responseImage.backdrops[getRandomIndex(backdropCount)].file_path}` : null,
    backdrop_count: generateCountMessage(backdropCount, 'BACKDROP', 'BACKDROPS'),
    poster: posterCount ? `https://image.tmdb.org/t/p/w500${responseImage.posters[getRandomIndex(posterCount)].file_path}` : null,
    poster_count: generateCountMessage(posterCount, 'POSTER', 'POSTERS'),
    video: videosCount ? `https://i.ytimg.com/vi/${response.videos.results[getRandomIndex(videosCount)].key}/hqdefault.jpg` : null,
    video_count: generateCountMessage(videosCount, 'VIDEO', 'VIDEOS'),
    official_trailer: trailer,
  };

  // Overview Data
  const certifications = response.content_ratings.results.filter((country) =>
    [response.origin_country[0], "US"].includes(country.iso_3166_1)
  );

  const overviewData: OverviewData = {
    type: 'tv',
    title: response.name,
    certifications:
      certifications[0]?.rating || certifications[1]?.rating || response.content_ratings.results[0]?.rating || undefined,
    release_date: new Date(response.first_air_date).toLocaleDateString('en-PH'),
    genres: response.genres.map((genre) => genre.name).splice(0, 3),
    vote_average: response.vote_average.toFixed(1),
    vote_count: `${(response.vote_count / 1000).toFixed(1)}k`,
    tagline: response.tagline,
    overview: response.overview,
    original_language: response.original_language,
    original_name: response.original_name,
    created_by: response.created_by.map(writer => writer.name).slice(0, 3),
    stars: response.credits.cast.slice(0, 3).map(star => star.name),
    status: response.status,
    number_of_episodes: `${response.number_of_episodes} ${response.number_of_episodes === 1 ? 'episode' : 'episodes'}`,
    number_of_seasons: `${response.number_of_seasons} ${response.number_of_seasons === 1 ? 'season' : 'seasons'}`,
    first_air_date: new Date(response.first_air_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    last_air_date: new Date(response.last_air_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    tv_type: response.type,
    facebook_id: response.external_ids.facebook_id,
    twitter_id: response.external_ids.twitter_id,
    instagram_id: response.external_ids.instagram_id,
    wikidata: response.external_ids.wikidata_id,
    imdb_id: response.external_ids.imdb_id,
    homepage: response.homepage,
  };

  const credits: Credits = {
    type: 'tv',
    casts: response.credits.cast || undefined,
  };

  const medias: Medias = {
    videos: response.videos.results || undefined,
    posters: responseImage.posters || undefined,
    backdrops: responseImage.backdrops || undefined,
    logos: responseImage.logos || undefined,
  };

  const recommendations: Recommendations = {
    recommendations: response.recommendations,
  };

  return (
    <>
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <section
          className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${response.backdrop_path})` }}
        >
          <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
          <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem] gap-[1.125rem]'>
            <ShowCollage data={showCollageData} />
            <Overview data={overviewData} />
          </ div>
        </section>
        <section
          className='w-[66.5625rem] flex gap-[2rem] pb-[2.875rem] pt-[1.3125rem]'
        >
          <section className='flex flex-col gap-[1.8125rem]'>
            <Casts data={credits} />
            <Media data={medias} />
          </section>
          <Recommendation data={recommendations} />
        </section>
      </main>
    </>
  );
};

export default TvDetails;