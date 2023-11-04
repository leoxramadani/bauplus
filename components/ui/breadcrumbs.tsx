import routes from '@/lib/constants/routes';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, PropsWithChildren, useMemo } from 'react';
import Topbar from '../layout/Topbar';

const Crumb = ({
  children,
  href,
  last = false,
}: PropsWithChildren<any>) => {
  if (last)
    return (
      <a className="inline-flex px-1 py-0.5 text-base font-medium text-gray-600">
        {children}
      </a>
    );
  return (
    <Link
      className="inline-flex items-center rounded-lg px-1 py-0.5 text-base font-medium transition-all duration-75 hover:underline"
      href={href}
    >
      {children}
    </Link>
  );
};

const Breadcrumbs = () => {
  const router = useRouter();

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split('?')[0]; // Remove any query parts

      // Break down the path between "/"s, removing empty entities
      // Ex:"/finance/bank-accounts" --> ["finance", "bank-accounts"]
      const asPathNestedRoutes = asPathWithoutQuery
        .split('/')
        .filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href =
          '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
        const route = routes.find((r) => r.path === subpath) ?? {
          path: subpath,
          title: capitalize(subpath),
          icon: undefined,
          showForm: false,
        };

        return { ...route, href };
      });
      return crumblist;
    },
    [router.asPath]
  );

  return (
    <nav
      className="flex items-center justify-between"
      aria-label="Breadcrumb"
    >
      <div className="flex w-max whitespace-nowrap items-center">
        {breadcrumbs.map((crumb, i: Key) => {
          const isLast = i === breadcrumbs.length - 1;

          return (
            <>
              <Crumb {...crumb} last={isLast}>
                <div className="flex items-center gap-1">
                  {crumb?.icon && crumb.icon}
                  {crumb?.title}
                </div>
              </Crumb>
              {!isLast && <span className="mx-1">/</span>}
            </>
          );
        })}
      </div>
      <Topbar showForm={router.asPath === '/'} />
    </nav>
  );
};

export default Breadcrumbs;
