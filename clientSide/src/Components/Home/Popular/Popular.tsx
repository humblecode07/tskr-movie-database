import { useState } from 'react'
import { TabSwitch } from '../../Button/Buttons'
import MovieCarousel from '../MovieCarousel';

const Popular = () => {
   const [selectedView, setSelectedView] = useState(1);

   const handleCategoryChange = (value : any) => {
      setSelectedView(value);
   };

   return (
      <div className="popular-container">
         <div className="popular-header">
            <h2 className="popular-title">What's Popular</h2>
            <TabSwitch
               section={1}
               selectedTab={selectedView}
               onTabChange={handleCategoryChange}
            />
         </div>
         <span className="popular-description">
            Discover the latest hits everyone's talking about! Stay updated with the most-watched and trending movies and see what's hot on TV right now.
         </span>
         <MovieCarousel section={1} query={`${selectedView === 1 ? 'movie' : 'tv'}`} />
      </div>
   )
}

export default Popular
