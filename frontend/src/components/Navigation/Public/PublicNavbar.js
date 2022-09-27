import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ImBlog } from 'react-icons/im'
import {
  MenuIcon,
  XIcon,
  LoginIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "HOME", href: "/", current: false },

  { name: "POSTS", href: "/posts", current: false },
  // { name: "REGISTER", href: "/register", current: false },
  // { name: "LOGIN", href: "/login", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PublicNavbar = () => {
  return (
    <Disclosure as="nav" className="bg-cyan-900 fixed top-0 left-0 right-0 z-10">
      {({ open }) => (
        <>
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 " >
            <div className="flex justify-between h-20">
              <div className="flex">
                <div className="-ml-2 mr-5 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <ImBlog className="h-10 w-10 text-white" />
                  <span className="ml-3 text-2xl text-white font-bold">PROCODER</span>
                </div>

              </div>
              <div className="hidden  md:flex md:items-center md:justify-center  md:space-x-6">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-cyan-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <Link
                    to="/login"
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-900 "
                  >
                    <LoginIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>LOGIN</span>
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-800 hover:bg-rose-900 focus:outline-none "
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>REGISTER</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
              <a
                href={'/register'}

                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"

                aria-current={undefined}
              >
                REGISTER
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;
