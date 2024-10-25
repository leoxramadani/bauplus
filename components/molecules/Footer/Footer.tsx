'use client';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-400 to-slate-100 py-8 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-lg font-semibold">Kontakti</h3>
            <div className="flex flex-row">
              <p className="text-blue-600">Adresa: </p>
              <p>Kumanovë, Maqedoni e Veriut</p>
            </div>
            <div className="flex flex-row">
              <p className="text-blue-600">Numri:</p>
              <p> +389 70 848 844</p>
            </div>
            <div className="flex flex-row">
              <p className="text-blue-600">Email: </p>
              <p>enisraamadani@hotmail.com</p>
            </div>
          </div>
          <div className="flex h-auto w-full flex-col items-center justify-center">
            <h3 className="mb-4 text-lg font-semibold">
              Tjerat faqe
            </h3>
            <ul>
              <li>
                <Link
                  href="/Skele"
                  className="text-blue-600 hover:text-red-600"
                >
                  Skele
                </Link>
              </li>
              <li>
                <Link
                  href="/Izolime"
                  className="text-blue-600 hover:text-red-600"
                >
                  Izolime
                </Link>
              </li>
              <li>
                <Link
                  href="/Dekorime"
                  className="text-blue-600 hover:text-red-600"
                >
                  Dekorime
                </Link>
              </li>

              <li>
                <Link
                  href="/Contact"
                  className="text-blue-600 hover:text-red-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex h-auto w-full flex-row items-center justify-center sm:flex-col">
            <h3 className=" text-center text-lg font-semibold">
              Na ndiqni në
            </h3>
            <div className="flex justify-center space-x-4 text-blue-600 hover:text-red-600">
              <a href="https://www.facebook.com/baupluss">
                {' '}
                <FacebookIcon /> BAUplus
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} BAUplus All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
