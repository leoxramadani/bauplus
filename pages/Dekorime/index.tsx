'use client';

function Dekorime() {
  const images = [
    '/dekorime1.jpg',
    '/dekorime2.jpg',
    '/dekorime3.jpg',
    '/dekorime4.jpg',
    '/dekorime5.jpg',
    '/dekorime6.jpg',
    '/dekorime7.jpg',
    '/dekorime8.jpg',
    '/dekorime9.jpg',
    '/dekorime10.jpg',
    '/dekorime11.jpg',
    '/dekorime12.jpg',
    '/dekorime13.jpg',
    '/dekorime14.jpg',
  ];
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="mt-[60px] h-auto w-full pl-4 text-center text-3xl">
        <h3>Dekorime</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dekorime;
