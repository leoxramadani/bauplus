export default function Izolime() {
  const images = [
    '/izolime1.jpg',
    '/Izolime2.jpg',
    '/Izolime3.jpg',
    '/Izolime4.jpg',
    '/Izolime5.jpg',
    '/Izolime6.jpg',
    '/Izolime7.jpg',
    '/Izolime8.jpg',
    '/Izolime9.jpg',
    '/izolime10.jpg',
    '/Izolime11.jpg',
    '/Izolime12.jpg',
    '/Izolime13.jpg',
    '/Izolime14.jpg',
  ];
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="mt-[70px] h-auto w-full pl-4 text-center font-serif text-[22px] text-slate-600">
        <h3>Izolime</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg ">
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
