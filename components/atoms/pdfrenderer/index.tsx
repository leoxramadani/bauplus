import {
  Document,
  Font,
  PDFViewer,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { generalStyle } from './styles';
import { ThorLogo } from './ThorLogo';
import { EverestLogo } from './EverestLogo';
import { Button } from '@/components/ui/button';
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
const inputStyle =
  'w-48 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500';

const buttonStyle =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded';

const centerDivStyle = 'flex justify-center items-center h-screen';

interface pdfInputs {
  companyName: string;
  totalAmount: string;
  invoiceDate: Date;
  // Add more parameters as needed
}

const PDFRenderer: React.FC<pdfInputs> = ({
  companyName,
  totalAmount,
  invoiceDate,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState(new Date(invoiceDate?.getDate() + 15));

  // Transform the values into an array

  const [pdfData, setPdfData] = useState<React.ReactElement | null>(
    null
  );

  useEffect(() => {
    if (invoiceDate) {
      // Parse the issueDate to a Date object
      const issueDateObj = new Date(invoiceDate);

      // Calculate the dueDate by adding 15 days to issueDate
      issueDateObj.setDate(issueDateObj.getDate() + 15);

      // Set the dueDate state variable
      setDueDate(issueDateObj);
    }
  }, [invoiceDate]);

  const [selectedLogo, setSelectedLogo] = useState('1');

  const handleLogoChange = (event: { target: { value: any } }) => {
    const logoId = event.target.value;
    setSelectedLogo(logoId);
  };

  const generatePDF = () => {
    if (companyName || subject || invoiceDate || totalAmount || dueDate !== null) {
      // Create the PDF content
      const selectedLogoComponent =
        selectedLogo === '1' ? <ThorLogo /> : <EverestLogo />;

      const totalWithoutVAT = Number(totalAmount) / (1 + 0.18);

      const vatAmount = Number(totalAmount) - totalWithoutVAT;

      const generalInvoice = (
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

              {/* header */}
              <View style={generalStyle.header}>
                {/* our company logo and information */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* company logo */}
                  <View>{selectedLogoComponent}</View>

                  {/* company information */}
                  <View style={{ marginLeft: 13, rowGap: 3 }}>
                    <Text style={generalStyle.headerLeftTitle}>
                      Everest XH.D.
                    </Text>
                    <Text style={generalStyle.headerLeftText}>
                      Даночен Број / Numri Tatimor:{' '}
                      <Text>MK4028005149980</Text>
                    </Text>
                    <Text style={generalStyle.headerLeftText}>
                      Жиро сметка / Xhiro Llogaria:{' '}
                      <Text>38017960411108</Text>
                    </Text>
                    <Text style={generalStyle.headerLeftText}>
                      Aдреса / Adresa: Ул. Пример бр. 8/123, Скопје
                    </Text>
                    <Text style={generalStyle.headerLeftText}>
                      service@everestxhd.com
                    </Text>
                  </View>
                </View>
                {/* end - our company logo and information */}

                {/* billed company */}
                <View
                  style={{
                    rowGap: 3,
                  }}
                >
                  <Text style={generalStyle.headerRightTitle}>
                    {companyName}
                  </Text>
                  <View>
                    <Text style={generalStyle.headerRightText}>
                      Address
                    </Text>
                    <Text style={generalStyle.headerRightText}>
                      Email
                    </Text>
                  </View>
                </View>
                {/* end - billed company */}
              </View>
              {/* end - header*/}

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
                    style={{ fontSize: 10, fontWeight: 'semibold' }}
                  >
                    {invoiceNumber}
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
                      {subject}
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
                        }}
                      >
                        {invoiceDate.toDateString()}
                      </Text>
                    </View>

                    {/* due date */}
                    <View
                      style={{ rowGap: 4, alignItems: 'flex-end' }}
                    >
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
                        }}
                      >
                        {dueDate.toDateString()}
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
                  marginTop: 12,
                  border: 1,
                  margin: 10,
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
                      fontFamily: 'Inter'
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
                      fontFamily: 'Inter'
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
                      fontFamily: 'Inter'
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
                    fontFamily: 'Inter'
                  }}
                >
                  Платете во рок од 15 дена од добивањето на оваа
                  фактура. / Ju lutemi që ta paguani faturën brenda 15
                  ditëve nga marrja e saj.
                </Text>
              </View>
            {/* end - whole page */}
          </Page>
        </Document>
      );

      setPdfData(generalInvoice);
    } else {
      alert('Please fill in all three inputs.');
    }
  };

  const handleButtonClick = () => {
    // Call the function from the prop
    generatePDF();
  };

  return (
    <>
      <div>
      <Button onClick={handleButtonClick}>
        Generate Invoice
      </Button>

        {pdfData ? (
          <PDFViewer width="100%" height={800}>
            {pdfData}
          </PDFViewer>
        ) : null}
      </div>
    </>
  );
};

export default PDFRenderer;
