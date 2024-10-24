import { useEffect, useState } from 'react';

export default function Contact() {
  const [isWideScreen, setIsWideScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 550);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-4 mt-[40px] text-2xl font-medium">
        Mund të na gjeni:
      </h1>
      <div className="flex h-auto w-full flex-col justify-around sm:flex-row">
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2958.4426323879134!2d21.711128892755802!3d42.140813989077635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDA4JzI2LjkiTiAyMcKwNDInNDUuOCJF!5e0!3m2!1sen!2smk!4v1729804897463!5m2!1sen!2smk"
            width={isWideScreen ? '600' : '100%'} // Use 100% for smaller screens
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex w-full flex-col items-center">
          <h2 className="mb-4 mt-4 text-2xl font-medium">
            Të dhënat tona
          </h2>
          <div className="space-y-4">
            <p>Addresa: Kumanovë, Maqedoni e Veriut</p>
            <p>Numri: +389 70 848 844</p>
            <p>Email: enisraamadani@hotmail.com</p>
            <p>Orari: E hënë - E premte, 09:00 - 17:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
