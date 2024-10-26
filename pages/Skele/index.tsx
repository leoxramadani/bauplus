'use client';

function Skele() {
  const images = [
    '/skele1.jpg',
    '/skele2.jpg',
    '/skele3.jpg',
    '/skele4.jpg',
    '/skele5.jpg',
    '/skele6.jpg',
    '/skele7.jpg',
  ];

  return (
    <div className="flex h-auto w-full flex-col">
      <div className="mt-[70px] h-auto w-full pl-4 text-center font-serif text-[22px] text-slate-600">
        <h3>Skele</h3>
      </div>
      <div className="mb-[100px] grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
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

export default Skele;
