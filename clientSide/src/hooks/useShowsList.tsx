import { useState, useEffect } from 'react';
import { apiFetch } from '../api/api';
import _ from 'lodash';

type TMDBParams = Record<string, string | number | undefined>;

export const useShowsList = (type: any) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    genres: [],
    watchProviders: {
      name: 'Philippines',
      watchRegion: 'PH',
      moviePlatform: []
    },
    releaseYear: { gteYear: '', lteYear: '' },
    userScore: { minScore: 0, maxScore: 10 },
    runtime: { gteRuntime: '', lteRuntime: '' },
    certification: { rating: [], certCountry: 'PH' },
    originalLanguage: { iso_639_1: '', english_name: '' },
    keyword: { keywordIds: [], keywords: [] },
  });


  const handleFilterChange = (filterName: any, value: any) => {
    setFilters(prevFilters => {
      if (filterName === 'watchProviders') {
        return {
          ...prevFilters,
          watchProviders: {
            ...prevFilters.watchProviders,
            ...value
          }
        };
      } else if (filterName === 'userScore') {
        return {
          ...prevFilters,
          userScore: {
            ...prevFilters.userScore,
            ...value
          }
        };
      }
      else if (filterName === 'releaseYear') {
        return {
          ...prevFilters,
          releaseYear: {
            ...prevFilters.releaseYear,
            ...value
          }
        };
      }
      else if (filterName === 'runtime') {
        return {
          ...prevFilters,
          runtime: {
            ...prevFilters.runtime,
            ...value
          }
        };
      }
      else if (filterName === 'certification') {
        return {
          ...prevFilters,
          certification: {
            ...prevFilters.certification,
            ...value
          }
        };
      }
      else if (filterName === 'originalLanguage') {
        return {
          ...prevFilters,
          originalLanguage: {
            ...prevFilters.originalLanguage,
            ...value
          }
        };
      }
      else if (filterName === 'keyword') {
        return {
          ...prevFilters,
          keyword: {
            ...prevFilters.keyword,
            ...value
          }
        };
      }
      else {
        return {
          ...prevFilters,
          [filterName]: value
        };
      }
    });
  };

  const [selectedSortBy, setSelectedSortBy] = useState({
    value: 'popularity.desc',
    label: 'Popularity Descending',
  });

  const [selectedView, setSelectedView] = useState(0);

  useEffect(() => {
    const genreValues = Object.values(filters.genres);
    const selectedGenres = genreValues.join(',');
    const selectedWatchProviders = filters.watchProviders.moviePlatform.join('|');
    const selectedCertification = filters.certification.rating.join('|');
    const selectedKeywords = filters.keyword.keywordIds.join('|');
    const selectedLanguage = filters.originalLanguage.iso_639_1 === 'xx' ? '' : filters.originalLanguage.iso_639_1;

    const queryParams: TMDBParams = {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: String(currentPage),
      sort_by: selectedSortBy.value,
      with_genres: selectedGenres || '',
      watch_region: filters.watchProviders.watchRegion || '',
      with_watch_providers: selectedWatchProviders || '',
      'vote_average.gte': filters.userScore.minScore || '',
      'vote_average.lte': filters.userScore.maxScore || '',
      ...(type === 'movie' && {
        'release_date.gte': filters.releaseYear.gteYear || '',
        'release_date.lte': filters.releaseYear.lteYear || '',
      }),
      ...(type === 'tv' && {
        'air_date.gte': filters.releaseYear.gteYear || '',
        'air_date.lte': filters.releaseYear.lteYear || '',
      }),
      'with_runtime.gte': filters.runtime.gteRuntime || '',
      'with_runtime.lte': filters.runtime.lteRuntime || '',
      certification: selectedCertification,
      certification_country: filters.certification.certCountry,
      with_original_language: selectedLanguage,
      with_keywords: selectedKeywords,
    };


    const fetchData = async () => {
      try {
        const data = await apiFetch(`/discover/${type}?${queryParams}`);

        setItems(prevItems => {
          if (currentPage === 1) return data.results;
          const existingItemIds = new Set(prevItems.map((item : any) => item.id));
          const newItems = data.results.filter((item : any) => !existingItemIds.has(item.id));
          return [...prevItems, ...newItems];
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const handleScroll = _.debounce(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;
      if (scrollPosition >= documentHeight) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filters, selectedSortBy, currentPage, type]);

  return { items, filters, handleFilterChange, selectedSortBy, setSelectedSortBy, setCurrentPage, selectedView, setSelectedView };
};