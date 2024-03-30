import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : {
        fName: "",
        lName: "",
      };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black shadow-lg">
      <div className="w-full px-4">
        <div className="flex items-center justify-between py-4">
          <div className="text-2xl font-semibold text-white">RSTBS</div>

          <div className="">
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="relative flex items-center justify-center gap-2 pl-4 text-sm bg-gray-800 rounded-full">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <span className="text-white">{user.fName}</span>
                  {/* {1 === 1 ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={UserImg}
                      alt="user profile"
                    />
                  ) : ( */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pp-primary-100">
                    <p className="text-sm font-medium">
                      {user.fName?.[0]?.toUpperCase()}
                      {user.lName?.[0]?.toUpperCase()}
                    </p>
                  </div>
                  {/* )} */}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 p-1 mt-2 origin-top-right bg-white shadow-lg cursor-pointer z-[100] rounded-xl w-52 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {() => (
                      <a href={`/profile`}>
                        <div className="flex items-center w-full h-8 gap-2 px-4 m-0 overflow-hidden text-sm rounded-lg cursor-pointer text-pp-gray-900 hover:bg-pp-gray-200 active:bg-pp-gray-450">
                          {/* <UserIcon /> */}
                          <span className="text-sm font-medium">Profile</span>
                        </div>
                      </a>
                    )}
                  </Menu.Item>
                  <div className="h-[1px] bg-pp-gray-450 my-1" />
                  <Menu.Item>
                    {() => (
                      <span onClick={handleLogout}>
                        <div className="flex items-center w-full h-8 gap-2 px-4 m-0 overflow-hidden text-sm rounded-lg cursor-pointer text-pp-gray-900 hover:bg-pp-gray-200 active:bg-pp-gray-450">
                          {/* <LogoutIcon /> */}
                          <span className="text-sm font-medium">Logout</span>
                        </div>
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
