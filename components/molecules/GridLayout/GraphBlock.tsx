import React, { ReactElement } from "react";
import {
  DonutChart,
  LineChart,
  BarChart,
  AreaChart,
  Color,
} from "@tremor/react";
import { dataFormatter } from "@/lib/helper/helperFunctions";


interface GraphBlockProps {
  type: "pie" | "line" | "bar" | "area";
  data: any;
  colors?: Color[];
  className?: string;
  index: string;
 
}

const GraphBlock: React.FC<GraphBlockProps> = ({
  type,
  data,
  colors,
  index
 
}) => {
  const renderGraphComponent = () => {
    const categories = Object.keys(data[0]).filter(key => !['year', 'date', 'time'].includes(key));
    switch (type) {
      case "pie":
        return (
          <DonutChart
            className="mt-6"
            data={data}
            index={index}
            category="sales"
            valueFormatter={dataFormatter}
            colors={colors}
          />
        );
      case "line":
        return (
          <LineChart
            className="mt-6"
            data={data}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
          />
        );
      case "bar":
        return (
          <BarChart
            className="mt-6"
            data={data}
            index="name"
            categories={categories}
            colors={colors}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />
        );
      case "area":
        return (
          <AreaChart
            className="h-72 mt-4"
            data={data}
            index="date"
            categories={categories}
            colors={colors}
            valueFormatter={dataFormatter}
          />
        );
      default:
        return null;
    }
  };

  const graphComponent = renderGraphComponent();

  if (!graphComponent) {
    return null;
  }

  return (
      <>{graphComponent}</>
  );
};

export default GraphBlock;
