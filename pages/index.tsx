"use client";
import Head from 'next/head';
import { Card, Title } from '@tremor/react';
import GraphBlock from '@/components/molecules/GridLayout/GraphBlock';
import GridLayout from '@/components/molecules/GridLayout/GridLayout';
import layoutConfig from '@/lib/helper/layoutConfig';
import React, {useState} from 'react'
import { randomUUID } from 'crypto';
import Duration from '@/components/atoms/Duration';


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


export default function Home() {
  const [breakpoint, setBreakpoint] = useState<string>("");

  return (
    <>
      <Head>
        <title>Arkiva</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-full md:ml-[250px] flex flex-col gap-4">
        <h2 className='w-full bg-blue-200'>hello</h2>
      
        <div className='w-full flex flex-col md:grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center '>
        <Card key="graph1" className=' max-w-sm w-full'>
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        <Card key="graph2" className='w-full max-w-sm'>
          <Duration />
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        <Card key="graph2" className='w-full max-w-sm'>
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        <Card key="graph2" className='w-full max-w-sm'>
          <Title>Sales</Title>
          <GraphBlock type='pie' data={cities} colors={["rose","blue"]} index='name' /> 
        </Card>
        </div>

        <div className='h-max p-8 border w-full'>
        <GridLayout data={["1", "2", "3"]} layouts={layoutConfig}  setBreakPoint={setBreakpoint} />
        </div>
      </main>
    </>
  );
}