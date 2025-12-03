import { useState } from 'react'
import SearchIcon from '../../../assets/Icons/Admin/SearchIcon'
import SearchBar from './SearchBar'

const SearchBox = () => {
   const [isToggled, setIsToggled] = useState(false);

   console.log(isToggled);

   return (
      <div className='w-[38.4375rem] overflow-hidden flex'>
         <SearchBar isToggled={isToggled} setIsToggled={setIsToggled} />
         <div
            onClick={() => {
               if (isToggled === false) {
                  setIsToggled(!isToggled)
               }
            }}
            className={`w-[3.3125rem] h-[3.3125rem] ${isToggled ? `rounded-r-[0.75rem]` : `rounded-[0.75rem]`} bg-[#CC511D] flex justify-center items-center cursor-pointer transition-all relative z-[1]`}
         >
            <SearchIcon />
         </div>
      </div>
   )
}

export default SearchBox
