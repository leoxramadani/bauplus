import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AttendanceImportForm = () => {
  const [file, setFile] = useState<any>();

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // if (files[0].type === 'application/pdf') {
      //   console.log('file -->', URL.createObjectURL(files![0]));
      //   console.log('file -->', files![0]);
      // } else if (files[0].type.includes('image')) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     const image = new Image();
      //     image.src = e.target?.result as string;
      //   };
      //   reader.readAsDataURL(files[0]);
      // }

      console.log('files inside handleUpload->', files);
    }
  };

  const form = useForm({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: any) => {
      console.log('Cnosole file -->', file);

      console.log('Inside of submit ', data);
      axios
        .post('', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {})
        .catch((error) => {
          console.log('error=>', error);
          toast.error('Failed to retrieve upload file');
        });
    },
    [file]
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
