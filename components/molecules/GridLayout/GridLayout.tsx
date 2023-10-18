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
import { Card, DonutChart, Title } from '@tremor/react';
const ResponsiveGridLayout = WidthProvider(Responsive);
import _ from 'lodash';
import KpiCard from '@/components/atoms/KpiCard';
import GridItem from './GridItem';
import GraphBlock from './GraphBlock';
import Modal from '@/components/atoms/Modal';
import RightModalNew from '@/components/atoms/RightModalNew';
import { dataFormatter } from '@/lib/helper/helperFunctions';
import Image from 'next/image';
import PieChartImage from '@/public/PieChart.svg';
import DonutChartImage from '@/public/DonutChart.svg';
import AreaChartImage from '@/public/AreaChart.svg';
import LineChartImage from '@/public/LineChart.svg';

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
  },
  {
    title: 'Area Chart',
    image: AreaChartImage,
    description:
      'Shows data points with shaded regions, ideal for visualizing trends and cumulative effects over time.',
    name: 'd',
    key: 'graph4',
    data: chartdata,
    type: 'bar' as 'bar',
    index: 'name',
    layout: graph4,
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
  },
];

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  const onRemoveChart = (chart: any) => {};
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
      {!isAdding && (
        <Button
          variant="default"
          className="flex gap-2"
          onClick={() => {
            setModalOpen(true);
            toggleEditMode();
          }}
        >
          {items.length > 0 ? (isAdding ? 'Done' : 'Edit') : 'Add'}
        </Button>
      )}
      <RightModalNew
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
      >
        <Button
          variant="default"
          className="flex flex-col gap-4 w-fit mx-4"
          onClick={() => {
            setModalOpen(false);
            toggleEditMode();
          }}
        >
          {items.length > 0
            ? isAdding
              ? 'Done Editing'
              : 'Edit'
            : 'Add'}
        </Button>
        {isAdding && (
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
                  className="flex flex-row gap-4 border-2 p-2 rounded-md items-center"
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
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                      <h1 className="text-lg text-slate-800 font-semibold flex-grow">
                        {item.title}
                      </h1>
                      {isAdding && (
                        <Button
                          variant="destructive"
                          className="flex-none"
                          onClick={() => onRemoveChart(item.key)}
                        >
                          Remove
                        </Button>
                      )}
                      <Button
                        variant="default"
                        className="flex gap-2"
                        onClick={() => onAddChart(item.key)}
                      >
                        Add {item.key}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </RightModalNew>

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
    </div>
  );
};

export default GridLayout;
