import { useState } from 'react'

const SearchBar = ({ isToggled, setIsToggled } : any) => {
  const [search, setSearch] = useState('');

  const handleChange = (search : any) => {
    setSearch(search);
  }

  const handleBlur = () => {
    if (search === '') {
      setIsToggled(false);
    }
  };

  return (
    <div className={`${isToggled ? 'opacity-100' : 'opacity-0'} w-[35.1875rem] h-[3.3125rem] rounded-l-[0.75rem] border-[1px] border-solid border-[#CC511D] flex items-center ${isToggled ? "translate-x-0" : "translate-x-[100%]"} transition-all duration-500 ease-in-out relative z-[1]`}>
      <div className="min-h-[1.1875rem] w-[33.0625rem] flex flex-row items-center ml-[1.0625rem]">
        <input
          className='w-full font-roboto font-light bg-transparent outline-none text-white' type="text"
          placeholder='Search for movies, tv shows, or actors...'
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}

export default SearchBar
