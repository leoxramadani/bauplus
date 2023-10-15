'use client';

import React, { useEffect, useState } from 'react';
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

const cities = [
  {
    name: 'New York',
    sales: 9800,
  },
  {
    name: 'London',
    sales: 4567,
  },
  {
    name: 'Hong Kong',
    sales: 3908,
  },
  {
    name: 'San Francisco',
    sales: 2400,
  },
  {
    name: 'Singapore',
    sales: 1908,
  },
  {
    name: 'Zurich',
    sales: 1398,
  },
];

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
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
    data: cities,
    type: 'pie',
    index: 'name',
    layout: graph2,
  },
  // Add more items as needed
];

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<string>('lg');
  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
    lg: _.map(_.range(0, 25), function (item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (_.random(0, 5) * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        static: Math.random() < 0.05,
      };
    }),
  });
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: [],
  });

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    localStorage.setItem('grid-layout', JSON.stringify(layouts));
  };

  const onRemoveItem = (keyToRemove: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.key !== keyToRemove)
    );
  };

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]:
        toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts });
    console.log('test layout');
  };

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <GridItem key={i}>
          <GraphBlock data={cities} type="pie" index="name" />
        </GridItem>
      );
    });
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={handleLayoutChange}
      breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      autoSize={true}
    >
      {generateDOM()}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
