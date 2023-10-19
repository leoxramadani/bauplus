import useTranslation from '@/lib/hooks/useTranslation';
import Link from 'next/link';

const GoBack = ({ href = '/' }: { href: string }) => {
  const { t } = useTranslation();
  return (
    <Link href={href} className="text-md flex no-underline">
      <div className="flex flex-col justify-center">
        <i className="fi fi-rr-arrow-small-left text-2xl"> </i>
      </div>
      &nbsp; {t('BackBtn')}
    </Link>
  );
};

export default GoBack;
