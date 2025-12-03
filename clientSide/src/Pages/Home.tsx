import { useEffect } from 'react'
import NowShowing from '../Components/Home/NowShowing/NowShowing'
import FreshPicks from '../Components/Home/FreshPicks/FreshPicks'
import Popular from '../Components/Home/Popular/Popular'
import Upcoming from '../Components/Home/Upcoming/Upcoming'

const Home = () => {
  useEffect(() => {
    // Change tab title
    document.title = 'tskr! Movie Database Website';
  }, [])

  return (
    <>
      <main className='page-container'>
        <NowShowing />
        <FreshPicks />
        <Popular />
        <Upcoming />
      </main>
    </>
  )
}

export default Home
