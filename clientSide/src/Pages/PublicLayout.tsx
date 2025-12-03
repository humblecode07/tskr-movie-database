import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Components/Header/Client/Header'
import Footer from '../Components/Footer/Footer'

const PublicLayout = () => {
  const location = useLocation();

  // Routes that needs header to be hid
  const routes = ['/signin', '/signup'];

  const checkRoutes = routes.includes(location.pathname);

  console.log(checkRoutes);

  return (
    <>
      <div className='page-wrapper'>
        {!checkRoutes && <Header />}
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default PublicLayout