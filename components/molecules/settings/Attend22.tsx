import { GET_ATTENDANCE_BY_BRANCH } from '@/lib/constants/endpoints/hr/attendance';
import {
  IAttendanceOptionsSchema,
  objMappingAttendance,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

interface OutputObject {
  databaseColumnName: string;
  systemColumnName: string;
  branchId: string;
}

type attendaceCols = {
  templateAttendanceMappingId: string;
  systemColumnName: string;
  databaseColumnName: string;
  branchId: string;
};

const Attend22 = () => {
  //   const [attendanceColumns, setAttendanceColumns] =
  //     useState<attendaceCols[]>();
  //   // const {
  //   //   data,
  //   //   isLoading,
  //   //   isError,
  //   //   refetch: refetchAttendance,
  //   // } = useData<any>(
  //   //   ['attendance'],
  //   //   GET_ATTENDANCE_BY_BRANCH +
  //   //     `?branchId=${'479a3b1a-51a8-46ab-9624-09f127ba5397'}`
  //   // );

  //   useEffect(() => {
  //     async function getData(Id: string) {
  //       console.log('inside getData');
  //       await axios
  //         .get(GET_ATTENDANCE_BY_BRANCH + `?branchId=${Id}`)
  //         .then((res) => {
  //           console.log('fetching mapping options -->', res.data);
  //           setAttendanceColumns(res.data);
  //         })
  //         .catch((error) => {
  //           console.log('error fetching mapping options->', error);
  //         });
  //     }
  //     // 1b6c79ae-1272-42f4-a2ba-63406cc84763
  //     // 479a3b1a-51a8-46ab-9624-09f127ba5397
  //     getData('479a3b1a-51a8-46ab-9624-09f127ba5397');
  //   }, []);

  //   const form = useForm<IAttendanceOptionsSchema>({
  //     resolver: zodResolver(attendanceOptionsSchema),
  //     //@ts-expect-error
  //     values: attendanceColumns &&
  //       attendanceColumns?.length > 0 && {
  //         employeeId: attendanceColumns?.filter(
  //           (item: attendaceCols) =>
  //             item.databaseColumnName === 'employeeId'
  //         )[0].systemColumnName,
  //         checkType: attendanceColumns?.filter(
  //           (item: attendaceCols) =>
  //             item.databaseColumnName === 'checkType'
  //         )[0].systemColumnName,
  //         checkTime: attendanceColumns?.filter(
  //           (item: attendaceCols) =>
  //             item.databaseColumnName === 'checkTime'
  //         )[0].systemColumnName,
  //         dataSource: attendanceColumns?.filter(
  //           (item: attendaceCols) =>
  //             item.databaseColumnName === 'dataSource'
  //         )[0].systemColumnName,
  //         checkPoint: attendanceColumns?.filter(
  //           (item: attendaceCols) =>
  //             item.databaseColumnName === 'checkPoint'
  //         )[0].systemColumnName,
  //       },
  //   });

  //   const onSubmit = useCallback(
  //     async (data: IAttendanceOptionsSchema) => {
  //       console.log('submited data', data);
  //       const mappedColumns: OutputObject[] = Object.entries(data).map(
  //         ([key, value]) => {
  //           return {
  //             databaseColumnName: key,
  //             systemColumnName: value,
  //             branchId: '479a3b1a-51a8-46ab-9624-09f127ba5397',
  //           };
  //         }
  //       );

  //       console.log('mappedColumns=>', mappedColumns);

  //       await axios
  //         .post(CREATE_ATTENDANCE_MAPPING, mappedColumns)
  //         .then(() => toast.success('Successfully mapped columns'))
  //         .catch((error) => {
  //           toast.error('Error mapping columns');
  //           console.log('error mapping return ->', error);
  //         });
  //     },
  //     []
  //   );

  //   const onError = (error: any) => {
  //     console.log('Please check your input fields!', error);
  //   };

  //   return (
  //     <>
  //       <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
  //         <div className="flex flex-col">
  //           <h1 className="text-lg font-semibold">
  //             Attendance options
  //           </h1>
  //         </div>

  //         <div>
  //           <Form {...form}>
  //             <form
  //               className="flex w-full max-w-7xl flex-col justify-between gap-4"
  //               onSubmit={form.handleSubmit(onSubmit, onError)}
  //             >
  //               <div className="grid grid-cols-2 gap-5">
  //                 {/* employeeId */}
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="employeeId"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             employee id
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input
  //                             placeholder="employee id"
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>
  //                 {/* checkType */}
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="checkType"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             Check Type
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input
  //                             placeholder="Check Type"
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>

  //                 {/* checkTime */}
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="checkTime"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             Check Time
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input
  //                             placeholder="Check Time"
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>

  //                 {/* Data Source */}
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="dataSource"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             Data Source
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input
  //                             placeholder="Data source ..."
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>

  //                 {/* Work Type */}
  //                 {/* <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="workType"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             Work Type
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input placeholder="Work Type" {...field} />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div> */}
  //                 {/* checkPoint */}
  //                 <div className="grid grid-cols-2 gap-4">
  //                   <FormField
  //                     control={form.control}
  //                     name="checkPoint"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>
  //                           Write your{' '}
  //                           <span className="font-bold underline">
  //                             Check Point
  //                           </span>{' '}
  //                           column name here:
  //                         </FormLabel>
  //                         <FormControl className="relative">
  //                           <Input
  //                             placeholder="Check Point"
  //                             {...field}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 </div>

  //                 {/* note */}
  //                 {/* <div className="grid grid-cols-2 gap-4">
  //                     <FormField
  //                       control={form.control}
  //                       name="note"
  //                       render={({ field }) => (
  //                         <FormItem>
  //                           <FormLabel>
  //                             Write your{' '}
  //                             <span className="font-bold underline">
  //                               note
  //                             </span>{' '}
  //                             column name here:
  //                           </FormLabel>
  //                           <FormControl className="relative">
  //                             <Input placeholder="Note" {...field} />
  //                           </FormControl>
  //                           <FormMessage />
  //                         </FormItem>
  //                       )}
  //                     />
  //                   </div> */}
  //               </div>
  //               <div>
  //                 <Button className="flex flex-row items-center justify-center gap-1">
  //                   Save
  //                 </Button>
  //               </div>
  //             </form>
  //           </Form>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  const [attendanceColumns, setAttendanceColumns] =
    useState<attendaceCols[]>();

  useEffect(() => {
    async function getData(Id: string) {
      try {
        console.log('inside getData');
        const res = await axios.get(
          GET_ATTENDANCE_BY_BRANCH + `?branchId=${Id}`
        );
        console.log('fetching mapping options -->', res.data);
        setAttendanceColumns(res.data);
      } catch (error) {
        console.log('error fetching mapping options->', error);
      }
    }

    getData('479a3b1a-51a8-46ab-9624-09f127ba5397');
  }, []);

  const mapFields = (column: string) => {
    return attendanceColumns?.find(
      (item) => item.databaseColumnName === column
    )?.systemColumnName;
  };

  const form = useForm<any>({
    resolver: zodResolver(objMappingAttendance),
    // values: attendanceColumns &&
    //   attendanceColumns.length > 0 && {
    //     employeeId: mapFields('employeeId'),
    //     checkType: mapFields('checkType'),
    //     checkTime: mapFields('checkTime'),
    //     dataSource: mapFields('dataSource'),
    //     checkPoint: mapFields('checkPoint'),
    //   },
    values: attendanceColumns,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'mappings',
  });

  const onSubmit = (data: IAttendanceOptionsSchema) => {
    // Handle form submission (update or save mappings)
    console.log(data);
    // You may want to send this data to your server to update the mappings
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((mapping, index) => (
        <div key={mapping.id}>
          <input
            {...form.register(
              `mappings.${index}.templateAttendanceMappingId`
            )}
            defaultValue={
              attendanceColumns &&
              attendanceColumns[index].templateAttendanceMappingId
            }
          />
          <input
            {...form.register(`mappings.${index}.systemColumnName`)}
            defaultValue={
              attendanceColumns &&
              attendanceColumns[index].systemColumnName
            }
          />
          <input
            {...form.register(`mappings.${index}.databaseColumnName`)}
            defaultValue={
              attendanceColumns &&
              attendanceColumns[index].databaseColumnName
            }
          />
          <input
            {...form.register(`mappings.${index}.branchId`)}
            defaultValue={
              attendanceColumns && attendanceColumns[index].branchId
            }
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})}>
        Add Mapping
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Attend22;
