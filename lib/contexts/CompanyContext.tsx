import { ICompany } from 'next-auth';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

export type CompanyContext = [
  company: ICompany,
  setCompany: Dispatch<SetStateAction<ICompany>>,
];

const init = {
  companyId: undefined,
  companyName: undefined,
  logo: undefined,
  privileges: [],
};

export const CompanyContext = createContext<CompanyContext>([
  init,
  () => init,
]);

export const CompanyContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [company, setCompany] = useState<ICompany>(init);
  useEffect(() => {
    const value = localStorage.getItem('company');
    const currentCompany = !value ? JSON.parse(value!) : init;
    setCompany(currentCompany);
  }, []);
  return (
    <CompanyContext.Provider value={[company, setCompany]}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContextProvider;
