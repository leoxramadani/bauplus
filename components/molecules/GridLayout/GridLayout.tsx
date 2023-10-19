'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Responsive,
  WidthProvider,
  Layout,
  Layouts,
} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ResponsiveGridLayout = WidthProvider(Responsive);
import GridItem from './GridItem';
import GraphBlock from './GraphBlock';
import Image from 'next/image';
import PieChartImage from '@/public/PieChart.svg';
import DonutChartImage from '@/public/DonutChart.svg';
import BarChartImage from '@/public/BarChart.svg';
import AreaChartImage from '@/public/AreaChart.svg';
import LineChartImage from '@/public/LineChart.svg';
import {
  CheckCheck,
  MinusCircle,
  Pencil,
  PlusCircle,
} from 'lucide-react';

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

// const graph5: Layout = {
//   w: 6,
//   h: 3,
//   x: 0,
//   y: 0,
//   i: 'graph5',
// };

const graph6: Layout = {
  w: 6,
  h: 3,
  x: 0,
  y: 0,
  i: 'graph6',
};

const originalItems = [
  {
    title: 'Area Chart',
    image: AreaChartImage,
    description:
      'Shows data points with shaded regions, ideal for visualizing trends and cumulative effects over time.',
    name: 'b',
    key: 'graph1',
    data: chartdata,
    type: 'area',
    index: 'date',
    layout: graph1,
    x: 0,
  },
  {
    title: 'Pie Chart',
    image: PieChartImage,
    description:
      'A circular graph divided into slices to represent data proportions. Each slices size corresponds to its percentage.',
    name: 'a',
    key: 'graph2',
    data: piedata,
    type: 'pie',
    index: 'name',
    layout: graph2,
    x: 6,
  },
  {
    title: 'Line Chart',
    image: LineChartImage,
    description:
      'Connects data points with a line to illustrate trends and relationships between variables over time.',
    name: 'c',
    key: 'graph3',
    data: chartdataLine,
    type: 'line' as 'line',
    index: 'year',
    layout: graph3,
    x: 0,
  },
  {
    title: 'Bar Chart',
    image: BarChartImage,
    description:
      'A bar chart is a visual representation of data using bars, where the length of each bar corresponds to the data it represents.',
    name: 'd',
    key: 'graph4',
    data: chartdata,
    type: 'bar' as 'bar',
    index: 'name',
    layout: graph4,
    x: 6,
  },
  // {
  //   name: 'e',
  //   key: 'graph5',
  //   data: chartdataScatter,
  //   type: 'scatter' as 'scatter',
  //   index: 'name',
  //   layout: graph5,
  // },
  {
    title: 'Donut Chart',
    image: DonutChartImage,
    description:
      'A ring-shaped chart with a hole, similar to a pie chart. Ideal for displaying data composition.',
    name: 'f',
    key: 'graph6',
    data: piedata,
    type: 'donut' as 'donut',
    index: 'name',
    layout: graph6,
    x: 0,
  },
];

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [removedCharts, setRemovedCharts] = useState<any[]>([]);
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

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grid-layout', JSON.stringify(layouts));
    }
  };

  const toggleEditMode = () => {
    if (items.length > 0) {
      setisAdding(!isAdding);
    }
  };

  const onAddChart = (chartKey: string, x: number) => {
    if (typeof window !== 'undefined') {
      const newLayouts = { ...layouts };
      newLayouts[currentBreakpoint].push({
        x: x,
        y: 0,
        w: 6,
        h: 3,
        minW: 6,
        minH: 3,
        i: chartKey,
        static: false,
      });

      setRemovedCharts((prevRemovedCharts) =>
        prevRemovedCharts.filter((item) => item.key !== chartKey)
      );

      const newItems = [
        ...items,
        ...originalItems.filter((item) => item.key === chartKey),
      ];

      console.log('newItems', newItems);
      console.log('newItems length', newItems.length);

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

  const onRemoveItem = (keyToRemove: string) => {
    if (typeof window !== 'undefined') {
      setLayouts((prevLayouts: any) => {
        const updatedLayouts = { ...prevLayouts };
        updatedLayouts[currentBreakpoint] = updatedLayouts[
          currentBreakpoint
        ].filter((item: any) => item.i !== keyToRemove);
        return updatedLayouts;
      });

      setItems((prevItems: any) =>
        prevItems.filter((item: any) => item.key !== keyToRemove)
      );

      const removedChart = originalItems.find(
        (item) => item.key === keyToRemove
      );
      if (removedChart) {
        setRemovedCharts((prevRemovedCharts: any) => [
          ...prevRemovedCharts,
          removedChart,
        ]);
      }

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

  return (
    <div>
      {!isAdding && (
        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            className="flex gap-2 items-center w-fit"
            onClick={() => {
              setModalOpen(true);
              toggleEditMode();
            }}
          >
            <Pencil width={16} />
            Edit
          </Button>
        </div>
      )}

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
                  className="flex px-1.5 py-0 w-10 h-10 items-center justify-center"
                  onClick={() => onRemoveItem(layoutItem.i)}
                >
                  <MinusCircle width={18} />
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
        <div
          id="rightmodal"
          className="flex flex-col gap-4 z-50 h-screen w-[500px] fixed bg-white right-0 bottom-0 shadow-2xl overflow-y-auto overflow-x-hidden pt-5"
        >
          <Button
            variant="default"
            className="flex flex-row items-center gap-2 mx-4"
            onClick={() => {
              setModalOpen(false);
              toggleEditMode();
            }}
          >
            <CheckCheck width={16} /> Done Editing
          </Button>
          <div className="flex flex-col gap-4 w-fit px-4">
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
                <div
                  className="flex flex-row gap-4 border-2 px-2 py-3 rounded-md items-center hover:bg-slate-100"
                  key={item.key}
                >
                  <div className="flex flex-row w-24 h-20">
                    <Image
                      src={item.image}
                      alt={`ChartImage`}
                      width={96}
                      height={80}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                      <h1 className="text-lg text-slate-800 font-semibold flex-grow">
                        {item.title}
                      </h1>
                      <p className="text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        variant="default"
                        className="flex px-1.5 py-0 w-10 h-10 items-center justify-center"
                        onClick={() =>
                          onAddChart(item.key, item.x ? item.x : 0)
                        }
                      >
                        <PlusCircle width={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

            {removedCharts
              .sort((a, b) => a.key.localeCompare(b.key))
              .map((removedChart) => (
                <div
                  className="flex flex-row gap-4 border-2 p-2 rounded-md items-center"
                  key={removedChart.key}
                >
                  <div className="flex flex-row w-24 h-20">
                    <Image
                      src={removedChart.image}
                      alt={`ChartImage`}
                      width={96}
                      height={80}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                      <h1 className="text-lg text-slate-800 font-semibold flex-grow">
                        {removedChart.title}
                      </h1>
                      <Button
                        variant="default"
                        className="flex px-1.5 py-0 w-10 h-10 items-center justify-center"
                        onClick={() =>
                          onAddChart(
                            removedChart.key,
                            removedChart.x ? removedChart.x : 0
                          )
                        }
                      >
                        <PlusCircle width={18} />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600">
                      {removedChart.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;
