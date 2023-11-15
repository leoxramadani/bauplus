'use client';

interface FileViewerProps {
  invoicePdf: string;
  setInvoicePdf?: any;
}
const FileViewer = ({
  invoicePdf,
  setInvoicePdf,
}: FileViewerProps) => {
  if (invoicePdf) {
    return <iframe src={invoicePdf} width="100%" height="100%" />;
  }
  return;
};
export default FileViewer;
