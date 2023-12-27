import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import { toast } from 'sonner';

const AttendanceImportForm = ({
  setAttendanceOptions,
}: {
  setAttendanceOptions: any;
}) => {
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<string>('');
  const [parsedData, setParsedData] = useState<any>();
  const [columns, setColumns] = useState<any>([]);
  const [values, setValues] = useState<any>([]);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // Save the file name
      console.log('files inside handleUpload->', files);

      // if (
      //   files[0].type.endsWith('.csv') ||
      //   files[0].type.endsWith('.xlsx')
      // ) {
      //   console.log('file -->', URL.createObjectURL(files![0]));
      //   console.log('file -->', files![0]);
      // } else if (files[0].type.includes('image')) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     const image = new Image();
      //     image.src = e.target?.result as string;
      //   };
      //   reader.readAsDataURL(files[0]);

      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const columnsArray: any = [];
          const valuesArray: any = [];

          // Iterating data to get column name and their values
          results.data.map((d: any) => {
            // console.log('each map d-> ', Object.keys(d));

            columnsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // console.log('Object.keys --->', Object.keys(results.data));

          console.log('results =>', results.data);

          // Parsed Data Response in array format
          setParsedData(results.data);

          // Filtered Column Names
          setColumns(columnsArray[0]);

          // Filtered Values
          setValues(valuesArray);

          setAttendanceOptions(true);
        },
      });

      // const csv = Papa.unparse(files[0], config);
    }

    //     console.log('This is an excel or CSV file');
    //   }
    // }
  };

  useEffect(() => {
    console.log('columns->', columns);
  }, [columns]);

  const form = useForm({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: any) => {
      if (!file) {
        toast.error('Please select a file to upload.');
        return;
      }
      console.log('Console file -->', file);
      console.log('Inside of submit ', data);

      try {
        // Perform the axios POST request first
        await axios.post('', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // After the POST request is successful, navigate to the mapping route
        router.push({
          pathname: '/hr/attendance/mapping',
          query: { columnsData: JSON.stringify(columns) },
        });
      } catch (error) {
        console.log('error=>', error);
        toast.error('Failed to retrieve upload file');
      }
    },
    [file, columns, router]
  );

  const onError = (error: any) => {
    console.log('error generate->', error);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center justify-center gap-4 "
      >
        <div className="flex w-full items-center justify-center ">
          <label
            htmlFor="dropzone-file"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 hover:bg-gray-100 "
          >
            <div className="flex flex-row items-center justify-center gap-2 ">
              {file ? (
                <p className=" text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{file.name}</span>{' '}
                </p>
              ) : (
                <>
                  <svg
                    className=" h-8 w-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload
                    </span>{' '}
                  </p>
                </>
              )}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p> */}
            </div>
            <Input
              type="file"
              // value={file}
              // accept={'.csv' || '.xls'}
              id="dropzone-file"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <Button
          type="submit"
          // disabled={ocrIsLoading}
          className="w-max"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AttendanceImportForm;
