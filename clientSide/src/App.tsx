import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './Styles/Components/Header/Header.css'
import './Styles/Pages/Home.css'
import './Styles/Components/Footer/Footer.css'
import './Styles/Components/Home/FreshPicks.css'
import './Styles/Components/Button/Buttons.css'
import './Styles/Components/Home/MovieCarousel.css'
import './Styles/Components/Home/NowShowing.css'
import './Styles/Components/Home/Popular.css'
import './Styles/Components/Home/Upcoming.css'
import './Styles/Components/Header/Admin/Header.css'
import './Styles/Components/Admin/CreateMovie/AdditionalDetails.css'
import './Styles/Components/Admin/CreateMovie/AddMovieDetails.css'
import './Styles/Components/Admin/CreateMovie/MovieContentCheck.css'
import './Styles/Components/Admin/CreateMovie/TranslationCheck.css'
import './Styles/Components/Admin/CreateMovie/VerifyAndSave.css'
import './Styles/Components/Admin/Credits/Jobs/JobSearch.css'
import './Styles/Components/Admin/Credits/Jobs/JobSearchBar.css'
import './Styles/Components/Admin/Credits/Search.css'
import './Styles/Components/Admin/Credits/SearchBar.css'
import './Styles/Components/Admin/Credits/SearchResult.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/AdultMovie.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/Budget.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/Homepage.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/MovieStatus.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/OriginalMovieLanguage.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/OriginalTitle.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/OriginCountry.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/Revenue.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/Runtime.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/TranslatedOverview.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/TranslatedTitle.css'
import './Styles/Components/Admin/EditMovie/PrimaryDetails/Video.css'
import './Styles/Components/Admin/EditMovie/ReleaseDates/CertificationsSelect.css'
import './Styles/Components/Admin/EditMovie/ReleaseDates/CountrySearch.css'
import './Styles/Components/Admin/EditMovie/ReleaseDates/CountrySearchBar.css'
import './Styles/Components/Admin/EditMovie/ReleaseDates/LanguageSearch.css'
import './Styles/Components/Admin/EditMovie/ReleaseDates/LanguageSearchBar.css'
import './Styles/Components/Admin/EditMovie/Cast.css'
import './Styles/Components/Admin/EditMovie/Crew.css'
import './Styles/Components/Admin/EditMovie/ExternalIDs.css'
import './Styles/Components/Admin/EditMovie/Genres.css'
import './Styles/Components/Admin/EditMovie/Images.css'
import './Styles/Components/Admin/EditMovie/PrimayDetails.css'
import './Styles/Components/Admin/EditMovie/ReleaseInformation.css'
import './Styles/Components/Admin/EditMovie/Taglines.css'
import './Styles/Components/Admin/EditMovie/Videos.css'
import './Styles/Components/Admin/Modals/Modals.css'
import './Styles/Components/Admin/MovieDetails/Images.css'
import './Styles/Components/Admin/MovieDetails/Recommendations.css'
import './Styles/Components/Admin/MovieDetails/Videos.css'
import './Styles/Components/Admin/SearchFilter.css'
import './Styles/Components/Details/Casts.css'
import './Styles/Components/Details/Credits.css'
import './Styles/Components/Details/Divider.css'
import './Styles/Components/Details/DividerTwo.css'
import './Styles/Components/Details/Medias.css'
import './Styles/Components/Details/Overview.css'
import './Styles/Components/Details/OverviewMedia.css'
import './Styles/Components/Details/OverviewPanel.css'
import './Styles/Components/Details/Recommendations.css'
import './Styles/Components/Details/Section.css'
import './Styles/Components/Details/ShowCollege.css'
import './Styles/Components/Details/Videos.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/Certification.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/Genres.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/Keywords.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/Language.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/ReleaseYear.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/Runtime.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/SearchKeywords.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/UserRating.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption/WatchProvider.css'
import './Styles/Components/ShowsList/ListManager/ViewDisplay/CompactView.css'
import './Styles/Components/ShowsList/ListManager/ViewDisplay/DetailModal.css'
import './Styles/Components/ShowsList/ListManager/ViewDisplay/GridVIew.css'
import './Styles/Components/ShowsList/ListManager/DisplayViewOption.css'
import './Styles/Components/ShowsList/ListManager/FilteringOption.css'
import './Styles/Components/ShowsList/ListManager/SortByOption.css'
import './Styles/Components/ShowsList/Divider.css'
import './Styles/Components/ShowsList/Marquee.css'
import './Styles/Components/Sidebar/Sidebar.css'
import './Styles/Pages/Admin/AdminLayout.css'
import './Styles/Pages/Admin/AdminMovie.css'
import './Styles/Pages/Admin/AdminMovieDetails.css'
import './Styles/Pages/Admin/CreateMovie.css'
import './Styles/Pages/Admin/EditMovie.css'
import './Styles/Pages/Details/MovieCredits.css'
import './Styles/Pages/Details/MovieDetails.css'
import './Styles/Pages/Details/MovieImages.css'
import './Styles/Pages/Details/MovieVideos.css'
import './Styles/Pages/Details/TvDetail.css'
import './Styles/Pages/Lists/MovieList.css'
import './Styles/Pages/Lists/PeopleList.css'
import './Styles/Pages/Lists/TvList.css'
import './Styles/Pages/Marquees.css'
import './Styles/Pages/SignIn.css'
import './Styles/Pages/Register.css'
import Home from './pages/Home'
import MovieList from './pages/Lists/MovieList'
import TvList from './pages/Lists/TvList'
import PeopleList from './pages/Lists/PeopleList'
import './Styles/Components/Lists/GridView.css'
import MovieDetails from './pages/Details/MovieDetails'
import MovieImages from './pages/Details/MovieImages'
import MovieCredits from './pages/Details/MovieCredits'
import MovieVideos from './pages/Details/MovieVideos'
import TvDetails from './pages/Details/TvDetails'
import TvCredits from './pages/Details/TvCredits'
import TvVideos from './pages/Details/TvVideos'
import TvImages from './pages/Details/TvImages'
import SignIn from './pages/SignIn'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './pages/PublicLayout'
import AdminLayout from './pages/Admin/AdminLayout'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './pages/PersistLogin'
import AdminMovie from './pages/Admin/AdminMovie'
import CreateMovie from './pages/Admin/CreateMovie'
import EditMovie from './pages/Admin/EditMovie'
import AdminMovieDetails from './pages/Admin/AdminMovieDetails'
import Register from './pages/Register'

