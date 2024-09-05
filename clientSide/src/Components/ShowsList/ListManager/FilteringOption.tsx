import React, { useState } from 'react'
import FilterIcon from '../../../assets/Icons/FilterIcon'
import XIcon from '../../../assets/Icons/XIcon';
import Genres from './FilteringOption/Genres';
import Divider from '../Divider';
import WatchProvider from './FilteringOption/WatchProvider';

const FilteringOption = ({ filters, onFilterChange }) => {
   const [openFilterModal, setOpenFilterModal] = useState(false);

   function openModal() {
      setOpenFilterModal(!openFilterModal)
   }

   return (
      <>
         <button
            className='w-[10.5rem] h-[2.25rem] flex justify-center items-center gap-[0.8125rem] text-white bg-[#1C252F] rounded-[0.625rem] text-[0.875rem]'
            onClick={openModal}
         >
            <FilterIcon />
            <span>Filtering Options</span>
         </button>
         {openFilterModal &&
            <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[10] flex items-center justify-center'>
               <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-[#111111] opacity-50'></div>
               <div className='w-[41.5rem] h-[45rem] bg-[#1b1b1b] z-[10] relative rounded-[5px] overflow-auto'>
                  <div className='h-full w-full relative py-[2rem] px-[2.8125rem]'>
                     <button
                        className='w-9 h-9 bg-[#9b9b9b] rounded-full flex items-center justify-center absolute right-[.5rem] top-[.5rem]'
                        onClick={openModal}
                     >
                        <XIcon />
                     </button>
                     <Genres selectedGenres={filters.genres} onGenreChange={genres => onFilterChange('genres', genres)} />
                     <Divider />
                     <WatchProvider selectedProviders={filters.watchProviders} onProvidersChange={providers => onFilterChange('watchProviders', providers)} />
                     <Divider />
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default FilteringOption