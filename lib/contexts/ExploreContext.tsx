import { createContext, useContext, useState } from 'react';

interface ExploreContextType {
  isExploreClicked: boolean;
  setExploreClicked: (clicked: boolean) => void;
}

const ExploreContext = createContext<ExploreContextType | undefined>(
  undefined
);

export const ExploreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isExploreClicked, setIsExploreClicked] = useState(false);

  return (
    <ExploreContext.Provider
      value={{
        isExploreClicked,
        setExploreClicked: setIsExploreClicked,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export const useExplore = () => {
  const context = useContext(ExploreContext);
  if (!context)
    throw new Error(
      'useExplore must be used within an ExploreProvider'
    );
  return context;
};
