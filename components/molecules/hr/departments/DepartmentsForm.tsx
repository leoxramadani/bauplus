import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CREATE_DEPARTMENT, GET_SPECIFIC_DEPARTMENT, UPDATE_DEPARTMENT } from "@/lib/constants/endpoints/department";
import { DepartmentSchema, DepartmentType } from "@/lib/schema/Finance/departments";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {  useForm } from "react-hook-form";

interface DepartmentsFormProps{
  setIsModalOpen:any,
  departmentId?:string
}

const DepartmentsForm = ({setIsModalOpen,departmentId}:DepartmentsFormProps) => {
  const router = useRouter();
  const [departmentData, setDepartmentData] = useState<any>();


  useEffect(() => {
    async function getData(Id: string) {
      await axios
        .get(GET_SPECIFIC_DEPARTMENT + `?Id=${Id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setDepartmentData(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (departmentId) {
      getData(departmentId);
    }
  }, [departmentId]);



  const form = useForm<DepartmentType>({
    resolver: zodResolver(DepartmentSchema),
    values: { ...departmentData },
  });

  const onSubmit = useCallback(async (data: DepartmentType)=>{
    console.log("form data ->",data);

    if (departmentData) {
      await axios
          .put(UPDATE_DEPARTMENT, {
            departmentName: data.departmentName,
            companyId: data.companyId,
            departmentId: data.departmentId,
            parentDepartmentId:data.parentDepartmentId,
          })
          .then((res) => {
            console.log('UPDATED employee->', res);
            router.replace('/hr/departments', undefined, {
              shallow: true,
            });
          })
          .catch((error) => {
            console.log('Error UPDATING employee:', error);
          });
    }else{
      await axios
          .post(CREATE_DEPARTMENT, { 
            departmentName: data.departmentName,
            companyId: data.companyId,
            // departmentId: data.departmentId,
            // parentDepartmentId:data.parentDepartmentId,
           })
          .then((res) => {
            console.log('Successfully created employee->', res);
          })
          .catch((error) => {
            console.log('Error creating employee:', error);
          });
    }
    setIsModalOpen(false);

  },[departmentData])

  const onError = (error:any)=>{
    console.log("Please check your input fields!",error);
  }


  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Departments
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
          Add a department
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4 w-full"
        >
          {/* <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4"> */}
            {/* <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                    Department Id<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="relative">
                      <Input placeholder="Department Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            
          {/* </div> */}
          <FormField
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                    Department Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="relative">
                      <Input placeholder="Department Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

          <div className="grid grid-cols-1 sm:grid-cols-2  justify-center items-center gap-4">
          <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Id<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="relative">
                      <Input placeholder="Company Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          
            <FormField
                control={form.control}
                name="parentDepartmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Parent Department Id<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="relative">
                      {/* 
// @ts-ignore */}
                      <Input placeholder="Parent Department Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <hr />
          <Button
            className="w-max flex flex-none"
            variant="outline"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form> 
    </div>
  )
};

export default DepartmentsForm;
