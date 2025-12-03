import { useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface RequireAuthProps {
  allowedRoles: number[];
  children: ReactNode;
}

interface DecodedToken {
  roles?: string[];
}

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { user } : any = useAuth();
  const location = useLocation();

  const decoded: DecodedToken | undefined = user?.accessToken
    ? jwtDecode<DecodedToken>(user.accessToken)
    : undefined;

  const roles = decoded?.roles ?? [];

  console.log("Auth role find:", roles);

  const hasAccess = roles.some((role : any) => allowedRoles.includes(role));

  console.log("has access:", hasAccess);

  if (hasAccess) {
    return children;
  }

  if (user?.accessToken) {
    return (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequireAuth;
