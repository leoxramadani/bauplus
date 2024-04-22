'use client';

interface FileViewerProps {
  previewFile: string;
  setPreviewFile?: any;
}
const FileViewer = ({
  previewFile,
  setPreviewFile,
}: FileViewerProps) => {
  if (previewFile) {
    // console.log('there is a preview file->', previewFile);

    if (!previewFile.includes('blob')) {
      // console.log('the file is an image->', previewFile);
      return (
        <img
          src={previewFile}
          className="h-auto w-auto"
          alt="preview image"
        />
      );
    }

    return <iframe src={previewFile} width="100%" height="100%" />;
  }
  return;
};
export default FileViewer;
