import { Button } from '@/components/ui/button';
import {
  IMappingColumnsSchema,
  mappingColumnsSchema,
} from '@/lib/schema/hr/attendance/attendanceOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Mapping = () => {
  const router = useRouter();

  let columnsFromImportForm: string[] = [];

  try {
    const columnsData = router.query.columnsData as
      | string
      | undefined;

    if (columnsData) {
      // Ensure 'columnsData' is a string before attempting to parse
      const parsedColumnsData = Array.isArray(columnsData)
        ? columnsData
        : [columnsData];
      columnsFromImportForm = JSON.parse(
        parsedColumnsData[0]
      ) as string[];
    }
  } catch (error) {
    console.error('Error parsing columnsData:', error);
    columnsFromImportForm = [];
  }

  const form = useForm<IMappingColumnsSchema>({
    resolver: zodResolver(mappingColumnsSchema),
    defaultValues: {
      columns: columnsFromImportForm.map((column: string) => ({
        systemColumnName: column,
        databaseColumnName: '',
      })),
    },
  });

  const onSubmit = () => {
    router.push('/settings');
  };

  useEffect(() => {
    console.log('Columns received:', columnsFromImportForm);
  }, [columnsFromImportForm]);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">
            Column Mapping Required
          </h1>
          <p className="">
            It seems that you&apos;ve imported a CSV file, but the
            columns haven&apos;t been mapped to our Attendance
            settings yet.
          </p>
        </div>

        <div className="flex w-fit flex-col gap-4">
          <p className="">
            To ensure accurate integration of your data, please map
            the columns from your CSV file to our system&apos;s
            Attendance configuration.
          </p>
          <p className="">
            Click the button below to go to the Attendance settings
            configuration and map the columns:
          </p>
          <Button
            onClick={onSubmit}
            className="flex w-fit flex-row items-center justify-center"
          >
            Attendance settings
          </Button>
        </div>
      </div>
    </>
  );
};

export default Mapping;
