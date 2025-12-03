import { createContext, useEffect, Dispatch, SetStateAction } from 'react'
import Marquee from '../../Components/ShowsList/Marquee'
import DisplayViewOption from '../../Components/ShowsList/ListManager/DisplayViewOption'
import FilteringOption from '../../Components/ShowsList/ListManager/FilteringOption'
import SortByOption from '../../Components/ShowsList/ListManager/SortByOption'
import CompactView from '../../Components/ShowsList/ListManager/ViewDisplay/CompactView'
import GridView from '../../Components/ShowsList/ListManager/ViewDisplay/GridView'
import { useShowsList } from '../../hooks/useShowsList'

interface ContextTvShowsType {
   streamType: 'tv';
   filters: any;
   handleFilterChange: (filterName: any, value: any) => void;
   setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const ContextTvShows = createContext<ContextTvShowsType | undefined>(undefined);

const TvList: React.FC = () => {
   const { items: tvShows, filters, handleFilterChange, selectedSortBy, setSelectedSortBy, setCurrentPage, selectedView, setSelectedView } = useShowsList('tv');

   useEffect(() => {
      // Change tab title
      document.title = 'tskr! Movie Database Website';
   }, [])

   return (
      <>
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"tv shows"} />
            <ContextTvShows.Provider value={{ streamType: 'tv', filters, handleFilterChange, setCurrentPage }}>
               <div className='w-[66.5625rem] flex justify-between'>
                  <div className='flex items-center gap-[2.5625rem]'>
                     <FilteringOption />
                     <SortByOption stream="tv" selectedSorting={selectedSortBy} setSelectedSorting={setSelectedSortBy} resetCurrentPage={setCurrentPage} />
                  </div>
                  <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
               </div>
               {selectedView === 0
                  ? <CompactView streams={tvShows} />
                  : <GridView streams={tvShows} />
               }
            </ContextTvShows.Provider>
         </main>
      </>
   )
}

export default TvList