const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const releaseDatesSchema = require('./releaseDates.model');
const genresSchema = require('./genres.model');
const externalIdsSchema = require('./external_ids.model');
const castSchema = require('./casts.model');
const crewSchema = require('./crews.model');
// const recommendationSchema = require('./recommendations.model');
const imageSchema = require('./images.model');
const videoSchema = require('./videos.model');
const videosSchema = require('./videos.model');

const movieSchema = new Schema({
   adult: { type: String },
   backdrop_path: { type: String, default: null },
   budget: { type: Number },
   credits: { 
      cast: { 
        type: [castSchema], 
        default: [] 
      }, 
      crew: { 
        type: [crewSchema], 
        default: [] 
      } 
    },
   genres: [genresSchema],
   homepage: { type: String },
   images: { backdrops: [imageSchema], posters: [imageSchema], logos: [imageSchema] },
   imdb_id: { type: String },
   external_ids: externalIdsSchema,
   media_type: { type: String },
   origin_country: { type: [String] },
   original_language: { type: String },
   original_title: { type: String, required: true },
   overview: { type: String, required: true },
   popularity: { type: Number, default: 0 },
   poster_path: { type: String },
   release_date: { type: Date },
   release_dates: releaseDatesSchema,
   // recommendations: recommendationSchema,
   revenue: { type: Number },
   runtime: { type: Number },
   status: { type: String },
   tagline: { type: String },
   title: { type: String },
   video: { type: String },
   videos: [videosSchema],
   vote_average: { type: Number, default: 0 },
   vote_count: { type: Number, default: 0 },
}, { 
   // Add this to ensure no unexpected fields are saved
   strict: true 
});

module.exports = mongoose.model("Movies", movieSchema)