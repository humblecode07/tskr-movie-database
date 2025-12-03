import React, { useEffect, useRef, useState } from 'react';
import SearchFilter from '../../Components/Admin/SearchFilter';
import AddIcon from '../../assets/Icons/Admin/AddIcon';
import { fetchMyData } from '../../api/api';
import { LOCALHOST } from '../../App';
import TripleDotIcon from '../../assets/Icons/Admin/TripleDotIcon';
import ViewIcon from '../../assets/Icons/Admin/ViewIcon';
import OverviewPanel from '../../Components/Details/OverviewPanel';
import { NavLink } from 'react-router-dom';

type Movie = {
  _id: string;
  title: string;
  original_title?: string;
  tagline?: string;
  overview?: string;
  runtime?: number;
  release_date?: string;
  genres: { name: string }[];
  credits?: {
    cast?: { name: string }[];
    crew?: { name: string; job: string; department: string }[];
  };
  release_dates?: {
    results?: {
      iso_3166_1: string;
      release_dates: { certification: string }[];
    }[];
  };
  origin_country?: string[];
  videos?: { name: string; key: string; type: string; site: string }[];
  vote_average: number;
  vote_count: number;
  backdrop_path?: string;
  budget?: number;
  revenue?: number;
  external_ids: {
    facebook_id?: string;
    twitter_id?: string;
    instagram_id?: string;
    wikidata_id?: string;
    imdb_id?: string;
  };
  homepage?: string;
  status?: string;
};

// Parsed movie type for the processed data
type ParsedMovie = {
  _id: string;
  title: string;
  tagline?: string;
  overview?: string;
  trailer: string | null;
  genres: string[];
  certifications: string;
  vote_average: string;
  vote_count: string;
  release_date: string;
  director?: string;
  writers?: string[];
  stars: string[];
  runtime: string;
  backdrop_path: string;
  budget: string;
  revenue: string;
  facebook_id?: string;
  twitter_id?: string;
  instagram_id?: string;
  wikidata?: string;
  imdb_id?: string;
  homepage?: string;
  status?: string;
};

