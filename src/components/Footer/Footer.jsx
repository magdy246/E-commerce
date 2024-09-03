import React from "react";
import cartImg from "../../assets/Cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebookF,
  faGithub,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <div className="sm:ml-64">
        <footer className="bg-[#C6DEC6]">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex lg:flex-row flex-col items-center">
                  <img
                    src={cartImg}
                    className="h-8 me-3 rounded-lg"
                    alt="Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap font-[Oswald-V] text-[#020402]">
                    FreshCart
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 p-3">
                <div>
                  <h2 className="mb-6 text-sm font-bold uppercase text-[#3C433B]">
                    Resources
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://flowbite.com/"
                        className="hover:underline"
                      >
                        Flowbite
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline"
                      >
                        Tailwind CSS
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-bold uppercase text-[#3C433B]">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline "
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        className="hover:underline"
                      >
                        Discord
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-bold uppercase text-[#3C433B]">
                    Legal
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm font-[Roboto-Regular] text-[#647A67] sm:text-center">
                © 2024{" "}
                <a
                  href="https://magdy246.github.io/magdy.abo.el-nour/"
                  className="hover:underline"
                >
                  magdyaboelnour™
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:scale-125 transition-all duration-500 dark:hover:text-[#647A67]"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faFacebookF} />
                  <span className="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:scale-125 transition-all duration-500 dark:hover:text-[#647A67] ms-5"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faDiscord} />
                  <span className="sr-only">Discord community</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:scale-125 transition-all duration-500 dark:hover:text-[#647A67] ms-5"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faXTwitter} />
                  <span className="sr-only">Twitter page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:scale-125 transition-all duration-500 dark:hover:text-[#647A67] ms-5"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faGithub} />
                  <span className="sr-only">GitHub account</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:scale-125 transition-all duration-500 dark:hover:text-[#647A67] ms-5"
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faInstagram} />
                  <span className="sr-only">Dribbble account</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
