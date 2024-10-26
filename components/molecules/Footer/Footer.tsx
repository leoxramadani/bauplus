'use client';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-400 to-slate-100 py-8 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 text-center font-serif">
          <p className="font-serif">
            &copy; {new Date().getFullYear()} BAUplus All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
