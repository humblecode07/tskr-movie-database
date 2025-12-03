import MovieCarousel from '../MovieCarousel'

const Upcoming = () => {
   return (
      <div className='upcoming-container'>
         <h2 className='upcoming-title'>On the Horizon</h2>
         <span className='upcoming-description'>
            Don't miss out on the films set to premiere soon. Here’s what’s coming your way.
         </span>
         <MovieCarousel section={2} />
      </div>
   )
}

export default Upcoming
