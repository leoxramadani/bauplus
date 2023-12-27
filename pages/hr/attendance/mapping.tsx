import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  IMappingColumnsSchema,
  mappingColumnsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Mapping = () => {
  const router = useRouter();
  const columnsFromImportForm =
    JSON.parse(router.query.columnsData as string) || [];

  const form = useForm<IMappingColumnsSchema>({
    resolver: zodResolver(mappingColumnsSchema),
    defaultValues: {
      columns: columnsFromImportForm.map((column: string) => ({
        systemColumnName: column,
        databaseColumnName: '',
      })),
    },
  });

  const onSubmit = (data: IMappingColumnsSchema) => {
    const transformedData: any[] = [];
    console.log('Transformed Form Data:', data);
  };

  useEffect(() => {
    console.log('Columns received:', columnsFromImportForm);
  }, [columnsFromImportForm]);

  const attendanceOptions = [
    {
      SystemColumnName: 'person_id',
      DatabaseColumnName: 'checkTime',
    },
    {
      SystemColumnName: 'date',
      DatabaseColumnName: 'checkType',
    },
    {
      SystemColumnName: 'check-in',
      DatabaseColumnName: 'checkPoint',
    },
    {
      SystemColumnName: 'check-out',
      DatabaseColumnName: 'dataSource',
    },
    {
      SystemColumnName: 'note',
      DatabaseColumnName: 'employeeId',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Map fields</h1>
          <p className="">Select the excel fields</p>
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full max-w-7xl flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-4 lg:w-[600px]">
                <div className="gap-4">
                  <FormField
                    control={form.control}
                    name="columns"
                    render={({ field }) => {
                      return (
                        <div
                          className="grid w-full grid-cols-3 items-center justify-center gap-4"
                          style={{
                            gridTemplateColumns: '2fr 1fr 2fr',
                          }}
                        >
                          {field.value &&
                            field.value.map((item, i) => (
                              <React.Fragment key={i}>
                                <FormField
                                  control={form.control}
                                  name={`columns.${i}.systemColumnName`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl className="relative">
                                        <Input
                                          placeholder={
                                            columnsFromImportForm[
                                              i
                                            ] || ''
                                          }
                                          {...field}
                                          disabled
                                          className="disabled:text-black"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="flex justify-center">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 p-2">
                                    <MoveRight className="text-blue-400" />
                                  </div>
                                </div>

                                <FormField
                                  control={form.control}
                                  name={`columns.${i}.databaseColumnName`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue>
                                              {field.value ? (
                                                field.value
                                              ) : (
                                                <span className="text-gray-500">
                                                  Select field
                                                </span>
                                              )}
                                            </SelectValue>
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {attendanceOptions ? (
                                            <>
                                              {attendanceOptions.map(
                                                (x: any) => (
                                                  <SelectItem
                                                    key={
                                                      x.DatabaseColumnName
                                                    }
                                                    value={
                                                      x.DatabaseColumnName
                                                    }
                                                  >
                                                    {
                                                      x.DatabaseColumnName
                                                    }
                                                  </SelectItem>
                                                )
                                              )}
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
                              </React.Fragment>
                            ))}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              <div>
                <Button className="flex flex-row items-center justify-center gap-1">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Mapping;
