import axios from 'axios'

type MediaType = "movie" | "tv";

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`
   },
})

const youtubeApi = axios.create({
   baseURL: 'https://www.googleapis.com/youtube/v3/videos',
});

export const apiFetch = async (endpoint: string): Promise<any> => {
   try {
      const response = await apiClient({
         url: endpoint
      })

      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const countryListApi = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/watch/providers/regions?language=en-US"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const watchProviderApi = async (
   type: MediaType,
   code: string
): Promise<any> => {
   console.log(`https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`)

   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Certification Country
export const certificationList = async (
   type: MediaType,
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/certification/${type}/list`
      })

      return response.data.certifications
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Original Language
export const originalLanguageList = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/configuration/languages"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const keywordResults = async (
   query: string,
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const movieDetailModal = async (
   type: MediaType,
   id: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const certificationsDetail = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/${type === "movie" ? "release_dates" : "content_ratings"}?`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const peopleList = async (
   pageNum: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNum}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const dataApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=watch_providers,videos,images,release_dates,recommendations,external_ids,credits,content_ratings&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// movieDataApi won't provide me the data for posters and backdrops, so I used the direct method for getting the images

// some updates (10/03): i just found out i don't need to create another api for getting data for tv, i can just use these same APIs and add just a second argument to specify whether the data is for a TV show or a movie, they have the same format just differ on what stream tyoe being requested
export const imagesApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/images`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const videosApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/videos`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const creditsApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/credits`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataAppendCreditsApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// For some reason it doesn't grab the data using append response
export const appendImagesApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=images&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const appendVideosApi = async (
   type: MediaType,
   movieId: string
): Promise<any> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=videos&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const languages = async () => {
   try {
      const response = await apiClient({
         url: 'https://api.themoviedb.org/3/configuration/languages'
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const fetchYoutubeData = async (
   videoId: string
): Promise<any> => {
   try {
      const response = await youtubeApi.get('', {
         params: {
            part: 'snippet,statistics,contentDetails',
            id: videoId,
            key: import.meta.env.VITE_YT_API_ACCESS_KEY, // Your API key here
         },
      });
      return response.data;
   } catch (error) {
      console.log('Error fetching data from YouTube API', error);
   }
};

export const fetchMultipleVideosData = async (
   keys: string[]
): Promise<any[]> => {
   try {
      const response = await youtubeApi.get(`?part=snippet,statistics,contentDetails&id=${keys.join(',')}&key=${import.meta.env.VITE_YT_API_ACCESS_KEY}`);

      return response.data.items;
   } catch (error) {
      console.error('Error during fetching multiple videos data:', error);
      return [];
   }
};

export const fetchSearchTVWithCredits = async (
   query: string
): Promise<any[]> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      });

      if (response.data.results && response.data.results.length > 0) {
         const resultsWithCredits = await Promise.all(
            response.data.results.map(async (tvShow: any) => {
               const creditsResponse = await apiClient({
                  url: `https://api.themoviedb.org/3/tv/${tvShow.id}/credits?language=en-US`,
               });

               tvShow.credits = creditsResponse.data;
               return tvShow;
            })
         );

         return resultsWithCredits; // just return the array
      }

      return [];
   } catch (error) {
      console.log("Error during fetching of data", error);
      return [];
   }
};

export const fetchSearchMovieWithCredits = async (
   query: string
): Promise<any[]> => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      });

      if (response.data.results && response.data.results.length > 0) {
         const resultsWithCredits = await Promise.all(
            response.data.results.map(async (movie: any) => {
               const creditsResponse = await apiClient({
                  url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`,
               });

               movie.credits = creditsResponse.data;
               return movie;
            })
         );

         return resultsWithCredits;
      }

      return [];
   } catch (error) {
      console.log("Error during fetching of data", error);
      return [];
   }
};

export const fetchGenreList = async () => {
   try {
      const response = await apiClient({
         url: 'https://api.themoviedb.org/3/genre/movie/list?language=en'

      });
      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// My API

export const axiosPrivate = axios.create({
   baseURL: 'http://localhost:3000/',
   withCredentials: true
});

export const fetchMyData = async (
   type: string
): Promise<any> => {
   try {
      const response = await axiosPrivate({
         url: `http://localhost:3000/${type}/`,
      });

      return response.data;
   } catch (error) {
      console.log("Error during fetching of data", error);
      return null;
   }
};

export const getMyMovieDataApi = async (
   type: string,
   movieId: string
): Promise<any> => {
   try {
      const response = await axiosPrivate({
         url: `http://localhost:3000/${type}/${movieId}`
      })

      const responseTwo = await axiosPrivate({
         url: `http://localhost:3000/${type}/${movieId}/recommendations`
      })

      const allResponseData = {
         ...response.data,
         movie: {
            ...response.data.movie,
            recommendations: responseTwo.data.recommendations
         }
      };

      return allResponseData
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const createMovie = async (
   data: any
): Promise<any> => {
   try {
      const response = await axiosPrivate.post('/movie', data);
      console.log('Movie created successfully:', response.data);
      return response.data;
   } catch (error: any) {
      console.error('Error creating movie:', error.response?.data || error.message);
      return null;
   }
};

export const deleteMovie = async (
   id: string | number
): Promise<any> => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}`);
      return response.data;
   } catch (error: any) {
      console.error('Error deleting movie:', error.response?.data || error.message);
      throw error;
   }
};

export const editPrimaryDetails = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/primary-details`, data);
      return response.data;
   } catch (error: any) {
      console.error('Error modifying the movie data:', error.response?.data || error.message);
      throw error;
   }
};


