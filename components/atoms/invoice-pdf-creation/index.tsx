'use client';

import {
  Document,
  Font,
  PDFViewer,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import 'react-resizable/css/styles.css';
import Modal from '../Modal';
import { Header } from './header';
import { generalStyle } from './styles';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtvAw.ttf',
  fontWeight: 'bold',
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf',
  fontWeight: 'normal',
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZg.ttf',
  fontWeight: 600,
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZg.ttf',
  fontWeight: 300,
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf',
  fontWeight: 500,
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf',
  fontWeight: 700,
});

interface pdfInputs {
  invoiceNumber: number;
  companyName: string;
  totalAmount: string;
  invoiceDate: Date;
  dueDate: Date;
  content: string;
}

const generalInvoice = (
  invoiceNumber: number,
  companyName: string,
  totalAmount: string,
  invoiceDate: Date,
  dueDate: Date
): React.ReactElement => {
  const totalWithoutVAT = Number(totalAmount) / (1 + 0.18);
  const vatAmount = Number(totalAmount) - totalWithoutVAT;
  return (
    <Document>
      <Page size="LETTER">
        {/* whole page */}
        <View style={generalStyle.page}>
          {/* Invoice Text */}
          <View>
            <Text style={generalStyle.invoiceTitle}>
              ФАКТУРА{' '}
              <Text style={generalStyle.invoiceTitleSeparator}>
                |
              </Text>{' '}
              FATURË
            </Text>
          </View>
          {/* end - invoice text */}

          <Header companyName={companyName} />
          {/* invoice information*/}
          <View
            style={{
              padding: 17,
              borderRadius: 12,
              backgroundColor: 'white',
              marginTop: 29,
              border: 1,
              borderColor: '#DCDCDC',
            }}
          >
            {/* invoice number*/}
            <View>
              <Text style={{ fontSize: 10, color: '#5E6470' }}>
                БРОЈ НА ФАКТУРА / NUMRI FATURËS
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'semibold',
                  marginTop: 5,
                }}
              >
                #{invoiceNumber}
              </Text>
            </View>
            {/*end - invoice number*/}

            {/* subject, issue date, due date */}
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {/* subject */}
              <View style={{ rowGap: 4 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#5E6470',
                  }}
                >{`Предмет\nSubjekti`}</Text>
                <Text style={{ fontSize: 10, fontWeight: 600 }}>
                  subject
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  columnGap: 26,
                }}
              >
                {/* issue date */}
                <View
                  style={{
                    rowGap: 4,
                    alignItems: 'flex-end',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#5E6470',
                      textAlign: 'right',
                      fontWeight: 500,
                    }}
                  >{`Датум на издавање\nData e lëshimit`}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      marginTop: 10,
                    }}
                  >
                    {invoiceDate?.toDateString()}
                  </Text>
                </View>

                {/* due date */}
                <View style={{ rowGap: 4, alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#5E6470',
                      textAlign: 'right',
                      fontWeight: 500,
                    }}
                  >{`Датум на плаќање\nAfati i pagesës`}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      marginTop: 10,
                    }}
                  >
                    {dueDate?.toDateString()}
                  </Text>
                </View>
              </View>
            </View>

            {/* tabela */}

            <View>
              <View
                style={[
                  generalStyle.tableRow,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 10,
                  },
                ]}
              >
                <View
                  style={[
                    generalStyle.tableCell,
                    {
                      width: '70%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <Text style={[generalStyle.tableCellRow]}>
                    Цена без ДДВ / Çmimi pa TVSH{' '}
                  </Text>
                  <View
                    style={[
                      generalStyle.tableCell,
                      {
                        width: '30%',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        ...generalStyle.tableCellRow,
                        textTransform: 'lowercase',
                      }}
                    >
                      {totalWithoutVAT.toFixed(2)} ден.
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  generalStyle.tableRow,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: '10px',
                  },
                ]}
              >
                <View
                  style={[
                    generalStyle.tableCell,
                    {
                      width: '70%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <Text style={[generalStyle.tableCellRow]}>
                    ДДВ / TVSH-ja{' '}
                  </Text>
                  <View
                    style={[
                      generalStyle.tableCell,
                      {
                        width: '30%',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        ...generalStyle.tableCellRow,
                        textTransform: 'lowercase',
                      }}
                    >
                      {vatAmount.toFixed(2)} ден.
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View
                style={[
                  generalStyle.tableRow,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderTop: 0.3,
                  },
                ]}
              >
                <View
                  style={[
                    generalStyle.tableCell,
                    {
                      width: '70%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <Text style={[generalStyle.tableCellRow]}>
                    Вкупно / Totali{' '}
                  </Text>
                  <View
                    style={[
                      generalStyle.tableCell,
                      {
                        width: '30%',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        ...generalStyle.tableCellRow,
                        textTransform: 'lowercase',
                        fontWeight: 'bold',
                      }}
                    >
                      {totalAmount} ден.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* date, received, director */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 17,
            borderRadius: 12,
            backgroundColor: 'white',
            marginTop: 5,
            border: 1,
            marginHorizontal: 27,
            borderColor: '#DCDCDC',
          }}
        >
          {/* date */}
          <View style={{ borderBottom: 0.4 }}>
            <Text
              style={{
                fontSize: 10,
                paddingBottom: 25,
                paddingHorizontal: 15,
                fontFamily: 'Inter',
              }}
            >
              Датум / Data
            </Text>
          </View>

          {/* received */}
          <View style={{ borderBottom: 0.4 }}>
            <Text
              style={{
                fontSize: 10,
                paddingBottom: 25,
                paddingHorizontal: 15,
                fontFamily: 'Inter',
              }}
            >
              Примил / Marrë nga
            </Text>
          </View>

          {/* director */}
          <View style={{ borderBottom: 0.4 }}>
            <Text
              style={{
                fontSize: 10,
                paddingBottom: 25,
                paddingHorizontal: 15,
                fontFamily: 'Inter',
              }}
            >
              Управител / Drejtor
            </Text>
          </View>
        </View>

        {/* footer */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              borderTop: 1,
              paddingTop: 7,
              borderStyle: 'dashed',
              paddingHorizontal: 10,
              fontFamily: 'Inter',
              marginBottom: 10,
            }}
          >
            Платете во рок од 15 дена од добивањето на оваа фактура. /
            Ju lutemi që ta paguani faturën brenda 15 ditëve nga
            marrja e saj.
          </Text>
        </View>
        {/* end - whole page */}
      </Page>
    </Document>
  );
};

const initialDocument = (
  <Document>
    <Page>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text>Fill the data to generate the invoice in PDF</Text>
      </View>
    </Page>
  </Document>
);

const PDFRenderer: React.FC<pdfInputs> = ({
  invoiceNumber,
  companyName,
  totalAmount,
  invoiceDate,
  dueDate,
  content,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pdfData, setPdfData] = useState<React.ReactElement | null>(
    null
  );
  const [createAsPdf, setCreateAsPDF] = useState(false);

  useEffect(() => {
    console.log('1213');
    setPdfData(
      generalInvoice(
        invoiceNumber,
        companyName,
        totalAmount,
        invoiceDate,
        dueDate
      )
    );
  }, [invoiceNumber, companyName, totalAmount, invoiceDate, dueDate]);

  const createPdf = () => {
    setCreateAsPDF(!createAsPdf);
  };

  return (
    <div>
      <>
        {pdfData ? (
          <Modal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          >
            <Modal.Trigger asChild>
              <div
                onClick={createPdf}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                {content}
              </div>
            </Modal.Trigger>
            <Modal.Content
              key="modal-content"
              title="PDF Preview"
              description="You can go back and change the inputs if you don't like something."
            >
              {pdfData ? (
                <PDFViewer style={{ width: '100%', height: '75vh' }}>
                  {pdfData}
                </PDFViewer>
              ) : null}
            </Modal.Content>
          </Modal>
        ) : null}
      </>
    </div>
  );
};

export default PDFRenderer;
