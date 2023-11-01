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
      <a className="mx-1 my-1 text-base font-medium">{children}</a>
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

      //check if it's the home route
      if (asPathNestedRoutes.length === 0) {
        const homeRoute = routes.find((r) => r.path === '') ?? {
          path: '',
          title: capitalize('Main'),
          icon: undefined,
          showForm: true,
        };

        if (homeRoute) {
          return [
            {
              href: '/',
              title: homeRoute.title,
              icon: homeRoute.icon,
              showForm: homeRoute.showForm,
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
          showForm: false,
        };

        return { ...route, href };
      });
      // Add in a default "Home" crumb for the top-level
      return [...crumblist];
    },
    [router.asPath]
  );

  return (
    <nav className="flex w-full items-center" aria-label="Breadcrumb">
      {breadcrumbs[0].href == '/' ? (
        <Topbar showForm={true} />
      ) : (
        <div className="flex w-full">
          <div className="flex flex-grow">
            {breadcrumbs.map((crumb, i: Key) => {
              console.log('breadcrumbs->', breadcrumbs);

              const isLast = i === breadcrumbs.length - 1;
              return (
                <div className="flex items-center" key={i}>
                  <div className="flex">
                    <Crumb {...crumb} last={isLast}>
                      <div className="flex items-center gap-1">
                        {crumb?.icon && crumb.icon}
                        {crumb?.title}
                      </div>
                    </Crumb>

                    {!isLast && <span className="mx-1">/</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-none">
            <Topbar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Breadcrumbs;
