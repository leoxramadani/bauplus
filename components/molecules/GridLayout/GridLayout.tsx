"use client"
import { Card, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import GraphBlock from './GraphBlock';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  data: string[];
  layouts: { [key: string]: Layout[] };
  setBreakPoint: (breakpoint: string) => void;
}

const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];


const GridLayout: React.FC<GridLayoutProps> = ({ data, layouts, setBreakPoint }) => {
  const [breakpoint, setBreakpoint] = useState<string>("lg"); // Set a default breakpoint

  const handleBreakPointChange = (newBreakpoint: string) => {
    setBreakpoint(newBreakpoint);
    setBreakPoint(newBreakpoint); // Notify the parent component of the breakpoint change
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    layouts[breakpoint] = newLayout;
    // You can optionally store the layouts in state or dispatch an action here
  };

  useEffect(() => {
    handleBreakPointChange(breakpoint);
  }, [breakpoint]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoint={breakpoint} // Pass the current breakpoint
      onBreakpointChange={handleBreakPointChange}
      onLayoutChange={handleLayoutChange}
      breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      autoSize={true}
    >
          <Card key="graph1" className=''>
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        <Card key="graph2" className=''>
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        
 
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
