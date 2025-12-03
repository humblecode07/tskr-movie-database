import SearchResult from './SearchResult';

interface MovieResult {
  id?: string | number
  _id?: string | number
  media_type: 'movie'
  title?: string
  original_title?: string
  release_date?: string
  overview: string
  poster_path: string
}

interface TVResult {
  id?: string | number
  _id?: string | number
  media_type: 'tv'
  name: string
  first_air_date?: string
  overview: string
  poster_path: string
}

interface PersonResult {
  id?: string | number
  _id?: string | number
  media_type: 'person'
  name: string
  known_for_department: string
  profile_path: string
  known_for: Array<{
    title?: string
  }>
}

type SearchResultItem = MovieResult | TVResult | PersonResult

interface SearchResultListProps {
  results: SearchResultItem[]
}

interface SearchResultData {
  id: string | number
  streamType: string
  dataOne: string
  dataTwo: string
  dataThree: string
  dataFour: string
}

const SearchResultList = ({ results }: SearchResultListProps) => {

  return (
    <div className='w-full h-auto bg-[#D9D9D9] flex flex-col justify-center text-black rounded-[.125rem] mt-[.3rem] absolute z-[50] dark:bg-[#1C252F]'>
      {results.map((result, index) => {
        let searchData: SearchResultData | null = null;

        if (result.media_type === "movie") {
          searchData = {
            id: result.id || result._id || '',
            streamType: 'movies',
            dataOne: result.title || result.original_title || '',
            dataTwo: [
              result.media_type,
              result.release_date ? result.release_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "tv") {
          searchData = {
            id: result.id || result._id || '',
            streamType: 'tv',
            dataOne: result.name,
            dataTwo: [
              result.media_type,
              result.first_air_date ? result.first_air_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "person") {
          searchData = {
            id: result.id || result._id || '',
            streamType: 'person',
            dataOne: result.name,
            dataTwo: result.known_for_department,
            dataThree: [
              result.known_for[0]?.title,
              result.known_for[1]?.title,
              result.known_for[2]?.title
            ].filter(Boolean).join(', '),
            dataFour: result.profile_path
          }
        }

        return searchData ? <SearchResult data={searchData} key={index} /> : null
      })}
    </div>
  )
}

export default SearchResultList