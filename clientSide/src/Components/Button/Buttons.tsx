import axios from 'axios';
import { useEffect, useState } from 'react'
import LeftIcon from '../../assets/Icons/LeftIcon';
import RightIcon from '../../assets/Icons/RightIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';

export function WatchTrailerButton({ movieId } : any) {
   const SPECIFIC_MOVIE_DATA_API = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos&language=en-US`
   const [movieTrailer, setMovieTrailer] = useState('');

   useEffect(() => {
      const fetchMovies = async () => {
         try {
            const response = await axios.get(SPECIFIC_MOVIE_DATA_API, {
               params: {
                  language: 'en-US',
               },
               headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                  'Content-Type': 'application/json'
               }
            })

            const officialTrailerVideos = response.data.videos.results.filter(
               (video : any) => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
            );
            setMovieTrailer(officialTrailerVideos[0].key);
         }
         catch (error) {
            console.log('Error fetching movie data', error)
         }
      }

      fetchMovies();
   }, [movieId, SPECIFIC_MOVIE_DATA_API])

   return (
      <a
         className='watch-trailer-button'
         href={`https://www.youtube.com/watch?v=${movieTrailer}`}
         target="_blank"
         rel="noopener noreferrer"
      >
         <span className='watch-trailer-text'>
            Watch the trailer
         </span>
      </a>
   );
}

export function TabSwitch({ section, selectedTab, onTabChange } : any) {
   const changePeriod = (value : any) => {
      if (selectedTab !== value) {
         onTabChange(value);
      }
   };

   return (
      <div className='tab-switch'>
         <div
            className={`tab
            ${selectedTab === 1
                  ? "selected"
                  : "unselected"
               }`}
            onClick={() => changePeriod(1)}
         >
            <span>
               {section === 0 && 'Today'}
               {section === 1 && 'Movies'}
            </span>
         </div>
         <div
            className={`tab
             ${selectedTab === 2
                  ? "selected"
                  : "unselected"
               }`}
            onClick={() => changePeriod(2)}
         >
            <span>
               {section === 0 && 'Week'}
               {section === 1 && 'On TV'}
            </span>
         </div>
      </div>
   );
}

export function CarouselButtons({ direction, slideDirection } : any) {
   return (
      <button
         className={`carousel-button ${direction === 'left' ? 'carousel-button-left' : 'carousel-button-right'}`}
         onClick={slideDirection}
      >
         {direction === "left" ? <LeftIcon /> : <RightIcon />}
      </button>
   )
}

export function WatchlistButton() {
   return (
      <button className='watchlist-button'>
         <PlusIcon />
         <span className='watchlist-button-text'>Watchlist</span>
      </button>
   )
}