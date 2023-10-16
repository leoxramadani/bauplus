'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Responsive,
  WidthProvider,
  Layout,
  ReactGridLayoutProps,
  Layouts,
} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Title } from '@tremor/react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import _ from 'lodash';
import KpiCard from '@/components/atoms/KpiCard';
import GridItem from './GridItem';
import GraphBlock from './GraphBlock';

interface GridLayoutProps {
  data: string[];
  // layouts: { [key: string]: Layout[] };
}

const piedata = [
  {
    name: 'Savings',
    sales: 9800,
  },
  {
    name: 'Checking',
    sales: 4567,
  },
  {
    name: 'IRA',
    sales: 3908,
  },
  {
    name: 'Certificates',
    sales: 2400,
  },
  {
    name: 'Loans',
    sales: 1908,
  },
  {
    name: 'LOCs/CCs',
    sales: 1898,
  },
];

const chartdataScatter = [
  {
    Country: 'Brazil',
    Life_expectancy: 74.2,
    GDP: 10345.6789,
    Population: 212559417,
  },
  {
    Country: 'Canada',
    Life_expectancy: 82.2,
    GDP: 52436.987,
    Population: 37742154,
  },
  {
    Country: 'China',
    Life_expectancy: 76.9,
    GDP: 14342.5678,
    Population: 1403500365,
  },
  {
    Country: 'Egypt',
    Life_expectancy: 71.4,
    GDP: 4220.8765,
    Population: 104258327,
  },
  {
    Country: 'France',
    Life_expectancy: 83.3,
    GDP: 43563.219,
    Population: 67564287,
  },
  {
    Country: 'Germany',
    Life_expectancy: 80.9,
    GDP: 52989.123,
    Population: 83149300,
  },
  {
    Country: 'Italy',
    Life_expectancy: 82.3,
    GDP: 39480.654,
    Population: 60359546,
  },
  {
    Country: 'Japan',
    Life_expectancy: 84.6,
    GDP: 40939.876,
    Population: 126476461,
  },
  {
    Country: 'Mexico',
    Life_expectancy: 75.1,
    GDP: 10511.234,
    Population: 126190788,
  },
  {
    Country: 'Nigeria',
    Life_expectancy: 54.3,
    GDP: 1969.345,
    Population: 206139587,
  },
  {
    Country: 'Russia',
    Life_expectancy: 71.3,
    GDP: 11200.789,
    Population: 145912025,
  },
  {
    Country: 'South Africa',
    Life_expectancy: 63.2,
    GDP: 6541.987,
    Population: 59436725,
  },
  {
    Country: 'United Kingdom',
    Life_expectancy: 80.9,
    GDP: 42323.456,
    Population: 68207116,
  },
  {
    Country: 'United States',
    Life_expectancy: 77.3,
    GDP: 62545.789,
    Population: 331002651,
  },
  {
    Country: 'Australia',
    Life_expectancy: 83.1,
    GDP: 54798.234,
    Population: 25499884,
  },
  {
    Country: 'New Zealand',
    Life_expectancy: 82.0,
    GDP: 42789.654,
    Population: 4822233,
  },
  {
    Country: 'Singapore',
    Life_expectancy: 84.8,
    GDP: 64579.234,
    Population: 5850342,
  },
];

const chartdataLine = [
  {
    year: 1970,
    Income: 2.04,
    Expense: 1.53,
  },
  {
    year: 1971,
    Income: 1.96,
    Expense: 1.58,
  },
  {
    year: 1972,
    Income: 1.96,
    Expense: 1.51,
  },
  {
    year: 1973,
    Income: 1.93,
    Expense: 1.21,
  },
  {
    year: 1974,
    Income: 1.88,
    Expense: 0.97,
  },
];

const chartdata = [
  {
    date: 'Jan 22',
    Rise: 3869,
    Fall: 2366,
    Base: 6235,
  },
  {
    date: 'Feb 22',
    Rise: 4983,
    Fall: 1252,
    Base: 6235,
  },
  {
    date: 'Mar 22',
    Rise: 1547,
    Fall: 3688,
    Base: 6235,
  },
  {
    date: 'Apr 22',
    Rise: 1205,
    Fall: 4430,
    Base: 6235,
  },
  {
    date: 'May 22',
    Rise: 8475,
    Fall: 1812,
    Base: 6235,
  },
  {
    date: 'Jun 22',
    Rise: 9506,
    Fall: 726,
    Base: 6235,
  },
];

const graph1: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph1',
  isResizable: false,
};

const graph2: Layout = {
  w: 3,
  h: 3,
  x: 7,
  y: 2,
  i: 'graph2',
  minW: 3,
  maxW: 4,
  minH: 2,
  maxH: 3,
};

const graph3: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph3',
};

const graph4: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph4',
};

const graph5: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph5',
};

const graph6: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph6',
};

