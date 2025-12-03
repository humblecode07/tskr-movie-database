import IgopImg from '../../../assets/Image/Igop.jpg'
import { Link } from 'react-router-dom'
import { LOCALHOST } from '../../../App'
import { SyntheticEvent } from 'react'

interface SearchResultData {
   id: string | number
   streamType: string
   dataOne: string
   dataTwo: string
   dataThree: string
   dataFour: string
}

interface SearchResultProps {
   data: SearchResultData
}

const SearchResult = ({ data }: SearchResultProps) => {
   console.log(data)

   const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement
      target.onerror = null
      target.onerror = () => {
         target.src = IgopImg
      }
      target.src = `${LOCALHOST}/images/${data.dataFour}`
   }

   return (
      <Link
         to={`/${data.streamType}/${data.id}`}
         className="flex h-[7.8175rem] justify-center border-b-[1px] border-solid border-[#9D9D9D] hover:bg-[#C0C0C0] active:bg-color[#AFAFAF] dark:text-white dark:border-[#C9C9C9] dark:hover:bg-[#141C27] dark:active:bg-[#0F161E]"
      >
         <div className="flex gap-[1.0625rem] py-[.875rem]">
            <img
               className="search-result-image"
               src={`https://image.tmdb.org/t/p/w500${data.dataFour}`}
               alt={data.dataOne}
               onError={handleImageError}
            />
            <article className="w-[17.3125rem] flex flex-col">
               <span className="font-roboto font-medium text-[1rem] overflow-hidden truncate whitespace-nowrap">{data.dataOne}</span>
               <span className="font-roboto font-light text-[.875rem] overflow-hidden truncate whitespace-nowrap">{data.dataTwo}</span>
               <p className="font-roboto text-[.75rem] overflow-hidden truncate whitespace-normal line-clamp-3">{data.dataThree}</p>
            </article>
         </div>
      </Link>
   )
}

export default SearchResult