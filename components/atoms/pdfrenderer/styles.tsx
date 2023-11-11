import { Font, StyleSheet } from "@react-pdf/renderer";

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


export const generalStyle = StyleSheet.create({
    page: {
      padding: 25,
      fontFamily: 'Inter',
      backgroundColor: '#F9FAFC',
      flex: 1,
    },
    invoiceTitle: {
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: 20,
      textAlign: 'center',
      color: '#272727',
    },
    invoiceTitleSeparator: {
      fontFamily: 'Inter',
      fontWeight: 300,
      color: '#878787',
    },
    header: {
      marginTop: 48,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeftTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#231F20',
    },
    headerLeftText: {
      color: '#5E6470',
      fontSize: 10,
      fontWeight: 400,
    },
    headerRightTitle: {
      fontSize: 16,
      fontWeight: 600,
    },
    headerRightText: {
      fontSize: 12,
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tableCell: {
      width: '16.6666666667%',
    },
    tableCellHeader: {
      fontSize: 8,
      padding: 5,
      margin: 5,
      textTransform: 'uppercase',
      color: '#5E6470',
      fontWeight: 'semibold',
    },
    tableCellRow: {
      fontSize: 10,
      paddingTop: 5,
      paddingHorizontal: 5,
      marginTop: 5,
      marginHorizontal: 5,
      textTransform: 'uppercase',
      color: '#1A1C21',
      fontWeight: 'medium',
      flexWrap: 'wrap',
      //width: '16.6666666667%',
    },
    tableCellItemDescription: {
      color: '#5E6470',
      fontWeight: 'normal',
      fontSize: 10,
      paddingHorizontal: 5,
      marginHorizontal: 5,
    },
  });



