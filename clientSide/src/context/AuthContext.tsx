import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

export const AuthProvider = ({ children } : any) => {
   const [user, setUser] = useState(() => {
      const savedJWT = localStorage.getItem("jwt");
      
      if (savedJWT) {
         try {
            const decodedToken = jwtDecode(savedJWT);
            return { ...decodedToken, accessToken: savedJWT };
         } 
         catch (error) {
            console.error('Invalid token', error);
            return null;
         }
      }
      
      return null;
   });

   useEffect(() => {
      if (user?.accessToken) {
         localStorage.setItem("jwt", user.accessToken);
      } 
      else {
         localStorage.removeItem("jwt");
      }
   }, [user]);

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
}
