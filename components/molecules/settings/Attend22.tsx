import {
  CREATE_ATTENDANCE_MAPPING,
  GET_ATTENDANCE_BY_BRANCH,
} from '@/lib/constants/endpoints/hr/attendance';
import useData from '@/lib/hooks/useData';
import {
  IobjMappingAttendance,
  objMappingAttendance,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Attend22 = () => {
  const {
    data: mappedColumnsData,
    isLoading,
    isError,
    refetch: refetchAttendance,
  } = useData<IobjMappingAttendance>(
    ['attendance'],
    GET_ATTENDANCE_BY_BRANCH +
      `?branchId=${'479a3b1a-51a8-46ab-9624-09f127ba5397'}`
  );

  const form = useForm<any>({
    resolver: zodResolver(objMappingAttendance),
    values: mappedColumnsData,
  });

  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace,
  } = useFieldArray({
    name: 'testArray',
    control: form.control,
  });

  const onSubmit = useCallback(
    async (data: IobjMappingAttendance) => {
      console.log('submited data', data);

      await axios
        .post(CREATE_ATTENDANCE_MAPPING, data)
        .then(() => toast.success('Successfully mapped columns'))
        .catch((error) => {
          toast.error('Error mapping columns');
          console.log('error mapping return ->', error);
        });
    },
    []
  );

  const onError = (error: any) => {
    console.log('Please check your input fields!', error);
  };

  console.log('mappedColumnsData->', mappedColumnsData);

  return;

  // return (
  //   <Form {...form}>
  //     <form
  //       className="flex w-full max-w-7xl flex-col justify-between gap-4"
  //       onSubmit={form.handleSubmit(onSubmit, onError)}
  //     >
  //       {form.fields.map((item, index) => {
  //         return (
  //           <li key={item.id}>
  //             <FormItem>
  //               <FormLabel>
  //                 Write your{' '}
  //                 <span className="font-bold underline">
  //                   Check Type
  //                 </span>{' '}
  //                 column name here:
  //               </FormLabel>
  //               <FormControl className="relative">
  //                 <Input placeholder="Check Type" {...item} />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //             {/*
  //             <Controller
  //               render={({ field }) => <input {...field} />}
  //               name={`test.${index}.lastName`}
  //               control={form.control}
  //             /> */}
  //             <button type="button" onClick={() => remove(index)}>
  //               Delete
  //             </button>
  //           </li>
  //         );
  //       })}
  //     </form>
  //   </Form>
  // );
};

export default Attend22;