const adminRole = Number(import.meta.env.VITE_YT_ROLE_ADMIN);
export const LOCALHOST = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/movies',
        element: <MovieList />
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />
      },
      {
        path: '/movies/:movieId/cast',
        element: <MovieCredits />
      },
      {
        path: '/movies/:movieId/videos',
        element: <MovieVideos />
      },
      {
        path: '/movies/:movieId/images/:mediaType',
        element: <MovieImages />
      },
      {
        path: '/tv',
        element: <TvList />
      },
      {
        path: '/tv/:tvId',
        element: <TvDetails />
      },
      {
        path: '/tv/:tvId/cast',
        element: <TvCredits />
      },
      {
        path: '/tv/:tvId/videos',
        element: <TvVideos />
      },
      {
        path: '/tv/:tvId/images/:mediaType',
        element: <TvImages />
      },
      {
        path: '/people',
        element: <PeopleList />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <PersistLogin />,
    children: [
      {
        path: 'admin',
        element: (
          <RequireAuth allowedRoles={[adminRole]}>
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          { path: 'movie', element: <AdminMovie /> },
          { path: 'movie/create', element: <CreateMovie /> },
          { path: 'movie/:movieId', element: <AdminMovieDetails /> },
          { path: 'movie/:movieId/edit', element: <EditMovie /> },
        ]
      }
    ]
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

