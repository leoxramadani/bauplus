import { X } from 'lucide-react';
import React, { useCallback, useMemo } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone';


const baseStyle = {
    flex: 1,
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  

interface IDrop {
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}

const Drop = ({selectedFile, setSelectedFile} : IDrop) => {


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
        isDragReject
      } = useDropzone({
        accept: {'image/*':[], 'application/pdf': []},
        multiple: false,
        onDrop // Allow only one file
      });

      
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const generatePdfUrl = () => {
    // Your logic to generate a PDF or retrieve the PDF URL
    // For example, if you have a Blob representing the PDF content:
    const pdfBlob = new Blob(['PDF content here'], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  };

    
  return (
    <div className='w-full sm:col-span-2'>
    {!selectedFile && (
        <div {...getRootProps({style})} className='w-full sm:col-span-2 h-24 items-center flex-col flex justify-center'>
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
        </div>)}
        {selectedFile && (
  selectedFile.type.startsWith('image/') ? (
          <div className='group relative sm:max-w-[200px] sm:max-h-[200px] border border-gray-100 w-full h-full flex justify-center items-center'>
              <img
                className='aspect-[4/3] h-full w-full object-cover'
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
              />
              
              <X className='absolute bg-red-500 text-white shadow-md top-2 right-2 rounded-full p-1 lg:opacity-0 group-hover:opacity-100 transition-all cursor-pointer' onClick={() => setSelectedFile(null)} />
          </div>
        ):
        (
          <div className='flex flex-row gap-2'>
            <p>{selectedFile.name}</p>
            <a href={generatePdfUrl()} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            <X className=' bg-red-500 text-white shadow-md top-2 right-2 rounded-full p-1  cursor-pointer' onClick={() => setSelectedFile(null)} />
          </div>
        ))}
        </div>
  )
}

export default Drop