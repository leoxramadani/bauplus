import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_SPECIFIC_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from '@/lib/constants/endpoints/hr/departments';
import useData from '@/lib/hooks/useData';
import {
  DepartmentSchema,
  IDepartment,
} from '@/lib/schema/hr/departments/departments';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DepartmentsFormProps {
  setIsModalOpen: any;
  departmentId?: string;
  refetchDepartments: any;
}

const DepartmentsForm = ({
  setIsModalOpen,
  departmentId,
  refetchDepartments,
}: DepartmentsFormProps) => {
  const router = useRouter();
  const [departmentData, setDepartmentData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {
    data: parentDepartments,
    isLoading,
    isError,
  } = useData<IDepartment[]>(
    ['parentDepartments'],
    GET_ALL_DEPARTMENTS
  );

  useEffect(() => {
    async function getData(Id: string) {
      console.log('inside getData');
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

  const form = useForm<IDepartment>({
    resolver: zodResolver(DepartmentSchema),
    values: { ...departmentData },
  });

  const onSubmit = useCallback(
    async (data: IDepartment) => {
      setLoading(true);
      // console.log('form data ->', data);

      if (departmentData) {
        await axios
          .put(UPDATE_DEPARTMENT, {
            departmentId: departmentId,
            parentDepartmentId: data.parentDepartmentId,
            departmentName: data.departmentName,
            companyId: data.companyId,
            // ...data,
          })
          .then((res) => {
            console.log('update department->', res);
            router.replace('/hr/departments', undefined, {
              shallow: true,
            });
            refetchDepartments();
          })
          .catch((error) => {
            console.log('Error UPDATING department:', error);
          });
      } else {
        console.log('Creating department');
        await axios
          .post(CREATE_DEPARTMENT, {
            // departmentName: data.departmentName,
            // companyId: data.companyId,
            // // departmentId: data.departmentId,
            // parentDepartmentId: data.parentDepartmentId,
            ...data,
          })
          .then((res) => {
            console.log('Successfully created department->', res);
            refetchDepartments();
          })
          .catch((error) => {
            console.log('Error creating department:', error);
          });
      }
      setIsModalOpen(false);
      setLoading(false);
    },
    [departmentData]
  );

  const onError = (error: any) => {
    console.log('Please check your input fields!', error);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Department name */}
            <FormField
              control={form.control}
              name="departmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Department Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Company Id --Like this for now! */}
            {/* <FormField
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
            /> */}

            {/* Department Id */}
            <FormField
              control={form.control}
              name="parentDepartmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter department" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {parentDepartments ? (
                        <>
                          {parentDepartments.map((dep: any) => (
                            <SelectItem
                              key={dep.departmentId}
                              value={dep.departmentId}
                            >
                              {dep.departmentName}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="flex w-max flex-none "
            // variant="outline"
            loading={loading}
            disabled={loading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DepartmentsForm;
