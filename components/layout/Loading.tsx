import loadingGIF from '@/public/video/BG.gif';
import Image from 'next/image';
const Loading = () => {
  return (
    <main className="fixed left-0 top-0 flex min-h-screen flex-col justify-center text-center">
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
