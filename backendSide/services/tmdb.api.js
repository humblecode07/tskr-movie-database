const axios = require('axios');

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
   },
});

/* For Release Dates */

exports.validate_country = async (countryName) => {
   try {
      const response = await apiClient({
         url: '/configuration/countries'
      })
      const countryData = response.data.find(country => country.english_name.toLowerCase() === countryName.toLowerCase());

      if (countryData) return countryData.iso_3166_1;
      else return null;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
      throw error;
   }
};

exports.validate_language = async (languageName) => {
   try {
      const response = await apiClient({
         url: '/configuration/languages'
      })
      console.log(languageName)

      const languageData = response.data.find(language => language.english_name.toLowerCase() === languageName.toLowerCase());

      if (languageData) return languageData.iso_639_1;
      else return null;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
      throw error;
   }
};

exports.validate_certification = async (certification, iso_3166_1) => {
   try {
      const response = await apiClient({
         url: '/certification/movie/list'
      })

      const certificationsCountry = response.data.certifications[iso_3166_1];
      const certEntry = certificationsCountry.find(certEntry => certEntry.certification === certification);

      if (certEntry) return certEntry;

      return null
   }
   catch (error) {
      console.log('Error during fetching of data', error);
      throw error;
   }
};

exports.validate_genre = async (genreName) => {
   try {
      const response = await apiClient({
         url: '/genre/movie/list'
      });

      const genres = response.data.genres;
      const genreExists = genres.find(genre => genre.name.toLowerCase() === genreName.toLowerCase());

      return genreExists;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
      throw error;
   }
};

exports.fetch_cast_data = async (person_id) => {
   try {
      const response = await apiClient({
         url: `/person/${person_id}`
      });

      return response.data;
   } catch (error) {
      if (error.status) console.error("Bad request, this person doesn't exist in the database");
      else console.error('Error during fetching of data:', error);
      throw error;
   }
};

exports.validate_jobs = async (department, job) => {
   try {
      const response = await apiClient({
         url: `/configuration/jobs`
      });

      const jobsData = response.data;

      const jobValidationMap = jobsData.reduce((acc, dept) => {
         acc[dept.department] = new Set(dept.jobs);
         return acc;
      }, {});

      if (jobValidationMap[department]) {
         return jobValidationMap[department].has(job);
      }

      return false;
   } catch (error) {
      console.log('Error during fetching of data', error);
      throw error;
   }
};

exports.fetch_recommendations = async (params) => {
   try {
      const response = await apiClient({
         url: `/discover/movie?include_adult=${params.adult}&include_video=${params.video}&language=en-US&page=1&release_date.lte=${params.release_date}&sort_by=popularity.desc&with_genres=${params.genres}&with_original_language=${params.original_language}&vote_average.lte=${params.vote_average}`
      });

      return response.data.results;
   } 
   catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
   }
};