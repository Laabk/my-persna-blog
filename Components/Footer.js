import { SiTwitter, SiGithub, SiInstagram } from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";
import { AiFillMail } from "react-icons/ai";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="absolute w-full -bottom-0">
      <div className="bg-indigo-600 dark:bg-indigo-900">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-50 text-sm text-center sm:text-left">
            © {year} The Bloggers Blog —
            <a
              href="https://x.com/LaabkD"
              rel="noopener noreferrer"
              className="text-gray-50 ml-1"
              target="_blank"
            >
              @LaabkD
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              className="text-gray-50"
              href="https://x.com/LaabkD"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiTwitter />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://github.com/Laabk"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiGithub />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://web.facebook.com/laab.david.9/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiInstagram />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://www.linkedin.com/in/laab-garia-david/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiLinkedin />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="mailto:laabkdavid@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AiFillMail />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