export const addCastMember = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/cast`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('Error adding the cast member:', error.response?.data || error.message);
      throw error;
   }
}

export const deleteCastMemeber = async (
   id: string,
   castId: string
): Promise<any> => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}/cast/${castId}`);
      return response.data;
   }
   catch (error: any) {
      console.error('Error deleting the cast member:', error.response?.data || error.message);
      throw error;
   }
}

export const addCrewMember = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/crew`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('Error adding the crew member:', error.response?.data || error.message);
      throw error;
   }
}

export const deleteCrewMemeber = async (
   id: string,
   castId: string
): Promise<any> => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}/crew/${castId}`);
      return response.data;
   }
   catch (error: any) {
      console.error('Error deleting the crew member:', error.response?.data || error.message);
      throw error;
   }
}

export const changeExternalIds = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/external-ids`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('Error changing the external ids:', error.response?.data || error.message);
      throw error;
   }
}

export const addPoster = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      console.log(data);
      const response = await axiosPrivate.post(`/movie/${id}/posters`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process:', error.response?.data || error.message);
      throw error;
   }
}

export const addBackdrop = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/backdrops`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addLogo = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/logos`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const setPosterPath = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/poster-path`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const setBackdropPath = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/backdrop-path`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addVideo = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/videos`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addGenre = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/genre`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const deleteGenre = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      console.log(data);
      const response = await axiosPrivate.delete(`/movie/${id}/genre`, {
         headers: { 'Content-Type': 'application/json' },
         data: { genre: data },
      });
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addTagline = async (
   id: string,
   data: { taglines: string[] }
): Promise<any> => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/tagline`, data);
      return response.data;
   } catch (error: any) {
      console.error(
         'An error occurred during the process',
         error.response?.data || error.message
      );
      throw error;
   }
};

export const deleteTagline = async (
   id: string,
   data: { taglines: string[] }
): Promise<any> => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}/tagline`, {
         headers: { 'Content-Type': 'application/json' },
         data: { tagline: data },
      });
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addReleaseDate = async (
   id: string,
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/release-date`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const registerUser = async (
   data: FormData
): Promise<any> => {
   try {
      const response = await axiosPrivate.post(`/users/register`, data);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const userLogout = async () => {
   try {
      const response = await axiosPrivate.get(`/logout`);
      return response.data;
   }
   catch (error: any) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}