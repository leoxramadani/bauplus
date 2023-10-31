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
      <a className="text-base font-medium inline-flex py-0.5 px-1">{children}</a>
    );
  return (
    <Link
      className="inline-flex items-center rounded-lg px-1 py-0.5 text-base font-medium text-gray-700 transition-all duration-75 hover:underline"
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

      if (asPathNestedRoutes.length === 0) {
        const homeRoute = routes.find((r) => r.path === '') ?? {
          path: '',
          title: capitalize('Main'),
          icon: undefined,
        };

        if (homeRoute) {
          return [
            {
              href: '/',
              title: homeRoute.title,
              icon: homeRoute.icon,
            },
          ];
        }
      }

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href =
          '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
        const route = routes.find((r) => r.path === subpath) ?? {
          path: subpath,
          title: capitalize(subpath),
          icon: undefined,
        };

        return { ...route, href };
      });
      return crumblist;
    },
    [router.asPath]
  );

  return (
    <nav className="flex w-full" aria-label="Breadcrumb">
      <div className="inline-flex w-full items-center space-x-1 md:space-x-3">
        <div className="inline-flex w-full items-center justify-start">
          {breadcrumbs.map((crumb, i: Key) => {
            const isLast = i === breadcrumbs.length - 1;

            return (
              <>
                {crumb.href === '/' ? (
                  <Topbar showForm={true} />
                ) : (
                  <>
                    <Crumb {...crumb} key={i} last={isLast}>
                      <div className="flex items-center gap-1">
                        {crumb?.icon && crumb.icon}
                        {crumb?.title}
                      </div>
                    </Crumb>
                    {!isLast && <span className="mx-1">/</span>}
                  </>
                )}
              </>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
