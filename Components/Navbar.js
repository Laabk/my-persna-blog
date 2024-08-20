import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiTerminal } from "react-icons/bi";
import { HiSun, HiMoon } from "react-icons/hi";
import { CgUserlane } from "react-icons/cg";
import { AiOutlineGoogle } from "react-icons/ai";
import { auth, provider } from "../Firebase/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { SiCodefactor } from "react-icons/si";
import { IoMdArrowDropdown } from "react-icons/io";
import Alert from "./Alert";
import { useDispatch } from "react-redux";

function Navbar({ topics }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const { theme, setTheme } = useTheme();
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "STORE_USER", payload: user });
      setLogin(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  const handelSignOut = () => {
    signOut(auth)
      .then((res) => {
        setLogin(false);
        localStorage.removeItem("user");
        dispatch({ type: "REMOVE_USER" });
        setViewAlert(true);
        setAlertMessage("Hope to see you again !!");
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const userObj = {
          name: res.user.displayName,
          photo: res.user.photoURL,
          token: res.user.accessToken,
          uid: res.user.uid,
        };

        localStorage.setItem("user", JSON.stringify(userObj));
        dispatch({ type: "STORE_USER", payload: userObj });

        setLogin(true);
        setViewAlert(true);
        setAlertMessage(`Hello ${res.user.displayName}`);
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Alert show={viewAlert} type="success" message={alertMessage} />
      <header className="fixed w-full bg-indigo-600 dark:bg-indigo-900 shadow z-50">
        <div className="container mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center text-gray-50 hover:text-gray-200">
                <BiTerminal className="text-2xl" />
                <span className="ml-2 text-lg font-semibold">Latest</span>
              </a>
            </Link>
            <div className="relative ml-6">
              <a className="flex items-center text-gray-50 hover:text-gray-200 cursor-pointer">
                <SiCodefactor className="text-xl" />
                <span className="ml-2 text-lg font-semibold">Posts</span>
                <IoMdArrowDropdown className="ml-1 text-xl" />
              </a>
              <ul className="absolute hidden text-gray-50 pt-2 bg-indigo-600 dark:bg-indigo-900 w-40 mt-1 rounded-xl">
                {topics.map((topic) => (
                  <Link href={`/topic/${topic}`} key={topic}>
                    <li className="cursor-pointer">
                      <a className="block px-4 py-2 hover:bg-indigo-700 rounded-xl">
                        {topic}
                      </a>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="flex items-center text-gray-50 hover:text-gray-200 mx-2"
              onClick={toggleTheme}
            >
              {isMounted && theme === "dark" ? (
                <HiSun className="text-2xl" />
              ) : (
                <HiMoon className="text-2xl" />
              )}
            </button>

            <Link href="/about">
              <a className="flex items-center text-gray-50 hover:text-gray-200 mx-4">
                <CgUserlane className="text-2xl" />
              </a>
            </Link>

            <button
              className="flex items-center text-gray-50 hover:text-gray-200 mx-2"
              onClick={isLogin ? handelSignOut : handelSignIn}
            >
              {isLogin ? (
                <>
                  <span className="hidden md:block text-sm font-medium">
                    Sign Out
                  </span>
                  <IoLogOutOutline className="text-2xl mx-1" />
                </>
              ) : (
                <>
                  <span className="hidden md:block text-sm font-medium">
                    Sign In
                  </span>
                  <AiOutlineGoogle className="text-2xl mx-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
