import loadingGIF from '@/public/video/BG_4.gif';
import Image from 'next/image';
const Loading = () => {
  return (
    <main className="fixed left-0 top-0 flex h-full w-full flex-col justify-center bg-[#F5F7FA] text-center">
      <Image
        src={loadingGIF}
        layout={'responsive'}
        height={1}
        width={1}
        alt={`Loading`}
        unoptimized={true}
      />
    </main>
  );
};

export default Loading;
