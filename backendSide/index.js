require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./config/dbConn');
const createError = require('http-errors'); // You need to require this for the error handling
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routers
const usersRouter = require('./routes/users.route');
const movieRouter = require('./routes/movie.route');
const searchRouter = require('./routes/search.route');
const authRouter = require('./routes/auth.route');
const refreshTokenRouter = require('./routes/refreshToken.route');
const logoutRouter = require('./routes/logout.route');
const imageRouter = require('./routes/image.route');

const app = express(); // Initialize the Express app

const PORT = process.env.PORT || 3000;
connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
   origin: [
      'http://localhost:5173',
      'https://tskr-movie-database.vercel.app'
   ],
   credentials: true,
}));

app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/movie', movieRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/refresh', refreshTokenRouter);
app.use('/logout', logoutRouter);
app.use('/images', imageRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
   // Set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // Render the error page
   res.status(err.status || 500);
   res.json({
      error: {
         message: res.locals.message,
         error: res.locals.error
      }
   });
});

// Connection event listener
mongoose.connection.once('open', () => {
   console.log('Connected to MongoDB');
   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
