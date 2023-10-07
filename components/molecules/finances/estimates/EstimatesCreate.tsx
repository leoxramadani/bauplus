import React, { useCallback, useState } from "react";
import { estimatesSchema,estimatesType } from "@/lib/schema/Finance/estimates";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";



const EstimatesCreate = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control
  // }=useForm<estimatesType>({
  //   resolver:zodResolver(estimatesSchema)
  // })

  const form =useForm<estimatesType>({
    resolver:zodResolver(estimatesSchema)
  })

  
  const onSubmit = useCallback(async (data: estimatesType) => {
    console.log(data)
  },[])

  const onError = (error:any) => {
    console.log("Please check your input fields!->",error);
  };
  
  return (
    <>

    <div>Estimates Create</div>
    <Form {...form}>
    <form
     onSubmit={form.handleSubmit(onSubmit,onError)} 
     className="flex flex-col gap-4 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
      <FormField
        control={form.control}
        name="itemName"
        render={({ field }) => (
        <FormItem>
        <FormLabel>Item Name</FormLabel>
          <FormControl className="relative">
            <Input placeholder="Item Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
        <FormItem>
        <FormLabel>Currency</FormLabel>
          <FormControl className="relative">
            <Input placeholder="Currency" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      {/* exchangerate */}
    <FormField
      control={form.control}
      name="exchangeRate"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Exchange Rate</FormLabel>
        <FormControl className="relative">
          <Input type="number" placeholder="Exchange Rate" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    {/* Price */}
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Price</FormLabel>
        <FormControl className="relative">
          <Input type="number" placeholder="Price" {...field}  />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    {/* purchase date */}
    <FormField
      control={form.control}
      name="purchaseDate"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Purchase Date</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Purchase Date" {...field}/>
          {/* <Calendar
          mode="single"
          initialFocus
          {...field}
        /> */}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    {/* employee */}
    <FormField
      control={form.control}
      name="employee"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Employee</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Employee" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>

{/* project */}
    <FormField
      control={form.control}
      name="project"
      render={({ field }) => (
      <FormItem>
      <FormLabel>project</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Project" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>

    <FormField
      control={form.control}
      name="expenseCategory"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Expense Category</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Expense Category" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    {/* purchasedFrom */}
    <FormField
      control={form.control}
      name="purchasedFrom"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Purchased From</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Purchased From" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    {/* bank account */}
    <FormField
      control={form.control}
      name="bankAccount"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Bank Account</FormLabel>
        <FormControl className="relative">
          <Input placeholder="Bank Account" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
</div>
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
      <FormItem>
      <FormLabel>Description</FormLabel>
        <FormControl className="relative">
          <Textarea placeholder="Description" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}/>
    <Button className="w-max flex flex-none" variant='outline' type="submit">
      Submit
    </Button>
    </form>
    </Form>
    </>
  );
};

export default EstimatesCreate;
