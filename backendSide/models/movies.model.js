const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const releaseDatesSchema = require('./releaseDates.model');
const genresSchema = require('./genres.model');
const externalIdsSchema = require('./external_ids.model');
const castSchema = require('./casts.model');

const movieSchema = new Schema({
   adult: { type: Boolean },
   backdrop_path: { type: String },
   budget: { type: Number, required: true },
   casts: { cast: [castSchema] },
   genres: [genresSchema],
   homepage: { type: String },
   imdb_id: { type: String },
   external_ids: externalIdsSchema,
   media_type: { type: String },
   origin_country: { type: [String] },
   original_language: { type: String },
   original_title: { type: String, required: true },
   overview: { type: String, required: true },
   popularity: { type: Number },
   poster_path: { type: String },
   release_date: { type: Date, required: true },
   release_dates: releaseDatesSchema,
   revenue: { type: Number, required: true },
   runtime: { type: Number, required: true },
   status: { type: String },
   tagline: { type: String, required: true },
   video: { type: Boolean },
   vote_average: { type: Number },
   vote_count: { type: Number },
});

module.exports = mongoose.model("Movies", movieSchema)