const originalItems = [
  {
    name: 'b',
    key: 'graph1',
    data: chartdata,
    type: 'area',
    index: 'date',
    layout: graph1,
  },
  {
    name: 'a',
    key: 'graph2',
    data: piedata,
    type: 'pie',
    index: 'name',
    layout: graph2,
  },
  {
    name: 'c',
    key: 'graph3',
    data: chartdataLine,
    type: 'line' as 'line',
    index: 'year',
    layout: graph3, // Define graph3 layout
  },
  {
    name: 'd',
    key: 'graph4',
    data: chartdata, // Replace with the data for your BarChart
    type: 'bar' as 'bar',
    index: 'name',
    layout: graph4, // Define graph4 layout
  },
  {
    name: 'e',
    key: 'graph5',
    data: chartdataScatter,
    type: 'scatter' as 'scatter',
    index: 'name',
    layout: graph5,
  },
  {
    name: 'f',
    key: 'graph6',
    data: piedata,
    type: 'donut' as 'donut',
    index: 'name',
    layout: graph6,
  },
];

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const [isAdding, setisAdding] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<string>('lg');
  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLayouts = localStorage.getItem('grid-layout');
      if (savedLayouts) {
        return JSON.parse(savedLayouts);
      }
    }
    return {
      lg: [],
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLayouts = localStorage.getItem('grid-layout');
      if (savedLayouts) {
        setLayouts(JSON.parse(savedLayouts));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grid-layout', JSON.stringify(layouts));
    }
  }, [layouts]);

  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: [],
  });

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grid-layout', JSON.stringify(layouts));
    }
  };

  const onRemoveItem = (keyToRemove: string) => {
    if (typeof window !== 'undefined') {
      setLayouts((prevLayouts: any) => {
        const updatedLayouts = { ...prevLayouts };
        updatedLayouts[currentBreakpoint] = updatedLayouts[
          currentBreakpoint
        ].filter((item: any) => item.i !== keyToRemove);
        return updatedLayouts;
      });

      setItems((prevItems) =>
        prevItems.filter((item) => item.key !== keyToRemove)
      );

      const updatedLayoutsToSave = {
        ...layouts,
        [currentBreakpoint]: layouts[currentBreakpoint],
      };
      localStorage.setItem(
        'grid-layout',
        JSON.stringify(updatedLayoutsToSave)
      );
      localStorage.setItem('grid-items', JSON.stringify(items));
    }
  };

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]:
        toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  const toggleEditMode = () => {
    if (items.length > 0) {
      setisAdding(!isAdding);
    }
  };

  const onAddChart = (chartKey: string) => {
    if (typeof window !== 'undefined') {
      const newLayouts = { ...layouts };
      newLayouts[currentBreakpoint].push({
        x: 0,
        y: 0,
        w: 6,
        h: 3,
        minW: 6,
        minH: 3,
        i: chartKey,
        static: false,
      });
      const newItems = [
        ...items,
        ...originalItems.filter((item) => item.key === chartKey),
      ];

      setLayouts(newLayouts);
      setItems(newItems);

      const newLayoutsToSave = {
        ...layouts,
        [currentBreakpoint]: newLayouts[currentBreakpoint],
      };
      localStorage.setItem(
        'grid-layout',
        JSON.stringify(newLayoutsToSave)
      );
      localStorage.setItem('grid-items', JSON.stringify(newItems));
    }
  };

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts });
    console.log('test layout');
  };

  const generateDOM = () => {
    return items.map((item) => (
      <div key={item.key}>
        <GridItem>
          <GraphBlock
            data={item.data}
            type={
              item?.type as
                | 'area'
                | 'pie'
                | 'line'
                | 'bar'
                | 'scatter'
                | 'donut'
            }
            index={item.index}
          />
        </GridItem>
      </div>
    ));
  };

  return (
    <div>
      <Button
        variant="default"
        className="flex gap-2"
        onClick={toggleEditMode}
      >
        {items.length > 0 ? (isAdding ? 'Done' : 'Edit') : 'Add'}
      </Button>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        // autoSize={true}
        allowOverlap={false}
      >
        {layouts[currentBreakpoint].map((layoutItem: any) => {
          const item = items.find((i) => i.key === layoutItem.i);
          return (
            <GridItem
              key={layoutItem.i}
              data-grid={layoutItem}
              className=""
            >
              {isAdding && (
                <Button
                  variant="destructive"
                  className="flex gap-2"
                  onClick={() => onRemoveItem(layoutItem.i)}
                >
                  Remove
                </Button>
              )}
              <GraphBlock
                data={item?.data}
                type={
                  item?.type as
                    | 'area'
                    | 'pie'
                    | 'line'
                    | 'bar'
                    | 'scatter'
                    | 'donut'
                }
                index={item?.index || ''}
              />
            </GridItem>
          );
        })}
      </ResponsiveGridLayout>
      {isAdding && (
        <div className="flex flex-col gap-4 w-fit">
          <h2 className="font-semibold text-xl">
            Add Charts in your dashboard
          </h2>
          {items
            .filter((item) => {
              return layouts[currentBreakpoint].every(
                (layoutItem: any) => layoutItem.i !== item.key
              );
            })
            .map((item) => (
              <div className="flex flex-col gap-4" key={item.key}>
                <Button
                  variant="default"
                  className="flex gap-2"
                  onClick={() => onAddChart(item.key)}
                >
                  Add {item.key}
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GridLayout;
