import routes from '@/lib/constants/routes';
import { capitalize, divide } from 'lodash';
import { ChevronRight, Slash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useMemo } from 'react';

const Crumb = ({
  children,
  href,
  last = false,
}: PropsWithChildren<any>) => {
  if (last)
    return (
      <a className="text-sm font-medium mx-1 my-1">{children}</a>
    );
  return (
    <Link
      className="transition-all duration-75 inline-flex items-center text-sm font-medium text-gray-700 hover:underline rounded-lg py-0.5 px-1"
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
        };

        return { ...route, href };
      });
      // Add in a default "Home" crumb for the top-level
      return [...crumblist];
    },
    [router.asPath]
  );

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;

            return (
              <>
                <Crumb {...crumb} key={i} last={isLast}>
                  <div className="flex gap-1 items-center">
                    {crumb?.icon && crumb.icon}
                    {crumb?.title}
                  </div>
                </Crumb>
                {!isLast && <span className="mx-1">/</span>}
              </>
            );
          })}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
