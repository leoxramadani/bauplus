import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      setOpen(true);
    }
    console.log('router==', router);
  }, [router.query.id]);

  const removeIdFromQuery = () => {
    const { id, ...queryWithoutId } = router.query;
    router.replace(
      { pathname: router.pathname, query: queryWithoutId },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!open) {
      removeIdFromQuery();
    }
  }, [open]);

  return {
    open,
    setOpen,
  };
};

export default useModal;
