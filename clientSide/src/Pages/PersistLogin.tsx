import { Outlet } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
   const refresh = useRefreshToken();
   const { user } : any = useAuth();

   const { isLoading, isError } = useQuery({
      queryKey: ['refreshToken'], // Query key in array form
      queryFn: async () => await refresh(), // The function to fetch data
      enabled: !user?.accessToken, // Only enable if there's no access token
      retry: false, // Do not retry on failure
      refetchOnWindowFocus: false // Do not refetch when window regains focus
   });

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (isError) {
      return <p>Error refreshing token. Please login again.</p>;
   }

   return <Outlet />;
}

export default PersistLogin