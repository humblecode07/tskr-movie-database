import { useEffect } from 'react'
import NowShowing from '../components/Home/Now Showing/NowShowing'
import FreshPicks from '../components/Home/Fresh Picks/FreshPicks'
import Popular from '../components/Home/Popular/Popular'
import Upcoming from '../components/Home/Upcoming/Upcoming'

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