const AdminMovie: React.FC = () => {
  const [movieList, setMovieList] = useState<ParsedMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<ParsedMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<ParsedMovie | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovieList = async (): Promise<void> => {
      try {
        const response = await fetchMyData('movie');
        const movies: Movie[] = response?.data || [];

        const getTrailerUrl = (videos?: { name: string; key: string; type: string; site: string }[]): string | null => {
          if (!videos || videos.length === 0) return null;

          const officialTrailer = videos.find(
            (video) =>
              video.name.toLowerCase().includes('official') &&
              video.name.toLowerCase().includes('trailer')
          );

          if (officialTrailer) {
            return `https://www.youtube.com/embed/${officialTrailer.key}?si=8l7P2cs2GNCdH2-L`;
          }

          const genericTrailer = videos.find(
            (video) => video.type === 'Trailer' && video.site.toLowerCase() === 'youtube'
          );

          return genericTrailer
            ? `https://www.youtube.com/embed/${genericTrailer.key}?si=8l7P2cs2GNCdH2-L`
            : null;
        };

        console.log(movies);

        const parsedMovies: ParsedMovie[] = movies.map((movie: Movie): ParsedMovie => {
          const certifications =
            movie?.release_dates?.results?.filter((country) =>
              ['US', movie.origin_country?.[0]].includes(country.iso_3166_1)
            ) || [];

          const director = movie?.credits?.crew?.find((member) => member.job === 'Director');
          const writers = (movie?.credits?.crew || [])
            .filter((member) => member.department === 'Writing')
            .slice(0, 3)
            .map((writer) => writer.name);
          const stars = (movie?.credits?.cast || [])
            .slice(0, 3)
            .map((star) => star.name);

          const hours = Math.floor((movie.runtime || 0) / 60);
          const minutes = (movie.runtime || 0) % 60;

          return {
            _id: movie._id,
            title: movie.title || movie.original_title || 'Untitled',
            tagline: movie.tagline,
            overview: movie.overview,
            trailer: getTrailerUrl(movie?.videos),
            genres: movie.genres.map((genre) => genre.name).slice(0, 3),
            certifications:
              certifications[0]?.release_dates?.find(
                (item) => item.certification !== ''
              )?.certification || 'N/A',
            vote_average: (movie.vote_average?.toFixed(1)) || '0.0',
            vote_count: ((movie.vote_count / 1000).toFixed(1) + 'k'),
            release_date: movie.release_date
              ? new Date(movie.release_date).toLocaleDateString('en-PH')
              : 'Unknown',
            director: director?.name,
            writers: writers.length > 0 ? writers : undefined,
            stars,
            runtime: movie.runtime
              ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`
              : 'N/A',
            backdrop_path: movie.backdrop_path || '',
            budget: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(movie.budget || 0),
            revenue: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(movie.revenue || 0),
            facebook_id: movie.external_ids.facebook_id,
            twitter_id: movie.external_ids.twitter_id,
            instagram_id: movie.external_ids.instagram_id,
            wikidata: movie.external_ids.wikidata_id,
            imdb_id: movie.external_ids.imdb_id,
            homepage: movie.homepage,
            status: movie.status,
          };
        });

        console.log(parsedMovies);

        setMovieList(parsedMovies);
        setFilteredMovies(parsedMovies);
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMovieList();
  }, []);

  const handleViewInfo = (movie: ParsedMovie): void => {
    setSelectedMovie(movie);
    setIsInfoVisible(true);
  };

  console.log(movieList);

  return (
    <div className="w-[55.75rem] flex flex-col gap-[1.4375rem]">
      <div className="w-full flex gap-[11.71875rem] items-center">
        <div className="flex gap-[2.25rem] items-center">
          <span className="text-[2.5rem] font-bold">Movies</span>
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            movies={movieList}
            setFilteredMovies={setFilteredMovies}
          />
        </div>
        <NavLink
          to="create"
          className="w-[9.25rem] h-[3.0625rem] flex items-center justify-center gap-[0.625rem] bg-[#CC511D] rounded-full"
        >
          <AddIcon />
          <span className="text-[0.875rem]">Add Movie</span>
        </NavLink>
      </div>
      <div className='flex gap-[1rem] flex-wrap'>
        {filteredMovies.length > 0
          ? filteredMovies.map((card) => (
            <NavLink
              to={card._id}
              key={card._id}
              className="w-[13.1875rem] h-[16.4375rem] flex items-center justify-center rounded-[1rem] bg-cover bg-center relative"
              style={{
                backgroundImage: card._id
                  ? `url(${LOCALHOST}/images/${card.backdrop_path})`
                  : `url(https://placehold.co/211x263/png)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-[1rem] opacity-70"></div>
              <div className="w-[10.9375rem] h-[14.1875rem] flex flex-col justify-between relative">
                <div className="w-[1.75rem] h-[1.75rem] rounded-full bg-[#D9D9D9] flex items-center justify-center ml-auto">
                  <TripleDotIcon />
                </div>
                <div className="flex flex-col">
                  <span className=" self-start py-[0.25rem] px-[0.71875rem] bg-[#909090] text-[0.625rem] rounded-full">
                    {card?.genres[0]}
                  </span>
                  <span className="w-[7.3125rem] font-semibold text-[1rem] line-clamp-1">{card.title}</span>
                  <div className="w-full flex gap-[0.625rem] items-center">
                    <span className="w-[7.3125rem] font-roboto text-[0.75rem] text-[#999999] line-clamp-4">
                      {card.overview}
                    </span>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        handleViewInfo(card);
                      }}
                      className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full bg-[#D9D9D9] hover:bg-[#BFBFBF] hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                    >
                      <ViewIcon />
                    </button>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
          : (
            <div className="text-center mt-4">
              <p className="text-gray-500 text-lg">No movies found. Add one to get started!</p>
            </div>
          )}
      </div>
      {selectedMovie && (
        <OverviewPanel
          data={selectedMovie}
          isInfoVisible={isInfoVisible}
          panelRef={panelRef}
          setIsInfoVisible={setIsInfoVisible}
          filteredMovies={filteredMovies}
          setFilteredMovies={setFilteredMovies}
        />
      )}
    </div>
  );
};

export default AdminMovie;