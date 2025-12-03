import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { jwtDecode } from 'jwt-decode';
import useLogout from '../../../hooks/useLogout';

const Account = () => {
  const { user } : any = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const decoded : any = user?.accessToken ? jwtDecode(user.accessToken) : undefined

  const username = decoded?.email; // serves as username, for now....

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const signOut = async () => {
    await logout();
    setDropdownOpen((prev) => !prev);
    navigate('/');
  }

  return (
    username ? (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className='w-[4.3125rem] overflow-hidden cursor-pointer'
        >
          {username}
        </button>
        {dropdownOpen && (
          <div className="absolute z-[5] top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-md">
            <ul className="flex flex-col">
              <li
                onClick={() => signOut()} 
                className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 cursor-pointer"
              >
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    ) : (
      <NavLink
        to={'/signin'}
        className='w-[4.3125rem] h-[2rem] text-black bg-[#d8d8d8] dark:text-white dark:bg-[#1C252F] flex items-center justify-center rounded-md hover:bg-[#b0b0b0] dark:hover:bg-[#141c27] active:bg-[#8a8a8a] dark:active:bg-[#0f161e]'
      >
        <span className='absolute text-[0.875rem] z-30'>Sign In</span>
      </NavLink>
    )
  );
}

export default Account
