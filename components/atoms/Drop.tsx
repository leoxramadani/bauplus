import { X } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface IDrop {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Drop = ({ selectedFile, setSelectedFile }: IDrop) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        // Take only the first accepted file
        const file = acceptedFiles[0];
        setSelectedFile(file);
      }

      // Handle rejected files if needed
      if (fileRejections.length > 0) {
        console.log('Rejected files:', fileRejections);
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [], 'application/pdf': [] },
    multiple: false,
    onDrop, // Allow only one file
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const generatePdfUrl = () => {
    if (selectedFile) {
      // Ensure selectedFile is not null
      const pdfBlob = new Blob([selectedFile], {
        type: 'application/pdf',
      });
      return URL.createObjectURL(pdfBlob);
    } else {
      // Handle the case where selectedFile is null (optional)
      console.error('No PDF file selected');
      return '#'; // or null, or any other default value
    }
  };

  return (
    <div className="w-full sm:col-span-2">
      {!selectedFile && (
        <div
          {...getRootProps({ style })}
          className="flex h-24 w-full flex-col items-center justify-center sm:col-span-2"
        >
          <input {...getInputProps()} />
          <p>
            {isFocused
              ? isDragAccept
                ? 'Drop the file here'
                : isDragReject
                ? 'File type not accepted, please drop an image or PDF'
                : 'Drag and drop an image '
              : 'Drag and drop an image or click to select a file'}
          </p>
        </div>
      )}
      {selectedFile &&
        (selectedFile.type.startsWith('image/') ? (
          <div className="group relative flex h-full w-full items-center justify-center border border-gray-100 sm:max-h-[200px] sm:max-w-[200px]">
            <img
              className="aspect-[4/3] h-full w-full object-cover"
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
            />

            <X
              className="absolute right-2 top-2 cursor-pointer rounded-full bg-red-500 p-1 text-white shadow-md transition-all group-hover:opacity-100 lg:opacity-0"
              onClick={() => setSelectedFile(null)}
            />
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p>{selectedFile.name}</p>
            <a
              href={generatePdfUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              View PDF
            </a>
            <X
              className=" right-2 top-2 cursor-pointer rounded-full bg-red-500 p-1 text-white  shadow-md"
              onClick={() => setSelectedFile(null)}
            />
          </div>
        ))}
    </div>
  );
};

export default Drop;
