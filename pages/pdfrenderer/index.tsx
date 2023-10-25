import {
  Defs,
  Document,
  Font,
  G,
  LinearGradient,
  PDFViewer,
  Page,
  Path,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';

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

// const stylesThor = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#ffffff',
//     fontFamily: 'Roboto',
//     padding: 35,
//   },
//   image: {
//     marginLeft: 10,
//     margin: 25,
//     marginHorizontal: 90,
//     marginTop: 100,
//   },
//   belowLogo: {
//     padding: 10,
//     flexDirection: 'row',
//   },
//   information: {
//     paddingRight: 20,
//     paddingTop: 10,
//   },
//   buyerRight: {
//     borderColor: '#000000',
//     borderWidth: 1,
//     flexDirection: 'column',
//     padding: 10,
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   data: {
//     fontSize: 12,
//   },
//   table: {
//     flex: 'auto',
//     flexShrink: 1,
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: { flexDirection: 'row' },
//   tableCell: {
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flex: 1,
//   },
//   tableCellText: {
//     fontSize: 10,
//     padding: 5,
//   },
// });

// const stylesEverest = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#ffffff',
//     fontFamily: 'Roboto',
//     padding: 25,
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     marginTop: 70,
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//   },
//   headerRight: {
//     borderColor: '#000000',
//     borderWidth: 3,
//     paddingTop: 60,
//     paddingHorizontal: 10,
//     textAlign: 'center',
//     justifyContent: 'space-between',
//   },
//   belowLogo: {
//     padding: 10,
//     flexDirection: 'row',
//   },
//   information: {
//     paddingRight: 20,
//     paddingTop: 10,
//   },
//   table: {
//     flex: 'auto',
//     flexShrink: 1,
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     marginTop: 20,
//   },
//   tableRow: { flexDirection: 'row' },
//   tableCell: {
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flex: 1,
//   },
//   tableCellBigger: {
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//   },
//   tableCellLastRowFirstCell: {
//     // Adjust the width as needed
//     width: '83.3333333333333333333333333333333333%', // Set the desired width here
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//     textAlign: 'right',
//   },
//   tableCellText: {
//     fontSize: 10,
//     padding: 5,
//     margin: 5,
//   },
// });

// const stylesAlbArchitect = StyleSheet.create({
//   page: {
//     margin: 25,
//     fontFamily: 'Roboto',
//   },
//   table: {
//     flexShrink: 1,
//     marginTop: 20,
//   },
//   tableCell: {
//     borderWidth: 1,
//     borderStyle: 'dotted',
//     flex: 'auto',
//     width: '10%',
//     backgroundColor: '#cfcfcf',
//     padding: 4,
//   },
//   tableCellWBorder: {
//     flex: '1',
//   },
//   tableCellText: {
//     fontSize: 8,
//   },
//   tableRowCellText: {
//     fontSize: 8,
//     padding: 4,
//     textAlign: 'right',
//   },
//   tableHeaderCellNaziv: {
//     width: '50%',
//     padding: 4,
//     borderWidth: 1,
//     borderStyle: 'dotted',
//   },
//   tableCellNaziv: {
//     width: '50%',
//   },
//   tableRowNazivCellText: {
//     textAlign: 'left',
//     fontSize: 8,
//   },
// });

// const customTable = StyleSheet.create({
//   page: {
//     backgroundColor: '#ffffff',
//     padding: '50pt 50pt 70pt', // Adjusted padding to leave space for page number
//     fontFamily: 'Roboto',
//     flexDirection: 'column',
//     alignItems: 'center', // Center the table horizontally
//     justifyContent: 'center',
//   },
//   pageNumber: {
//     position: 'absolute',
//     fontSize: 10,
//     bottom: 35,
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//   },
//   table: {
//     display: 'flex',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     width: '100%',
//     textAlign: 'center',
//     textOverflow: 'ellipsis',
//   },
//   tableRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 'auto',
//     width: '100%',
//     wordWrap: 'break-word',
//     minHeight: 35, // Adjust the value as needed
//     textOverflow: 'ellipsis',
//     height: 'auto',
//   },
//   tableCol: {
//     width: '10%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//     wordWrap: 'break-word', // Add this line to break long words
//     textAlign: 'center',
//     justifyContent: 'center',
//     objectFit: 'contain',
//     textOverflow: 'ellipsis',
//   },
//   tableCell: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//   },
//   widerTableCol: {
//     width: '12%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//     wordWrap: 'break-word', // Add this line to break long words
//     textAlign: 'center',
//     justifyContent: 'center',
//     padding: 5,
//     objectFit: 'contain',
//     textOverflow: 'ellipsis',
//   },
//   tableCellArkiva: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//     borderTop: 1,
//   },
//   tableCellArkivaFirst: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   tableCellArkivaEnd: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//     borderLeft: 1,
//     justifyContent: 'center',
//   },
//   tableCellArkivaEndFirst: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//     justifyContent: 'center',
//   },
//   tableCellArkivaEndFirstDate: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//     width: '90%',
//   },
//   tableCellArkivaEndData: {
//     display: 'flex',
//     flexDirection: 'column',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     overflow: 'hidden',
//     borderLeft: 1,
//     justifyContent: 'center',
//     width: '97%',
//   },
//   tableColEnd: {
//     display: 'flex',
//     width: '15%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//     wordWrap: 'break-word', // Add this line to break long words
//     textAlign: 'center',
//     justifyContent: 'center',
//     objectFit: 'contain',
//     textOverflow: 'ellipsis',
//   },
//   tableRowEnd: {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 'auto',
//     width: '100%',
//     wordWrap: 'break-word',
//     minHeight: 35, // Adjust the value as needed
//     textOverflow: 'ellipsis',
//     height: 'auto',
//     justifyContent: 'center',
//     borderTop: 1,
//   },
//   tableRowEndData: {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 'auto',
//     width: '100%',
//     wordWrap: 'break-word',
//     minHeight: 25, // Adjust the value as needed
//     textOverflow: 'ellipsis',
//     height: 'auto',
//     justifyContent: 'center',
//   },
//   tableColImePrezime: {
//     width: '25%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     flexDirection: 'column',
//     wordWrap: 'break-word', // Add this line to break long words
//     textAlign: 'center',
//     justifyContent: 'center',
//     objectFit: 'contain',
//     textOverflow: 'ellipsis',
//   },
//   tableCellArkivaWPadding: {
//     display: 'flex',
//     flexDirection: 'column',
//     fontSize: 10,
//     flexWrap: 'wrap',
//     wordBreak: 'break-word', // Add this line to break long words
//     wordWrap: 'break-word',
//     textAlign: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   tableRowWPadding: {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 'auto',
//     width: '100%',
//     wordWrap: 'break-word',
//     minHeight: 25, // Adjust the value as needed
//     textOverflow: 'ellipsis',
//   },
// });

const generalStyle = StyleSheet.create({
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
  tableCellRowLowerCase: {
    textTransform: 'lowercase',
  },
  tableCellItemDescription: {
    color: '#5E6470',
    fontWeight: 'normal',
    fontSize: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});

const inputStyle =
  'w-48 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500';

const buttonStyle =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded';

const centerDivStyle = 'flex justify-center items-center h-screen';

const ThorLogo = () => {
  return (
    <Svg width="89" viewBox="0 0 150 98">
      <Path
        d="M19.7186 23.2406C19.356 23.2406 19.0763 23.2406 18.7965 23.2406C14.0314 23.2406 9.26463 23.2297 4.49947 23.2547C3.85714 23.2578 3.36171 23.097 2.88191 22.6785C2.11923 22.0118 1.27842 21.4309 0.529808 20.7486C0.264122 20.5065 0.0250058 20.0756 0.0234429 19.7305C-0.0078143 14.2154 -0.0078143 8.69883 0.0234429 3.18222C0.0250058 2.83402 0.2735 2.43741 0.511054 2.1501C1.96608 0.385661 3.8462 0.0374556 6.09671 0.0546316C19.6373 0.162372 33.1795 0.124897 46.7201 0.118652C47.2593 0.118652 47.6047 0.334134 48.0189 0.644862C49.6818 1.8909 50.1647 3.4586 50.0928 5.54001C49.9302 10.2166 50.0459 14.904 50.0787 19.5868C50.0818 20.1427 49.8412 20.4456 49.4864 20.8297C47.8657 22.5879 45.9215 23.0564 43.5569 22.9533C39.4028 22.7706 35.2347 22.9018 30.9478 22.9018C30.9478 23.3468 30.9478 23.6201 30.9478 23.8933C30.9306 42.1842 30.9274 60.4734 30.879 78.7627C30.8727 80.9425 31.6823 82.6351 33.303 84.0092C33.9156 84.5292 34.4267 84.665 36.2287 84.7649C36.2287 88.7779 36.2287 92.7955 36.2287 96.9005C34.3782 96.9521 32.5075 96.9411 30.7868 96.0979C27.05 94.2679 23.9805 91.6525 22.0004 87.9612C20.6313 85.4114 19.6373 82.7007 19.6405 79.7277C19.6483 72.9369 19.6358 66.1462 19.6436 59.3554C19.6545 50.1194 19.6764 40.885 19.6952 31.649C19.6999 29.1523 19.7123 26.654 19.7202 24.1572C19.7202 23.8777 19.7186 23.5982 19.7186 23.2406ZM31.44 10.3868C31.4385 7.39189 29.0958 5.03722 26.1029 5.02317C23.1053 5.01068 20.6438 7.46528 20.686 10.4242C20.7282 13.3988 23.1272 15.7535 26.1029 15.7457C29.0926 15.7363 31.4416 13.3785 31.44 10.3868ZM3.63365 1.51615C3.34452 1.74412 3.12259 1.96897 2.85847 2.11731C2.08485 2.54827 1.90044 3.18378 1.90825 4.04882C1.95045 8.90962 1.92857 13.772 1.92857 18.6343C1.92857 19.9944 2.2724 20.5018 3.79775 21.1873C2.71312 19.4885 3.13822 17.7428 3.08508 16.0533C3.03507 14.4684 3.0085 12.8788 3.08821 11.2971C3.25231 8.05863 2.5709 4.7749 3.63365 1.51615ZM46.6748 21.1951C46.7342 21.2248 46.6201 21.1655 46.6779 21.1951C47.1218 20.8376 47.6344 20.5143 48.0454 20.124C48.208 19.9694 48.3314 19.6883 48.333 19.465C48.3486 14.0843 48.3486 8.70195 48.3346 3.32119C48.3346 3.09322 48.2283 2.80123 48.0673 2.64977C47.6391 2.24223 47.1546 1.89558 46.692 1.52396C47.4015 2.90272 47.2234 4.36736 47.2249 5.80702C47.2281 9.34215 47.2421 12.8788 47.2187 16.414C47.2077 18.0035 47.6344 19.7164 46.6748 21.1951Z"
        fill="black"
      />
      <Path
        d="M64.6851 79.9291C60.903 79.9291 57.2912 79.9291 53.6435 79.9291C53.6435 53.272 53.6435 26.6618 53.6435 0C57.2912 0 60.9202 0 64.6679 0C64.6679 6.09591 64.6679 12.1434 64.6679 18.2518C65.0586 18.269 65.3368 18.2924 65.6134 18.294C69.9363 18.3143 74.2592 18.3049 78.5805 18.3767C79.2056 18.3877 79.8823 18.6906 80.4309 19.0278C81.0185 19.3885 81.5249 19.9116 81.9922 20.43C82.7314 21.2498 83.1972 22.1507 83.194 23.3531C83.1643 34.9578 83.1847 46.5625 83.1987 58.1672C83.2081 65.1141 83.2331 72.061 83.2503 79.0079C83.2519 79.3389 83.2503 79.6715 83.2503 80.0181C79.5401 80.0181 75.9283 80.0181 72.1665 80.0181C72.1665 63.1685 72.1665 46.3517 72.1665 29.4334C69.6112 29.4334 67.206 29.4334 64.6851 29.4334C64.6851 46.2299 64.6851 63.0483 64.6851 79.9291Z"
        fill="black"
      />
      <Path
        d="M86.6871 48.8219C86.6871 40.4416 86.7543 32.0613 86.6417 23.6841C86.612 21.5246 89.3408 18.344 91.9101 18.3736C98.5257 18.4517 105.141 18.4064 111.758 18.3939C112.907 18.3924 113.643 19.081 114.317 19.8414C114.867 20.4628 115.376 21.1374 115.788 21.8541C116.045 22.3038 116.209 22.8784 116.211 23.3968C116.25 40.4666 116.249 57.5379 116.295 74.6093C116.303 77.1826 113.523 80.1103 110.841 80.0369C104.701 79.8683 98.5507 80.0306 92.4056 80.0509C89.0517 80.0619 86.6371 77.6494 86.6402 74.272C86.6464 67.5843 86.6714 60.8982 86.6871 54.2105C86.6902 52.4133 86.6871 50.6176 86.6871 48.8219ZM97.7802 29.8144C97.7802 43.1367 97.7802 56.4168 97.7802 69.686C100.365 69.686 102.899 69.686 105.487 69.686C105.373 56.3434 105.259 43.0883 105.146 29.8144C102.636 29.8144 100.226 29.8144 97.7802 29.8144Z"
        fill="black"
      />
      <Path
        d="M149.436 37.4733C145.73 37.4733 142.125 37.4733 138.466 37.4733C138.466 34.7345 138.466 31.9895 138.466 29.196C135.956 29.196 133.474 29.196 130.91 29.196C130.91 46.1877 130.91 63.1388 130.91 80.1368C127.12 80.1368 123.413 80.1368 119.61 80.1368C119.61 79.8183 119.61 79.5403 119.61 79.2624C119.61 66.2539 119.606 53.2455 119.613 40.2355C119.616 34.8516 119.671 29.4662 119.641 24.0823C119.635 22.9143 119.948 21.915 120.689 21.0749C121.337 20.3395 122.067 19.6634 122.831 19.0497C123.142 18.7999 123.639 18.6781 124.053 18.675C129.755 18.6344 135.458 18.6266 141.161 18.6047C142.358 18.6 143.561 18.4876 144.749 18.586C145.465 18.6453 146.279 18.8514 146.832 19.2746C148.489 20.5378 149.495 22.1929 149.473 24.3867C149.431 28.4715 149.447 32.5563 149.437 36.6395C149.436 36.8721 149.436 37.1016 149.436 37.4733Z"
        fill="black"
      />
      <Path
        d="M48.3206 97.5329C47.6423 97.5329 47.1 97.5329 46.5014 97.5329C46.5014 93.3342 46.5014 89.1401 46.5014 84.9367C47.3828 84.7353 48.0471 84.9195 48.73 85.5972C51.8839 88.731 55.1049 91.7977 58.3041 94.8863C58.4073 94.9862 58.5323 95.0627 58.7652 95.2423C58.7652 91.7165 58.7652 88.3297 58.7652 84.9039C59.2809 84.9039 59.7076 84.9039 60.1795 84.9039C60.1795 89.1167 60.1795 93.2905 60.1795 97.4861C59.5091 97.6875 59.0168 97.5111 58.5057 97.027C55.2612 93.9494 51.9855 90.9061 48.7191 87.8519C48.6316 87.7707 48.5347 87.7005 48.3221 87.5272C48.3206 90.9233 48.3206 94.1821 48.3206 97.5329Z"
        fill="black"
      />
      <Path
        d="M118.465 92.0007C120.265 94.0353 121.928 95.9137 123.697 97.9124C122.747 98.0529 122.094 98.1107 121.464 97.3971C119.971 95.7029 118.391 94.0821 116.816 92.4613C116.569 92.2068 116.169 92.0116 115.817 91.9648C115.211 91.8852 114.584 91.9429 113.861 91.9429C113.861 93.9353 113.861 95.8731 113.861 97.864C113.301 97.864 112.849 97.864 112.357 97.864C112.357 93.5231 112.357 89.2463 112.357 84.8274C114.354 84.8274 116.321 84.8227 118.287 84.8305C118.78 84.8321 119.274 84.8664 119.767 84.893C121.278 84.9773 122.32 85.7518 122.838 87.1446C123.346 88.5124 123.052 89.7382 121.97 90.7672C121.034 91.6603 119.92 92.046 118.465 92.0007ZM113.648 90.903C115.734 90.7953 117.746 90.7234 119.749 90.561C120.178 90.5267 120.611 90.2097 120.989 89.9458C121.642 89.4883 122.073 88.8731 121.859 88.0237C121.631 87.1227 121.059 86.3732 120.14 86.328C118.002 86.2233 115.856 86.2952 113.686 86.2952C113.676 86.3607 113.651 86.4607 113.651 86.559C113.648 87.9081 113.648 89.2557 113.648 90.903Z"
        fill="black"
      />
      <Path
        d="M100.429 86.3233C98.0773 86.3233 95.7892 86.317 93.5012 86.3295C93.1433 86.3311 92.776 86.3857 92.4306 86.4779C91.7227 86.6684 91.3148 87.0868 91.4195 87.8941C91.4757 88.3297 91.3835 88.7872 91.4664 89.2151C91.6226 90.0286 92.4885 90.6423 93.3559 90.6454C94.8656 90.6485 96.3737 90.6532 97.8835 90.6719C99.1791 90.6875 100.482 91.9945 100.492 93.2733C100.497 93.8198 100.493 94.3648 100.492 94.9113C100.492 96.5102 99.4447 97.828 97.8428 97.8889C95.1188 97.9904 92.3884 97.9171 89.619 97.9171C89.619 97.4236 89.619 96.9911 89.619 96.4212C90.3473 96.4212 91.0928 96.4212 91.8368 96.4212C93.5543 96.4212 95.2719 96.4243 96.9895 96.4196C97.8506 96.4181 98.779 95.8653 98.9478 95.2688C99.2494 94.1992 98.8509 92.7315 98.0913 92.3005C97.8366 92.1569 97.499 92.1131 97.1974 92.11C95.6876 92.0913 94.1795 92.1053 92.6698 92.1007C90.874 92.0944 89.7503 90.9905 89.7628 89.2229C89.7707 88.0456 89.5347 86.8198 90.5021 85.8345C91.0288 85.299 91.5648 84.8602 92.3712 84.8633C94.8953 84.8743 97.4193 84.8664 99.9417 84.8696C100.093 84.8696 100.245 84.8961 100.428 84.9133C100.429 85.388 100.429 85.833 100.429 86.3233Z"
        fill="black"
      />
      <Path
        d="M138.505 97.9155C138.505 97.333 138.505 96.9239 138.505 96.4196C138.816 96.4196 139.095 96.4196 139.371 96.4196C141.506 96.4196 143.641 96.4211 145.776 96.4196C146.682 96.4196 147.643 95.8887 147.839 95.2875C148.133 94.3803 147.804 92.886 147.129 92.4051C146.857 92.2115 146.46 92.1209 146.117 92.1147C144.633 92.0834 143.149 92.0725 141.665 92.1115C140.645 92.1381 139.879 91.6431 139.146 91.0482C138.991 90.9233 138.815 90.7218 138.799 90.5438C138.662 88.8903 138.182 87.1789 139.481 85.7299C140.007 85.1428 140.634 84.8164 141.469 84.8508C142.769 84.9054 144.071 84.8851 145.373 84.8914C146.67 84.8961 147.969 84.8929 149.311 84.8929C149.311 85.3364 149.311 85.7674 149.311 86.2858C149.03 86.2983 148.758 86.3232 148.484 86.3232C146.428 86.3264 144.371 86.3154 142.314 86.3342C141.933 86.3373 141.537 86.4091 141.172 86.5231C140.564 86.7105 140.212 87.1071 140.286 87.8019C140.323 88.1626 140.275 88.5311 140.298 88.8934C140.361 89.8459 141.192 90.636 142.152 90.6422C143.635 90.6531 145.119 90.6406 146.604 90.6469C148.098 90.6531 149.353 91.9195 149.356 93.4154C149.358 93.9103 149.356 94.4037 149.356 94.8987C149.356 96.5226 148.35 97.8233 146.729 97.8889C144.011 97.9966 141.283 97.9155 138.505 97.9155Z"
        fill="black"
      />
      <Path
        d="M63.3458 97.6375C63.3458 93.3826 63.3458 89.226 63.3458 85.0663C63.4271 85.0194 63.4912 84.9476 63.5553 84.9476C65.5557 84.9679 67.564 84.8914 69.5535 85.0491C71.8681 85.2334 73.581 87.0321 73.7811 89.3431C73.8842 90.5282 73.8983 91.7352 73.817 92.9219C73.6263 95.7029 72.0135 97.4096 69.2441 97.6094C67.3108 97.7515 65.3588 97.6375 63.3458 97.6375ZM64.6977 96.6023C65.8261 96.6023 66.8639 96.6023 67.9032 96.6023C70.571 96.6007 71.7931 95.6857 72.5433 93.1156C72.6589 92.7174 72.7527 92.3099 72.8121 91.8992C73.2247 89.0292 71.6337 86.5653 69.0003 86.2343C67.6031 86.0594 66.1637 86.203 64.6993 86.203C64.6977 89.7178 64.6977 93.1109 64.6977 96.6023Z"
        fill="black"
      />
      <Path
        d="M137.388 96.443C137.388 96.9521 137.388 97.383 137.388 97.8733C134.861 97.8733 132.354 97.8733 129.808 97.8733C129.808 93.5481 129.808 89.2666 129.808 84.9242C132.34 84.9242 134.845 84.9242 137.388 84.9242C137.388 85.3817 137.388 85.8095 137.388 86.3217C135.358 86.3217 133.367 86.3217 131.329 86.3217C131.329 87.7973 131.329 89.187 131.329 90.6578C133.357 90.6578 135.348 90.6578 137.383 90.6578C137.383 91.1669 137.383 91.5963 137.383 92.1162C135.386 92.1162 133.393 92.1162 131.343 92.1162C131.343 93.5918 131.343 94.9784 131.343 96.443C133.367 96.443 135.359 96.443 137.388 96.443Z"
        fill="black"
      />
      <Path
        d="M76.5363 84.893C77.0677 84.868 77.4991 84.8477 78.0132 84.8243C78.0132 86.1297 78.0101 87.3694 78.0148 88.6108C78.0195 90.0411 78.0007 91.4729 78.0476 92.9017C78.1211 95.1892 80.2028 96.7834 82.483 96.3837C84.1021 96.0995 85.7338 94.5537 85.6228 92.6003C85.4947 90.344 85.5931 88.0752 85.5931 85.8127C85.5931 85.5301 85.5931 85.2474 85.5931 84.9164C86.0963 84.9164 86.5277 84.9164 87.0528 84.9164C87.0528 85.7424 87.0513 86.5887 87.0528 87.435C87.0544 89.2541 87.0247 91.0732 87.0685 92.8923C87.1341 95.5671 85.3899 97.5236 82.6987 97.6547C81.7938 97.6984 80.8748 97.6454 79.9731 97.5439C78.6196 97.3908 76.5864 95.3204 76.5567 93.9463C76.491 90.9577 76.5363 87.9675 76.5363 84.893Z"
        fill="black"
      />
      <Path
        d="M106.656 97.8733C105.988 97.8733 105.406 97.8733 104.768 97.8733C104.768 94.0259 104.768 90.2331 104.768 86.3592C103.819 86.3592 102.921 86.3592 101.963 86.3592C101.963 85.8517 101.963 85.4254 101.963 84.9305C104.547 84.9305 107.162 84.9305 109.836 84.9305C109.836 85.3458 109.836 85.7924 109.836 86.3248C108.794 86.3248 107.765 86.3248 106.656 86.3248C106.656 90.216 106.656 94.0259 106.656 97.8733Z"
        fill="black"
      />
      <Path
        d="M127.42 97.8671C126.871 97.8671 126.341 97.8671 125.769 97.8671C125.769 93.5575 125.769 89.2651 125.769 84.932C126.341 84.932 126.851 84.932 127.42 84.932C127.42 89.226 127.42 93.5153 127.42 97.8671Z"
        fill="black"
      />
      <Path
        d="M42.5051 84.8992C42.9958 84.8992 43.4272 84.8992 43.9007 84.8992C43.9007 89.1027 43.9007 93.2733 43.9007 97.5033C43.4522 97.5033 43.0021 97.5033 42.5051 97.5033C42.5051 93.3279 42.5051 89.1589 42.5051 84.8992Z"
        fill="black"
      />
    </Svg>
  );
};

const EverestLogo = () => {
  return (
    <Svg width="89" viewBox="0 0 510.54 223">
      <Path
        d="m470.2,172.29c-1.36-3.4,3.12-12.66,6.34-13.83.93-2.82.12-2.03-.58-5.76h2.3c3.05-4.24,3.62-10.73,5.76-16.13,6.7-16.89,25.03-46.21,10.37-64.54-3.65-1.54-7.3-3.07-10.95-4.61-13.79-9-27.57-21.41-40.91-31.69-8.46-6.52-38.99-34.85-48.4-35.73-9.55,10.96-23.7,18.57-35.15,27.66-26.85,21.31-52.24,45.38-78.37,67.42-10.14,8.55-37.94,23.01-42.06,35.15,15.81-.23,16.02,1.43,24.78,6.91,14.65-6.15,15.58-23.25,25.93-33.42,1.34.19,2.69.38,4.03.58.58.38,1.15.77,1.73,1.15-1.59,7.97-9.5,10.45-11.52,19.02,6.72-2.11,13.45-4.23,20.17-6.34,28.42-3.07,56.86-6.15,85.28-9.22,17.35.83,53.57-2.97,70.3-8.64,2.89,3.23-.39,15.17-1.73,20.74-3.87,16.12-7.82,50.46-13.25,61.66,3.57,4.92,7.73.15,13.83,2.88,7.68,7.3,15.37,14.6,23.05,21.9,1.44,3.33-.32,5.29,1.15,8.64,2.56,1.42,2.52,1.32,6.34,1.15v4.61c.58.38,1.15.77,1.73,1.15,5.99-6.82,18.38-24.83,20.17-34.57-8.83-19.89-31.19-4.73-40.34-16.13Zm-195.34-69.72v-.58c5.43-7.23,17.71-11.63,25.35-16.71,17.86-11.91,35.73-23.82,53.59-35.73,4.25,2.61,6.28,6.29,12.1,7.49,3.13-8.85,24.84-19.87,31.69-27.66,6.12.8,15.59,8.47,17.86,13.25,5.26-.8,6.19-6.07,11.52-5.19,17.29,9.99,34.58,19.98,51.86,29.96.38.58.77,1.15,1.15,1.73-9.1,7.38-55.05,6.69-69.72,9.8-17.59,3.73-39.28,7.31-57.05,10.95-9.41.96-18.82,1.92-28.24,2.88-14.6,4.06-33.44,8.49-50.13,9.8Zm156.73-10.37c-10.18.38-20.36.77-30.54,1.15-16.88,2.74-39.26,5.04-56.47,3.46v-1.15c22.66-3.26,45.33-6.53,67.99-9.8,6.53-1.73,13.06-3.46,19.59-5.19,13.83-2.11,27.66-4.23,41.49-6.34,1.54.19,3.07.38,4.61.58.19.58.38,1.15.58,1.73-4.48,4.53-10.77,8.6-13.25,14.98-9.86-3.07-22.42-1.22-34,.58Zm26.51,83.55h-.58c.58-2.11,1.15-4.23,1.73-6.34,1.34-1.54,2.69-3.07,4.03-4.61h2.3c-.94,4.8-4.05,8.58-7.49,10.95Zm5.76-77.79h3.46c-1.61,1.19-1.89,1.57-3.46,0Zm4.03,57.05c-.04-2.08-.08-1.5.58-3.46h.58c.38.38.77.77,1.15,1.15-.44,2.05-.41,1.66-1.15,2.88-.38-.19-.77-.38-1.15-.58Zm-399.33-13.83c2.98,12.84,20.61,32.51,28.24,43.22h9.8c26.31-37.84,52.63-75.68,78.94-113.52,26.7,10.37,53.4,20.75,80.1,31.12v-.58c-17.09-8.26-34.19-16.52-51.28-24.78-9.81-4.84-21.53-14.61-33.42-16.13-19.4,28.62-39.96,55.88-58.78,85.28-6.53,9.41-13.06,18.82-19.59,28.24h-1.15c-9.97-8.4-16.08-25.64-23.63-36.3-3.07,1.15-6.15,2.3-9.22,3.46Zm-54.74,35.73v-32.84h38.03c.74-1.5,1.03-2.01,1.15-4.61-9.69-3.52-28.33-1.25-38.61-1.15v-44.37c18.64-3.18,62.8,4.26,67.99-10.37h-4.03c-13.48,7.5-53.62,3.09-73.18,2.88-2.75,5.02-1.73,17.37-1.73,26.51-.19,23.05-.38,46.1-.58,69.15,2.76,2.77,13.44,2.22,19.02,1.73h42.64c4.99.77,9.99,1.54,14.98,2.3h1.15c-9.43-13.82-44.98-9.63-66.84-9.22Zm429.29-36.3c.38-.58.77-1.15,1.15-1.73-.38-.96-.77-1.92-1.15-2.88-4.99-.19-9.99-.38-14.98-.58-3.96-6.22-.35-16.67-2.3-24.78.39-2.08.59-1.82-2.3-2.3-2.5.58-4.99,1.15-7.49,1.73-2.72,5.91-.21,17.33-1.73,23.05-2.06,2.97-11.79,1.94-16.71,1.73-.19,1.54-.38,3.07-.58,4.61,5.38.19,10.76.38,16.13.58,1.74,3.98,1.14,11.52,1.15,17.29.03,16.16,5.83,27.09,17.86,31.12h.58c.19-.38.38-.77.58-1.15-6.96-6.78-11.96-33.23-5.76-46.67h15.56Zm-265.64-5.76c-8.26.96-16.52,1.92-24.78,2.88-3.26,10.41-1.32,26.26-1.15,38.61,7.6,5.96,28.46,16.45,44.37,9.22h1.15c-.19-.58-.38-1.15-.58-1.73-15.58-2.48-31.17,1.77-32.84-14.41v-.58c16.12-7.81,42.1-3.31,51.28-17.86-.58-2.88-1.15-5.76-1.73-8.64-4.33-8.72-22.41-7.94-35.73-7.49Zm26.51,14.98c-8.31,8.51-25.4,10.44-38.61,13.83-2.61-2.65-1.93-18.11-.58-21.9,3.46-.77,6.92-1.54,10.37-2.3,9.97-.18,19.76-.92,25.93,3.46.96,1.15,1.92,2.3,2.88,3.46v3.46Zm93.93-14.41c-9.6.96-19.21,1.92-28.81,2.88-.19,5.95-.38,11.91-.58,17.86-5.09,32.68,17.08,31.84,44.95,31.12-1.79-3.7-13.29-1.45-19.02-2.88-7.7-1.92-11.9-6.56-14.41-13.83,14.59-10.88,42-.84,51.86-20.74-.77-2.5-1.54-4.99-2.3-7.49-8.64-5.73-19.29-7.14-31.69-6.91Zm-18.44,29.39c-.05-8.23-.06-16.6,1.15-21.9,4.61-.96,9.22-1.92,13.83-2.88,10.52-.28,21.41,0,25.35,6.34,4.42,9.98-32.11,19.36-40.34,18.44Zm72.03-9.8c-1.89-2.88-2.22-4.79-2.3-8.64,9.01-7.02,22.92-5.49,39.18-5.19.19-.38.38-.77.58-1.15v-.58c-9.96-2.41-19.6-3.5-31.69-3.46-5.98,3.34-13.23,4.62-18.44,7.49-.86,4.2-.46,9.74.58,13.25,10.57,6.48,25.42,4.81,38.61,9.8,4.62,2.87,2.93,9.31,1.73,13.83-14.41,7.7-25.88-.45-40.34-2.88-.19.38-.38.77-.58,1.15v.58c9.77,10.12,48.92,15.17,54.17-2.3,6.34-21.14-29.19-19.16-41.49-21.9Zm-127.35-16.13c-1.18,9.96-3.62,35.15.58,45.52v1.15c3.07-.19,6.15-.38,9.22-.58,3.82-4.31.45-31.5,2.3-39.18,8.01-1.54,15.73.43,23.05,0,.19-.38.38-.77.58-1.15-6.4-7.07-18.32-6.06-27.66-8.07-2.69.77-5.38,1.54-8.07,2.3ZM27.66,190.16c-.19-.38-.38-.77-.58-1.15h-1.73c-3.65,3.23-7.11,3.72-9.8,8.07h-2.3c-3.08-2.97-3.83-4.73-10.37-4.61-.19.19-.38.38-.58.58,2.11,3.46,4.23,6.92,6.34,10.37C5.76,206.48,2.88,209.55,0,212.63c.38.77.77,1.54,1.15,2.3,1.73-.19,3.46-.38,5.19-.58,1.92-2.3,3.84-4.61,5.76-6.91,3.46,3.07,6.92,6.15,10.37,9.22,2.88-.77,5.76-1.54,8.64-2.3-4.42-3.84-8.84-7.68-13.25-11.52,1.12-5.42,6.41-9.28,9.8-12.68Zm32.27,2.3l1.73,1.73c-1.37,2.41-2.2,2.9-2.3,6.91-2.11.96-4.23,1.92-6.34,2.88-2.69-.19-5.38-.38-8.07-.58v-10.37c-2.11-.77-4.23-1.54-6.34-2.3-3.54,5.76-3.4,16.63-2.88,24.2,3.07.77,6.15,1.54,9.22,2.3,2.09-2.66.85-6.46.58-9.8.38-.19.77-.38,1.15-.58,2.88.19,5.76.38,8.64.58.77,2.3,1.54,4.61,2.3,6.91,2.69.19,5.38.38,8.07.58,1.34-7.68,2.69-15.37,4.03-23.05-3.75-1.8-6.13-.39-9.8.58Zm32.27-1.73c-1.54.58-3.07,1.15-4.61,1.73,0,0-.94,17.49-.58,23.05,7.82,2.85,29.83-1.17,31.69-9.22,2.54-10.99-16.53-15.83-26.51-15.56Zm16.13,19.02c-3.56,1.58-6.32,2.48-12.1,2.3-.38-6.15-.77-12.29-1.15-18.44,10.83.01,14.86,6.8,13.25,16.13Zm-36.3.58c-.38.77-.77,1.54-1.15,2.3v.58c2.3,1.15,4.61,2.3,6.91,3.46h1.73v-1.73c-1.85-2.57-3.31-4.24-7.49-4.61Zm50.13.58c-.38.96-.77,1.92-1.15,2.88,2.3,1.15,4.61,2.3,6.91,3.46h.58c.96-4.04-1.56-6.29-6.34-6.34Z"
        fill="black"
      />
    </Svg>
  );
};

// const thorInvoice = (
//   <Document>
//     <Page size="A4" style={stylesThor.page}>
//       <View style={stylesThor.image}>
//         {selectedLogoComponent}
//       </View>
//       <View style={stylesThor.belowLogo}>
//         <View
//           style={{ flexDirection: 'column', paddingRight: 15 }}
//         >
//           <View>
//             <Text style={{ fontSize: 11 }}>
//               Продавач ТХОР ИНДУСТРИЕС ДООЕЛ СКОПЈЕ
//             </Text>
//           </View>
//           <View style={stylesThor.information}>
//             <Text style={{ fontSize: 9 }}>
//               Ул. Филип Втори Македонски бр. 3/11 Скопје
//             </Text>
//           </View>
//           <View
//             style={{
//               width: '70%',
//               alignItems: 'center',
//             }}
//           >
//             <Text style={{ fontSize: 9 }}>300000004558842</Text>
//           </View>
//           <View>
//             <Text style={{ fontSize: 12 }}>
//               MK4080020593677
//             </Text>
//           </View>
//           <View>
//             <Text
//               style={{
//                 fontSize: 23,
//                 letterSpacing: -1,
//                 paddingLeft: 15,
//               }}
//             >
//               Фактура бр. 01/2023
//             </Text>
//           </View>
//         </View>
//         <View style={stylesThor.buyerRight}>
//           <Text style={{ fontSize: 14 }}>Купувач </Text>
//           <Text style={{ fontSize: 18 }}>Ас Сењак Дооел</Text>
//           <Text style={{ fontSize: 11 }}>Kичево</Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               paddingTop: 10,
//             }}
//           >
//             <Text style={stylesThor.data}>Data:</Text>
//             <Text style={stylesThor.data}>13/07/2023</Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}
//           >
//             <Text style={stylesThor.data}>Data:</Text>
//             <Text style={stylesThor.data}>13/07/2023</Text>
//           </View>
//         </View>
//       </View>
//       <View>
//         <View style={stylesThor.table}>
//           {/* Header row */}
//           <View style={stylesThor.tableRow}>
//             {tableData[0].map((header, index) => (
//               <View style={stylesThor.tableCell} key={index}>
//                 <Text style={stylesThor.tableCellText}>
//                   {header}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* Data rows */}
//           {tableData.slice(1).map((row, rowIndex) => (
//             <View style={stylesThor.tableRow} key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <View
//                   style={stylesThor.tableCell}
//                   key={cellIndex}
//                 >
//                   <Text style={stylesThor.tableCellText}>
//                     {cell}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </View>
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           height: 'auto',
//           alignItems: 'flex-end',
//         }}
//       >
//         <View
//           style={{
//             borderWidth: 1,
//             borderColor: '#000000',
//             padding: 1,
//             flex: 'auto',
//             width: '70%',
//           }}
//         >
//           <View
//             style={{
//               borderColor: '#000',
//               borderWidth: 1,
//               borderStyle: 'solid',
//               height: 'auto',
//             }}
//           >
//             <View style={stylesThor.tableRow}>
//               <View
//                 style={{
//                   flex: 1,
//                 }}
//               >
//                 <Text style={stylesThor.tableCellText}>
//                   Пренесување на даночна обврска согласно член
//                   32-а од законот за ДДВ
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={[stylesThor.tableRow, { borderTop: 1 }]}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   alignItems: 'flex-end',
//                 }}
//               >
//                 <Text style={stylesThor.tableCellText}>
//                   120000
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 35,
//           paddingHorizontal: 35,
//         }}
//       >
//         <View>
//           <Text style={{ fontSize: 12 }}>Примил</Text>
//         </View>
//         <View>
//           <Text style={{ fontSize: 12 }}>Директор</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const everestInvoice = (
//   <Document>
//     <Page size="A4" style={stylesEverest.page}>
//       <View style={stylesEverest.header}>
//         <View>
//           <EverestLogo />
//         </View>
//         <View style={stylesEverest.headerRight}>
//           <Text style={{ fontSize: 12 }}>
//             {`Fortis Energetika I \ngradeznistvo Dooel \nSkopje ul.Partenij \nZografski Br.23 Skopje \nCentar`}
//             ,
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 20,
//         }}
//       >
//         <View>
//           <Text>service@everestxhd.com</Text>
//           <Text style={{ fontSize: 14 }}>
//             <Text style={{ fontSize: 16 }}>Nr. Tat.</Text>
//             /Данач.бр.{' '}
//             <Text style={{ fontSize: 16 }}>
//               MK4028005149980
//             </Text>
//           </Text>
//           <Text style={{ fontSize: 14 }}>
//             <Text style={{ fontSize: 16 }}>Zhiro Llog.</Text>/Ж.
//             Сметка{' '}
//             <Text style={{ fontSize: 16 }}>
//               380176960411108
//             </Text>
//           </Text>
//         </View>
//         <View style={{ alignItems: 'flex-end' }}>
//           <Text style={{ borderBottom: 1 }}>Faktura</Text>
//           <Text style={{ fontSize: 13 }}>Фактура</Text>
//           <Text>
//             бр. <Text style={{ fontSize: 20 }}>#08</Text>
//           </Text>
//           <Text>
//             За месец <Text style={{ fontSize: 20 }}>05</Text>
//           </Text>
//         </View>
//       </View>
//       <View>
//         <View style={stylesEverest.table}>
//           {/* Header row */}
//           <View style={stylesEverest.tableRow}>
//             {tableData2[0].map((header, index) => (
//               <View
//                 style={
//                   index === 1
//                     ? {
//                         ...stylesEverest.tableCell,
//                       }
//                     : stylesEverest.tableCell
//                 }
//                 key={index}
//               >
//                 <Text style={stylesEverest.tableCellText}>
//                   {header}
//                 </Text>
//               </View>
//             ))}
//           </View>
//           {tableData2.slice(1).map((row, rowIndex) => (
//             <View style={stylesEverest.tableRow} key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <View
//                   style={
//                     cellIndex === 0 &&
//                     rowIndex === tableData2.length - 2
//                       ? stylesEverest.tableCellLastRowFirstCell // Apply the new style
//                       : stylesEverest.tableCell
//                   }
//                   key={cellIndex}
//                 >
//                   <Text style={stylesEverest.tableCellText}>
//                     {cell}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </View>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 25,
//         }}
//       >
//         <View>
//           <View
//             style={{ marginBottom: 40, paddingHorizontal: 20 }}
//           >
//             <Text style={{ fontSize: 10 }}>Data/Датум</Text>
//           </View>
//           <View style={{ borderBottom: 1 }}></View>
//         </View>
//         <View>
//           <View
//             style={{ marginBottom: 40, paddingHorizontal: 20 }}
//           >
//             <Text style={{ fontSize: 10 }}>Pranon/Примил</Text>
//           </View>
//           <View style={{ borderBottom: 1 }}></View>
//         </View>
//         <View>
//           <View
//             style={{ marginBottom: 40, paddingHorizontal: 20 }}
//           >
//             <Text style={{ fontSize: 10 }}>
//               Drejtor/Управител
//             </Text>
//           </View>
//           <View style={{ borderBottom: 1 }}></View>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const albArchitectInvoice = (
//   <Document>
//     <Page size="A4">
//       <View style={stylesAlbArchitect.page}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}
//         >
//           <View>
//             <SoraviaLogo />
//           </View>
//           <View>
//             <Text style={{ fontSize: 12 }}>
//               СОРАВИА ИНВЕСТ ДООЕЛ Скопје
//             </Text>
//             <Text style={{ fontSize: 12 }}>
//               Адреса: Филип Втори Македонски бр.3
//             </Text>
//             <Text style={{ fontSize: 12 }}>
//               тел.: +38923290167
//             </Text>
//             <View style={{ marginTop: 15 }}>
//               <Text style={{ fontSize: 10 }}>
//                 ЕДБ: 4030006580760
//               </Text>
//               <Text style={{ fontSize: 10 }}>
//                 ЕДБ за ДДВ: MK4430009100961
//               </Text>
//               <Text style={{ fontSize: 10 }}>
//                 Жиро сметка МКД: 240-0801051903-17
//               </Text>
//               <Text style={{ fontSize: 10 }}>
//                 IBAN: MK07240080105190317
//               </Text>
//               <Text style={{ fontSize: 10 }}>
//                 SWIFT: UIBMMK22
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 25 }}>
//           <View
//             style={{
//               borderBottom: 1,
//               width: '50%',
//             }}
//           >
//             <Text style={{ fontSize: 8 }}>Купувач:</Text>
//           </View>
//           <View style={{ borderBottom: 1, width: '50%' }}>
//             <Text style={{ fontSize: 8 }}>Примател:</Text>
//           </View>
//         </View>
//         <View style={{ marginTop: 70, gap: 15 }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'flex-end',
//             }}
//           >
//             <Text style={{ fontSize: 9 }}>
//               Дат. на издавање
//             </Text>
//             <Text style={{ fontSize: 12, marginLeft: 10 }}>
//               01.09.2023
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'flex-end',
//             }}
//           >
//             <Text style={{ fontSize: 9 }}>Датум на валута</Text>
//             <Text style={{ fontSize: 12, marginLeft: 10 }}>
//               09.09.2023
//             </Text>
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//           }}
//         >
//           <View
//             style={{
//               marginTop: 5,
//               width: 'auto',
//               flexDirection: 'row',
//               flex: 'auto',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Text style={{ borderBottom: 8 }}>
//               <Text
//                 style={{
//                   fontWeight: 'heavy',
//                   fontFamily: 'Roboto',
//                 }}
//               >
//                 Фактура
//               </Text>{' '}
//               23-309-00017
//             </Text>
//             <Text
//               style={{
//                 borderBottom: 1,
//                 borderColor: 'black',
//                 flex: 1,
//               }}
//             >
//               {' '}
//             </Text>
//           </View>
//         </View>
//         <View style={{ marginTop: '10' }}>
//           <View>
//             <View style={stylesAlbArchitect.table}>
//               {/* Header row */}
//               <View style={stylesEverest.tableRow}>
//                 {tableData3[0].map((header, index) => (
//                   <View
//                     style={
//                       index === 0 // Apply the new style to the first column
//                         ? {
//                             ...stylesAlbArchitect.tableHeaderCellNaziv,
//                             backgroundColor: '#cfcfcf',
//                           }
//                         : stylesAlbArchitect.tableCell
//                     }
//                     key={index}
//                   >
//                     <Text
//                       style={stylesAlbArchitect.tableCellText}
//                     >
//                       {header}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//               {tableData3.slice(1).map((row, rowIndex) => (
//                 <View
//                   style={{ flexDirection: 'row' }}
//                   key={rowIndex}
//                 >
//                   {row.map((cell, cellIndex) => (
//                     <View
//                       style={
//                         cellIndex === 0
//                           ? {
//                               ...stylesAlbArchitect.tableCellNaziv,
//                             }
//                           : stylesAlbArchitect.tableCellWBorder
//                       }
//                       key={cellIndex}
//                     >
//                       <Text
//                         style={
//                           cellIndex === 0
//                             ? {
//                                 ...stylesAlbArchitect.tableRowNazivCellText,
//                               }
//                             : stylesAlbArchitect.tableRowCellText
//                         }
//                       >
//                         {cell}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//         <View style={{ borderTop: 1.5 }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}
//           >
//             <View style={{ flexDirection: 'row' }}>
//               <Text style={{ fontSize: 10 }}>ДБ:</Text>
//               <Text style={{ marginLeft: 55, fontSize: 10 }}>
//                 MK4080020593677
//               </Text>
//             </View>

//             <View style={{ flexDirection: 'row' }}>
//               <Text style={{ fontSize: 10 }}>Вкупно</Text>
//               <Text style={{ marginLeft: 85, fontSize: 10 }}>
//                 1000000
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginTop: 10,
//             }}
//           >
//             <View style={{ flexDirection: 'row' }}>
//               <Text style={{ fontSize: 10 }}>
//                 Со зборови девет илјади четиристотини триесет и
//                 девет EUR 05/100
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '29%',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Text style={{ fontSize: 10 }}>ДДВ</Text>
//               <Text style={{ marginLeft: 85, fontSize: 10 }}>
//                 18%
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginTop: 10,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '71%',
//               }}
//             ></View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '29%',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Text style={{ fontSize: 10 }}>За плаќање</Text>
//               <Text style={{ fontSize: 10 }}>МКД</Text>
//               <Text style={{ fontSize: 10 }}>1880000</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const tableData = [
//   [
//     'Ред бр.',
//     'Опис',
//     'Единица мера',
//     'Количина',
//     'Единица цена \nБез ДДВ',
//     'Вкупно \nБез ДДВ',
//   ],
//   [
//     input1,
//     'Row 1, Cell 2',
//     'Row 1, Cell 3',
//     'Row 1, Cell 4',
//     'Row 1, Cell 5',
//     'Row 1, Cell 6',
//   ],
//   [
//     input2,
//     'Row 2, Cell 2',
//     'Row 2, Cell 3',
//     'Row 2, Cell 4',
//     'Row 2, Cell 5',
//     input3,
//   ],
//   // Add more rows here
// ];

// const tableData2 = [
//   [
//     'Nr. Бр.',
//     'Pozicioni/Позици',
//     'Masa\nМера',
//     'Sasia\nКолич',
//     'Çmimi\nЦена',
//     'Totali/Вкупно',
//   ],
//   [
//     input1,
//     'Row 1, Cell 2',
//     'Row 1, Cell 3',
//     'Row 1, Cell 4',
//     'Row 1, Cell 5',
//     'Row 1, Cell 6',
//   ],
//   [
//     input2,
//     'Row 2, Cell 2',
//     'Row 2, Cell 3',
//     'Row 2, Cell 4',
//     'Row 2, Cell 5',
//     input3,
//   ],
//   ['', '', '', '', 'gjithsej/\nВкупно', input3],
//   ['', '', '', '', 'TVSH/ДДВ\n18%', input3],
//   ['Totali me TVSH/\nВкупно со ДДВ18%', input3],
//   // Add more rows here
// ];

// const tableData3 = [
//   ['Назив', 'Количина', 'ЕМ', 'Цена', 'ДДВ %', 'Вредност без ДДВ'],
//   [`Закупнина\n${input1}`, '440,00', 'm2', '100', '18,00', '82'],
//   [
//     `Сервисен Трошок\n${input2}`,
//     '440,00',
//     'm2',
//     '100',
//     '18,00',
//     '82',
//   ],
// ];

const SoraviaLogo = () => {
  return (
    <Svg
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 139.8 254.41"
      width="50"
    >
      <Defs>
        <LinearGradient
          id="myLinearGradient"
          x1="1.2"
          y1="0.15"
          x2="0.7"
          y2="1.1"
        >
          <Stop offset="0" stopColor="#cccccb" />
          <Stop offset="16%" stopColor="#e2e2e2" />
          <Stop offset="20%" stopColor="#dfdfdf" />
          <Stop offset="23%" stopColor="#d5d5d5" />
          <Stop offset="25%" stopColor="#c5c5c5" />
          <Stop offset="27%" stopColor="#afaeaf" />
          <Stop offset="28%" stopColor="#a9a8a9" />
          <Stop offset="31%" stopColor="#a4a3a4" />
          <Stop offset="34%" stopColor="#969596" />
          <Stop offset="38%" stopColor="#7f7e7f" />
          <Stop offset="42%" stopColor="#5f5e5f" />
          <Stop offset="46%" stopColor="#353535" />
          <Stop offset="50%" stopColor="#030303" />
          <Stop offset="50%" stopColor="#000" />
          <Stop offset="51%" stopColor="#181818" />
          <Stop offset="55%" stopColor="#666667" />
          <Stop offset="59%" stopColor="#a5a5a6" />
          <Stop offset="62%" stopColor="#d2d2d3" />
          <Stop offset="64%" stopColor="#eeeeef" />
          <Stop offset="65%" stopColor="#f9f9fa" />
          <Stop offset="75%" stopColor="#f6f6f7" />
          <Stop offset="81%" stopColor="#eeeeef" />
          <Stop offset="86%" stopColor="#e1e1e1" />
          <Stop offset="89%" stopColor="#d2d2d1" />
          <Stop offset="91%" stopColor="#b5b5b4" />
          <Stop offset="95%" stopColor="#6c6c6c" />
          <Stop offset="100%" stopColor="#000" />
        </LinearGradient>
        <LinearGradient
          id="linear-gradient"
          x1="1"
          y1="1"
          x2="0.7"
          y2="0.7"
        >
          <Stop offset="0" stopColor="#414042" stopOpacity="0" />
          <Stop offset=".52" stopColor="#3f3e40" stopOpacity=".05" />
          <Stop offset=".7" stopColor="#393739" stopOpacity=".25" />
          <Stop offset=".84" stopColor="#2f2c2e" stopOpacity=".58" />
          <Stop offset=".93" stopColor="#231f20" />
        </LinearGradient>
      </Defs>
      <G
        fill="url('#myLinearGradient')"
        fillRule="evenodd"
        stroke="url('#linear-gradient')"
        strokeWidth={0.2}
      >
        <Path d="m45.97,146.41c-1.77-1.27-.5-6.46.09-8,2.44-6.4,8.7-10.01,14.49-12.96,7.8-3.96,15.7-7.71,23.58-11.52,1.34-.65,2.67-1.3,4.01-1.95,4.11-2.01,8.41-3.68,12.32-6.08,3.87-2.37,8.96-6.41,8.56-11.45-.29-3.64-2.71-6.92-5.3-9.33-4.25-3.94-9.82-5.96-15.13-8.04-6.32-2.48-12.74-4.7-18.98-7.37-9.32-4-23.48-10.61-22.38-22.88,1.44-16.13,18.21-18.85,29.38-26.08.87-.56,1.76-1.22,2.11-2.2.38-1.05.06-2.21-.29-3.27-1.13-3.43-4.01-15.03-8.6-15.17-1.4-.04-2.71.6-3.96,1.22-12.77,6.37-26.85,12.68-33.58,26.15-6.85,13.7-2.26,29.57,10.71,37.63,14.48,9,32.46,9.42,47.23,17.69.61.34,1.26.75,1.51,1.4.46,1.18-.59,2.38-1.56,3.19-13.11,10.88-30.65,14.67-45.23,23.49-6.13,3.71-12.22,9.24-12.48,16.4-.3,8.15,6.89,14.39,13.52,19.14Z" />
      </G>
      <G>
        <Path
          d="m1.79,190.84c.24,1.05.56,1.88.97,2.48.4.61.93,1.06,1.57,1.35.64.29,1.47.44,2.48.44,1.39,0,2.46-.36,3.21-1.09.74-.73,1.12-1.79,1.12-3.18,0-.89-.16-1.64-.46-2.25s-.82-1.18-1.52-1.72c-.7-.54-1.78-1.16-3.22-1.88-1.39-.69-2.5-1.37-3.31-2.03s-1.41-1.38-1.81-2.15c-.4-.77-.6-1.62-.6-2.54,0-1.33.31-2.49.94-3.47.62-.98,1.54-1.74,2.75-2.28,1.21-.54,2.59-.8,4.15-.8.9,0,1.79.05,2.65.14.86.1,1.94.31,3.24.64v4.82h-1.77c-.27-1.05-.62-1.86-1.04-2.45-.42-.58-.91-.99-1.46-1.22-.56-.23-1.29-.35-2.18-.35-.77,0-1.47.14-2.08.43-.61.29-1.1.72-1.46,1.29-.36.58-.54,1.27-.54,2.06,0,.85.15,1.56.46,2.14s.78,1.13,1.42,1.62c.64.5,1.6,1.06,2.86,1.68,1.52.76,2.71,1.47,3.55,2.13s1.49,1.4,1.97,2.24c.47.84.71,1.82.71,2.94,0,1.25-.2,2.31-.59,3.17s-.94,1.57-1.63,2.11-1.53.93-2.5,1.18c-.97.24-2.03.37-3.19.37-1.87,0-4.03-.32-6.47-.95v-4.9h1.79Z"
          fill="#231f20"
        />
        <Path
          d="m27.83,196.68c-1.43,0-2.73-.24-3.9-.71-1.17-.47-2.18-1.2-3.02-2.2s-1.49-2.26-1.95-3.81c-.46-1.55-.69-3.4-.69-5.56,0-2.65.4-4.94,1.21-6.84s1.97-3.36,3.47-4.35,3.25-1.49,5.24-1.49c2.12,0,3.9.47,5.35,1.4s2.54,2.31,3.27,4.13c.73,1.82,1.1,4.03,1.1,6.64,0,2.79-.42,5.14-1.25,7.06-.83,1.92-2.01,3.35-3.53,4.31-1.52.95-3.29,1.43-5.31,1.43Zm-5.88-12.77c0,3.66.53,6.44,1.6,8.34,1.07,1.91,2.62,2.86,4.67,2.86,1.3,0,2.4-.41,3.31-1.24.9-.83,1.58-2.04,2.04-3.63s.68-3.46.68-5.59c0-2.6-.27-4.75-.8-6.46-.53-1.71-1.25-2.95-2.17-3.72s-1.98-1.16-3.2-1.16c-1.07,0-1.99.25-2.76.75-.77.5-1.41,1.21-1.91,2.14-.51.92-.88,2.04-1.11,3.35-.23,1.31-.35,2.77-.35,4.38Z"
          fill="#231f20"
        />
        <Path
          d="m47.66,185.8v6.07c0,.86.03,1.48.1,1.87.07.39.16.68.3.87.13.2.31.36.54.48s.61.27,1.16.42v.87h-7.54v-.87c.74-.19,1.23-.4,1.48-.64.25-.23.41-.56.49-.99s.12-1.08.12-1.97v-15.45c0-.82-.03-1.42-.09-1.8-.06-.38-.16-.67-.29-.87-.14-.21-.32-.38-.54-.5-.23-.12-.61-.26-1.16-.42v-.88h8.84c2.79,0,4.87.51,6.25,1.52s2.07,2.58,2.07,4.72c0,1.63-.45,3.02-1.35,4.16-.9,1.14-2.25,2.04-4.05,2.68v.14c.73.3,1.35.72,1.87,1.28.52.55,1.09,1.41,1.72,2.58l1.61,2.93c.46.86.86,1.51,1.2,1.96.33.45.67.8,1.02,1.04.35.24.8.41,1.38.5v.87h-4.95c-.45-.63-.88-1.31-1.29-2.04-.4-.73-.8-1.46-1.2-2.21l-1.57-2.98c-.48-.91-.87-1.57-1.17-2-.3-.43-.58-.73-.84-.9s-.53-.29-.82-.36c-.29-.06-.73-.1-1.31-.1h-1.97Zm0-12.15v10.61h2.02c1.04,0,1.88-.07,2.52-.22.64-.15,1.24-.43,1.79-.85.55-.42.99-1,1.31-1.74.33-.74.49-1.66.49-2.74s-.19-2.07-.58-2.82-.97-1.32-1.76-1.72c-.79-.39-1.85-.59-3.18-.59-1.07,0-1.94.02-2.61.07Z"
          fill="#231f20"
        />
        <Path
          d="m77,196.39v-.87c.59-.12,1.04-.25,1.33-.39.29-.14.51-.34.65-.6.14-.26.21-.6.21-1.03,0-.41-.05-.84-.14-1.31-.09-.47-.23-1-.41-1.58l-.66-2.31h-8.33l-.61,1.75c-.31.88-.51,1.55-.61,2-.09.45-.14.86-.14,1.23,0,.71.18,1.24.54,1.57s.92.55,1.67.66v.87h-7.63v-.87c.67-.11,1.25-.49,1.74-1.16.49-.67.97-1.62,1.44-2.86l7.45-19.77h2.82l6.08,19.92c.28.93.54,1.64.76,2.13s.48.87.8,1.14c.31.27.73.48,1.27.61v.87h-8.24Zm-6.86-9.65h7.47l-3.39-11.52-4.07,11.52Z"
          fill="#231f20"
        />
        <Path
          d="m91.88,172.01v.88c-.55.1-.97.21-1.25.36-.28.14-.5.35-.64.61-.14.26-.22.61-.22,1.05,0,.41.05.84.14,1.31s.23,1,.41,1.58l4.18,14.58,5.13-14.69c.07-.23.14-.46.21-.71.07-.25.13-.49.19-.73.05-.24.09-.45.11-.63.02-.18.03-.34.03-.5,0-.71-.16-1.24-.49-1.56s-.88-.55-1.67-.67v-.88h7.5v.88c-.49.12-.88.29-1.18.52s-.59.59-.88,1.09c-.29.5-.65,1.3-1.06,2.39l-7.41,19.79h-2.34l-6.02-19.92c-.32-1.08-.6-1.86-.84-2.31-.24-.46-.5-.81-.79-1.04-.28-.23-.68-.41-1.18-.53v-.88h8.08Z"
          fill="#231f20"
        />
        <Path
          d="m113.1,191.93c0,.8.03,1.38.08,1.75.05.37.14.66.27.88.12.21.31.39.55.54.24.14.64.29,1.19.43v.87h-7.54v-.87c.74-.19,1.23-.4,1.48-.64.25-.23.41-.56.49-.99s.12-1.08.12-1.97v-15.45c0-.82-.03-1.42-.09-1.8-.06-.38-.16-.67-.3-.87-.14-.21-.32-.38-.54-.5-.23-.12-.61-.26-1.16-.42v-.88h7.54v.88c-.52.13-.9.26-1.13.39-.23.13-.42.29-.55.49-.14.2-.24.49-.3.88-.06.39-.1,1-.1,1.82v15.45Z"
          fill="#231f20"
        />
        <Path
          d="m131.57,196.39v-.87c.59-.12,1.04-.25,1.33-.39.29-.14.51-.34.65-.6.14-.26.21-.6.21-1.03,0-.41-.05-.84-.14-1.31s-.23-1-.41-1.58l-.66-2.31h-8.33l-.61,1.75c-.31.88-.51,1.55-.61,2s-.14.86-.14,1.23c0,.71.18,1.24.54,1.57.36.33.92.55,1.67.66v.87h-7.63v-.87c.67-.11,1.25-.49,1.74-1.16.49-.67.97-1.62,1.44-2.86l7.45-19.77h2.82l6.07,19.92c.29.93.54,1.64.76,2.13s.48.87.8,1.14c.31.27.73.48,1.27.61v.87h-8.24Zm-6.86-9.65h7.47l-3.39-11.52-4.07,11.52Z"
          fill="#231f20"
        />
      </G>
      <G>
        <Path
          d="m9.52,224.35c0,.43.01.75.04.95s.08.36.15.48.17.21.3.29.35.16.65.23v.48h-4.09v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h4.09v.48c-.28.07-.49.14-.62.21s-.23.16-.3.27-.13.27-.16.48-.05.54-.05.99v8.39Z"
          fill="#53342d;"
        />
        <Path
          d="m22.26,221.53c.23.39.43.73.59,1.02s.32.62.49.98h.13c-.03-.39-.06-1.18-.09-2.35s-.04-2.23-.04-3.18v-2.04c0-.45-.01-.77-.04-.98s-.07-.37-.14-.48-.16-.2-.28-.27-.33-.14-.63-.23v-.48h3.49v.48c-.29.08-.5.15-.62.21s-.22.15-.29.25-.13.26-.17.47-.06.55-.06,1.02v10.87h-1.21l-5.4-9.06c-.34-.56-.58-.97-.72-1.23s-.27-.51-.4-.77h-.16c.05.5.08,1.4.1,2.7s.03,2.6.03,3.89v1.98c0,.43.01.75.04.95s.08.36.15.48.17.21.3.29.35.16.65.23v.48h-3.54v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h3.04l4.79,7.99Z"
          fill="#53342d;"
        />
        <Path
          d="m32.89,213.53v.48c-.3.05-.52.12-.68.19s-.27.19-.35.33-.12.33-.12.57c0,.22.03.46.08.71s.13.54.22.86l2.27,7.91,2.78-7.97c.04-.12.08-.25.12-.39s.07-.27.1-.4.05-.24.06-.34.01-.19.01-.27c0-.39-.09-.67-.27-.85s-.48-.3-.91-.36v-.48h4.07v.48c-.27.06-.48.16-.64.28s-.32.32-.48.59-.35.7-.58,1.3l-4.03,10.75h-1.27l-3.27-10.82c-.17-.59-.33-1.01-.46-1.26s-.27-.44-.43-.56-.37-.22-.64-.29v-.48h4.38Z"
          fill="#53342d;"
        />
        <Path
          d="m51.99,213.53v2.93h-.95c-.1-.32-.2-.59-.3-.83s-.21-.44-.32-.6-.23-.29-.36-.39-.29-.16-.47-.2-.4-.05-.65-.05h-3.07v5.08h2.08c.28,0,.51-.04.67-.12s.3-.22.4-.41.21-.5.31-.91h.91v3.72h-.91c-.09-.39-.19-.68-.3-.88s-.24-.34-.39-.42-.38-.13-.68-.13h-2.08v5.6h3.02c.32,0,.57-.03.77-.08s.37-.15.51-.28.27-.31.38-.52.2-.43.28-.66.18-.56.31-1h.96l-.18,3.4h-8.98v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h9.07Z"
          fill="#53342d;"
        />
        <Path
          d="m56.7,223.76c.13.57.3,1.02.52,1.35s.5.57.85.73.8.24,1.35.24c.76,0,1.34-.2,1.74-.59s.61-.97.61-1.73c0-.48-.08-.89-.25-1.22s-.44-.64-.82-.93-.96-.63-1.75-1.02c-.76-.38-1.35-.74-1.79-1.1s-.77-.75-.98-1.17-.32-.88-.32-1.38c0-.72.17-1.35.51-1.89s.84-.95,1.49-1.24,1.41-.44,2.26-.44c.49,0,.97.03,1.44.08s1.06.17,1.76.35v2.62h-.96c-.15-.57-.34-1.01-.56-1.33s-.49-.54-.8-.66-.7-.19-1.18-.19c-.42,0-.8.08-1.13.23s-.6.39-.79.7-.29.69-.29,1.12c0,.46.08.85.25,1.16s.42.61.77.88.87.58,1.55.91c.83.41,1.47.8,1.93,1.15s.81.76,1.07,1.22.38.99.38,1.6c0,.68-.11,1.25-.32,1.72s-.51.85-.89,1.14-.83.51-1.36.64-1.1.2-1.73.2c-1.02,0-2.19-.17-3.51-.51v-2.66h.97Z"
          fill="#53342d;"
        />
        <Path
          d="m66.37,213.53h10.5v3.38h-.95c-.14-.56-.28-1-.42-1.32s-.29-.57-.44-.74-.32-.29-.5-.36-.44-.11-.8-.11h-1.23v9.93c0,.38.02.69.06.91s.11.41.19.54.21.24.35.31.38.15.7.22v.48h-4.43v-.48c.19-.05.37-.09.51-.15s.27-.11.36-.19.17-.17.23-.29.11-.27.15-.48.05-.49.05-.88v-9.93h-1.22c-.3,0-.55.03-.75.09s-.38.18-.55.36-.32.45-.46.79-.27.77-.39,1.29h-.96v-3.38Z"
          fill="#53342d;"
        />
        <Path
          d="m85.98,226.77v-.48c.3-.08.51-.15.64-.22s.23-.16.3-.27.12-.27.16-.48.05-.53.05-.98v-8.39c0-.45-.02-.78-.05-.98s-.09-.36-.16-.47-.17-.2-.3-.27-.34-.14-.64-.23v-.48h4.25c1.22,0,2.22.13,3,.4s1.44.66,1.97,1.19.94,1.18,1.2,1.95.4,1.71.4,2.79-.12,2.05-.37,2.89-.61,1.53-1.09,2.09c-.41.49-.92.9-1.52,1.21-.5.26-1.07.44-1.73.55s-1.52.16-2.6.16h-3.51Zm2.96-.9c.26.03.64.04,1.14.04.54,0,1.03-.05,1.45-.14s.81-.23,1.16-.43.66-.46.94-.81.5-.74.68-1.19.3-.95.38-1.5.12-1.15.12-1.8c0-1.31-.19-2.39-.57-3.23s-.91-1.46-1.6-1.85-1.51-.58-2.47-.58c-.44,0-.86.01-1.25.04v11.46Z"
          fill="#53342d;"
        />
        <Path
          d="m105.78,226.93c-.78,0-1.48-.13-2.12-.38s-1.18-.65-1.64-1.19-.81-1.23-1.06-2.07-.37-1.85-.37-3.02c0-1.44.22-2.68.66-3.72s1.07-1.82,1.89-2.36,1.77-.81,2.85-.81c1.15,0,2.12.25,2.91.76s1.38,1.25,1.78,2.24.6,2.19.6,3.6c0,1.51-.23,2.79-.68,3.83s-1.09,1.82-1.92,2.34-1.79.78-2.89.78Zm-3.19-6.94c0,1.99.29,3.5.87,4.53s1.42,1.55,2.54,1.55c.7,0,1.3-.22,1.79-.67s.86-1.11,1.11-1.97.37-1.88.37-3.04c0-1.41-.14-2.58-.43-3.51s-.68-1.6-1.18-2.02-1.08-.63-1.74-.63c-.58,0-1.08.14-1.5.41s-.76.66-1.04,1.16-.48,1.11-.6,1.82-.19,1.5-.19,2.38Z"
          fill="#53342d;"
        />
        <Path
          d="m120.23,226.93c-.78,0-1.48-.13-2.12-.38s-1.18-.65-1.64-1.19-.81-1.23-1.06-2.07-.37-1.85-.37-3.02c0-1.44.22-2.68.66-3.72s1.07-1.82,1.89-2.36,1.77-.81,2.85-.81c1.15,0,2.12.25,2.91.76s1.38,1.25,1.78,2.24.6,2.19.6,3.6c0,1.51-.23,2.79-.68,3.83s-1.09,1.82-1.92,2.34-1.79.78-2.89.78Zm-3.19-6.94c0,1.99.29,3.5.87,4.53s1.42,1.55,2.54,1.55c.7,0,1.3-.22,1.79-.67s.86-1.11,1.11-1.97.37-1.88.37-3.04c0-1.41-.14-2.58-.43-3.51s-.68-1.6-1.18-2.02-1.08-.63-1.74-.63c-.58,0-1.08.14-1.5.41s-.76.66-1.04,1.16-.48,1.11-.6,1.82-.19,1.5-.19,2.38Z"
          fill="#53342d;"
        />
        <Path
          d="m32.88,247.6c.13.57.3,1.02.52,1.35s.5.57.85.73.8.24,1.35.24c.76,0,1.34-.2,1.74-.59s.61-.97.61-1.73c0-.48-.08-.89-.25-1.22s-.44-.64-.82-.93-.96-.63-1.75-1.02c-.76-.38-1.35-.74-1.79-1.1s-.77-.75-.98-1.17-.32-.88-.32-1.38c0-.72.17-1.35.51-1.89s.84-.95,1.49-1.24,1.41-.44,2.26-.44c.49,0,.97.03,1.44.08s1.06.17,1.76.35v2.62h-.96c-.15-.57-.34-1.01-.56-1.33s-.49-.54-.8-.66-.7-.19-1.18-.19c-.42,0-.8.08-1.13.23s-.6.39-.79.7-.29.69-.29,1.12c0,.46.08.85.25,1.16s.42.61.77.88.87.58,1.55.91c.83.41,1.47.8,1.93,1.15s.81.76,1.07,1.22.38.99.38,1.6c0,.68-.11,1.25-.32,1.72s-.51.85-.89,1.14-.83.51-1.36.64-1.1.2-1.73.2c-1.02,0-2.19-.17-3.51-.51v-2.66h.97Z"
          fill="#53342d;"
        />
        <Path
          d="m46.26,243.36h.29c.25,0,.47-.04.67-.12s.43-.22.68-.44.64-.61,1.15-1.19c.62-.69,1.04-1.19,1.27-1.5.28-.37.48-.68.57-.93.08-.19.12-.37.12-.54,0-.26-.07-.45-.22-.57s-.35-.19-.61-.22v-.48h4.23v.48c-.21.05-.41.12-.61.24s-.41.27-.62.47-.52.52-.93.97l-3.26,3.67,3.53,5.13c.38.54.67.92.88,1.14s.42.38.61.48.4.17.62.2v.48h-4.28v-.48c.24-.02.41-.06.52-.14s.16-.18.16-.32c0-.12-.04-.26-.11-.42s-.19-.36-.35-.6l-2.26-3.37c-.27-.4-.46-.67-.58-.8s-.26-.22-.4-.29-.33-.09-.57-.09h-.51v4.06c0,.43.01.75.04.95s.08.36.15.48.17.21.3.29.35.16.65.23v.48h-4.08v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h4.08v.48c-.28.07-.49.14-.62.21s-.23.16-.3.27-.13.27-.16.48-.05.54-.05.99v3.56Z"
          fill="#53342d;"
        />
        <Path
          d="m61.59,250.77c-.78,0-1.48-.13-2.12-.38s-1.18-.65-1.64-1.19-.81-1.23-1.06-2.07-.37-1.85-.37-3.02c0-1.44.22-2.68.66-3.72s1.07-1.82,1.89-2.36,1.77-.81,2.85-.81c1.15,0,2.12.25,2.91.76s1.38,1.25,1.78,2.24.6,2.19.6,3.6c0,1.51-.23,2.79-.68,3.83s-1.09,1.82-1.92,2.34-1.79.78-2.89.78Zm-3.19-6.94c0,1.99.29,3.5.87,4.53s1.42,1.55,2.54,1.55c.7,0,1.3-.22,1.79-.67s.86-1.11,1.11-1.97.37-1.88.37-3.04c0-1.41-.14-2.58-.43-3.51s-.68-1.6-1.18-2.02-1.08-.63-1.74-.63c-.58,0-1.08.14-1.5.41s-.76.66-1.04,1.16-.48,1.11-.6,1.82-.19,1.5-.19,2.38Z"
          fill="#53342d;"
        />
        <Path
          d="m73.82,248.16c0,.38.02.69.06.91s.11.41.19.54.21.24.35.31.38.15.7.22v.48h-4.26v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h4.81c1.51,0,2.64.29,3.38.87s1.11,1.46,1.11,2.64c0,.67-.12,1.28-.35,1.81s-.56.98-.99,1.32-.93.59-1.51.74-1.19.22-1.83.22c-.72,0-1.27-.01-1.67-.04v3.22Zm0-4.03h1.13c.73,0,1.33-.1,1.81-.29s.84-.51,1.09-.95.38-1.03.38-1.76c0-.56-.07-1.02-.22-1.39s-.35-.67-.62-.9-.57-.39-.94-.48-.76-.14-1.18-.14c-.64,0-1.12.01-1.45.04v5.87Z"
          fill="#53342d;"
        />
        <Path
          d="m86.4,249.95c0,.87-.1,1.58-.31,2.12s-.55,1-1.03,1.38-1.16.7-2.02.96l-.32-.85c.57-.22.97-.44,1.21-.66s.41-.5.5-.84.14-.79.14-1.36v-10.9c0-.56-.03-.95-.08-1.15s-.15-.37-.27-.48-.39-.22-.78-.32v-.48h4.09v.48c-.28.07-.49.14-.62.21s-.23.16-.3.27-.13.27-.16.48-.05.54-.05.99v10.16Z"
          fill="#53342d;"
        />
        <Path
          d="m100.25,237.37v2.93h-.95c-.1-.32-.2-.59-.3-.83s-.21-.44-.32-.6-.23-.29-.36-.39-.29-.16-.47-.2-.4-.05-.65-.05h-3.07v5.08h2.08c.28,0,.51-.04.67-.12s.3-.22.4-.41.21-.5.31-.91h.91v3.72h-.91c-.09-.39-.19-.68-.3-.88s-.24-.34-.39-.42-.38-.13-.68-.13h-2.08v5.6h3.02c.32,0,.57-.03.77-.08s.37-.15.51-.28.27-.31.38-.52.2-.43.28-.66.18-.56.31-1h.96l-.18,3.4h-8.98v-.48c.4-.1.67-.22.81-.34s.22-.31.27-.54.06-.59.06-1.07v-8.39c0-.45-.02-.77-.05-.97s-.09-.36-.16-.48-.17-.2-.3-.27-.33-.14-.63-.23v-.48h9.07Z"
          fill="#53342d;"
        />
      </G>
    </Svg>
  );
};
interface SelectedProduct {
  id: number;
  nrRendor: string;
  pozita: string;
  njesiaMatese: string;
  sasia: string;
  cmimiNjesisePaTVSH: number;
  cmimiPergjithshemPaTVSH: number;
  [key: string]: string | number;
}
const PDFRenderer = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(0); // Default to the first row
  const [selectedColumn, setSelectedColumn] = useState(0); // Default to the first column

  const predefinedProducts = [
    {
      id: 1,
      nrRendor: '',
      pozita: 'Unit 1',
      njesiaMatese: 'm3',
      sasia: 0,
      cmimiNjesisePaTVSH: 2000,
      cmimiPergjithshemPaTVSH: 0,
    },
    {
      id: 2,
      nrRendor: '',
      pozita: 'Unit 2',
      njesiaMatese: 'm3',
      sasia: 0,
      cmimiNjesisePaTVSH: 1500,
      cmimiPergjithshemPaTVSH: 0,
    },
    // Add more products as needed
  ];

  const [modifiednjesiaMateseValues, setModifiednjesiaMateseValues] =
    useState(predefinedProducts.map(() => ''));

  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProduct[]
  >([]);
  const [productIdCounter, setProductIdCounter] = useState(3);

  const generateProductId = () => {
    const newProductId = productIdCounter + 1;
    setProductIdCounter(newProductId); // Update the counter for the next ID.
    return newProductId;
  };

  const calculateTotalSum = () => {
    let totalSum = 0;
    selectedProducts.forEach((product) => {
      totalSum += parseFloat(
        String(product.cmimiNjesisePaTVSH * Number(product.sasia))
      );
    });
    return totalSum;
  };

  const addProductToPDF = (product: {
    nrRendor: string;
    pozita: string; // Ensure pozita is always a string
    njesiaMatese: string;
    sasia: string;
    cmimiNjesisePaTVSH: number;
    cmimiPergjithshemPaTVSH: number;
  }) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p.pozita === product.pozita
    );

    if (existingProductIndex !== -1) {
      // Product already exists, so enable editing the "Njësia matëse" field
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = {
        ...updatedProducts[existingProductIndex],
        ...product,
        cmimiPergjithshemPaTVSH:
          parseFloat(product.sasia) * product.cmimiNjesisePaTVSH,
      };

      setSelectedProducts(updatedProducts);
    } else {
      // Product doesn't exist, add it with the next available id value
      const newProduct = {
        id: generateProductId(),
        ...product,
        nrRendor: (selectedProducts.length + 1).toString(),
        cmimiPergjithshemPaTVSH:
          parseFloat(product.sasia) * product.cmimiNjesisePaTVSH,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }

    // Clear the modifiednjesiaMatese state for the added product
    const newModifiednjesiaMateseValues = [
      ...modifiednjesiaMateseValues,
    ];
    newModifiednjesiaMateseValues[existingProductIndex] = ''; // Clear the modifiednjesiaMatese value
    setModifiednjesiaMateseValues(newModifiednjesiaMateseValues);
  };

  const removeProductFromPDF = (productId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedProducts = prevSelectedProducts.filter(
        (product) => product.id !== productId
      );

      const renumberedProducts = updatedProducts.map(
        (product, index) => ({
          ...product,
          nrRendor: (index + 1).toString(),
        })
      );

      return renumberedProducts;
    });
  };

  const headers = [
    [
      'Nr. Rendor',
      'Të dhëna për pozitën',
      'Njësia matëse',
      'Sasia',
      'Çmimi njësisë pa TVSH',
      'Çmimi i përgjithshëm pa TVSH',
    ],
  ];

  // Transform the values into an array

  const [pdfData, setPdfData] = useState<React.ReactElement | null>(
    null
  );

  useEffect(() => {
    if (issueDate) {
      // Parse the issueDate to a Date object
      const issueDateObj = new Date(issueDate);

      // Calculate the dueDate by adding 15 days to issueDate
      issueDateObj.setDate(issueDateObj.getDate() + 15);

      // Set the dueDate state variable
      setDueDate(issueDateObj);
    }
  }, [issueDate]);

  const handleRowChange = (event: { target: { value: string } }) => {
    setSelectedRow(parseInt(event.target.value));
  };

  const handleColumnChange = (event: {
    target: { value: string };
  }) => {
    setSelectedColumn(parseInt(event.target.value));
  };

  const [selectedLogo, setSelectedLogo] = useState('1');

  const handleLogoChange = (event: { target: { value: any } }) => {
    const logoId = event.target.value;
    setSelectedLogo(logoId);
  };

  const generatePDF = () => {
    if (invoiceNumber || subject || issueDate || dueDate !== null) {
      // Create the PDF content
      const selectedLogoComponent =
        selectedLogo === '1' ? <ThorLogo /> : <EverestLogo />;

      const totalSum = calculateTotalSum();
      const formattedTotal = `${totalSum.toFixed(2)} ден.`;

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
                    Billed Company
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
                        {issueDate.toDateString()}
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
                    style={{
                      borderTop: 0.4,
                      borderBottom: 0.4,
                      marginTop: 15,
                    }}
                  >
                    {headers.map((row, rowIndex) => (
                      <View
                        style={generalStyle.tableRow}
                        key={rowIndex}
                      >
                        {row.map((header, cellIndex) => (
                          <View
                            style={
                              header === headers[0][3]
                                ? {
                                    ...generalStyle.tableCell,
                                    width: '10%',
                                  }
                                : header === headers[0][4] ||
                                  header === headers[0][5]
                                ? {
                                    ...generalStyle.tableCell,
                                    width: '20%',
                                    textAlign: 'right',
                                  }
                                : { ...generalStyle.tableCell }
                            }
                            key={cellIndex}
                          >
                            <Text
                              style={generalStyle.tableCellHeader}
                            >
                              {header}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>

                  <View
                    style={{
                      borderBottom: 0.4,
                      marginTop: 0,
                      paddingBottom: 10,
                    }}
                  >
                    {selectedProducts.map((product, rowIndex) => (
                      <View
                        style={generalStyle.tableRow}
                        key={rowIndex}
                      >
                        {Object.entries(product).map(
                          ([key, value], cellIndex) => {
                            if (key !== 'id') {
                              return (
                                <View
                                  style={
                                    key === 'sasia'
                                      ? {
                                          ...generalStyle.tableCell,
                                          width: '10%',
                                        }
                                      : key ===
                                          'cmimiNjesisePaTVSH' ||
                                        key ===
                                          'cmimiPergjithshemPaTVSH'
                                      ? {
                                          ...generalStyle.tableCell,
                                          width: '20%',
                                          textAlign: 'right',
                                          //paddingRight: '14px',
                                        }
                                      : { ...generalStyle.tableCell }
                                  }
                                  key={cellIndex}
                                >
                                  <Text
                                    style={generalStyle.tableCellRow}
                                    break
                                  >
                                    {typeof value === 'number'
                                      ? parseFloat(
                                          String(value)
                                        ).toLocaleString('en-US')
                                      : value}{' '}
                                    <Text
                                      style={
                                        generalStyle.tableCellRowLowerCase
                                      }
                                    >
                                      {key === 'cmimiNjesisePaTVSH' ||
                                      key ===
                                        'cmimiPergjithshemPaTVSH'
                                        ? 'ден.'
                                        : ''}
                                    </Text>
                                  </Text>

                                  {key === 'pozita' && (
                                    <Text
                                      style={
                                        generalStyle.tableCellItemDescription
                                      }
                                      break
                                    >
                                      {parseFloat(
                                        String(
                                          product.cmimiPergjithshemPaTVSH
                                        )
                                      ).toLocaleString('en-US')}
                                    </Text>
                                  )}
                                </View>
                              );
                            }
                            return null; // Exclude the 'id' property
                          }
                        )}
                      </View>
                    ))}
                  </View>

                  <View>
                    <View
                      style={[
                        generalStyle.tableRow,
                        {
                          justifyContent: 'flex-end',
                          alignItems: 'center',
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
                          <Text style={[generalStyle.tableCellRow]}>
                            {parseFloat(
                              formattedTotal
                            ).toLocaleString('en-US')}
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
                  }}
                >
                  Платете во рок од 15 дена од добивањето на оваа
                  фактура. / Ju lutemi që ta paguani faturën brenda 15
                  ditëve nga marrja e saj.
                </Text>
              </View>
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

  // Define a function to handle changes in the `selectedProducts` table.
  const handleSelectedProductChange = (
    index: number,
    field: string,
    value: string
  ) => {
    // Create a copy of the selectedProducts array.
    const updatedSelectedProducts = [...selectedProducts];

    // Ensure the product at the given index exists.
    if (updatedSelectedProducts[index]) {
      // Update the specific product's property based on the field.
      updatedSelectedProducts[index][field] = value;

      // Update the state with the modified array.
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="p-4">
          <div className="flex gap-2">
            <select onChange={handleLogoChange} value={selectedLogo}>
              <option value="1">Thor Invoice</option>
              <option value="2">Everest invoice</option>
            </select>

            <input
              type="text"
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Issue Date"
              value={issueDate.toDateString()}
              onChange={(e) => setIssueDate(new Date(e.target.value))}
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Due Date"
              value={dueDate.toDateString()}
              onChange={(e) => setDueDate(new Date(e.target.value))}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            Predefined Products
          </h2>
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Të dhëna për pozitën
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Sasia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Njësia matëse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Çmimi njësisë pa TVSH
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Çmimi i përgjithshëm pa TVSH
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {predefinedProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.pozita}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="text"
                        value={modifiednjesiaMateseValues[index]}
                        className="m-2 rounded-lg border-[1.5px] border-indigo-500 p-2 text-black"
                        onChange={(e) => {
                          const newModifiednjesiaMateseValues = [
                            ...modifiednjesiaMateseValues,
                          ];
                          newModifiednjesiaMateseValues[index] =
                            e.target.value;
                          setModifiednjesiaMateseValues(
                            newModifiednjesiaMateseValues
                          );
                        }}
                        placeholder="Sasia"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.njesiaMatese}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.cmimiNjesisePaTVSH}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.cmimiPergjithshemPaTVSH}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => {
                          const isNjesiaEmpty =
                            modifiednjesiaMateseValues[index] === '';
                          const isProductInSelected =
                            selectedProducts.some(
                              (p) => p.pozita === product.pozita
                            );
                          if (
                            !isNjesiaEmpty &&
                            !isProductInSelected
                          ) {
                            addProductToPDF({
                              ...product,
                              sasia:
                                modifiednjesiaMateseValues[index],
                            });
                          }
                        }}
                        disabled={
                          modifiednjesiaMateseValues[index] === '' ||
                          selectedProducts.some(
                            (p) => p.pozita === product.pozita
                          )
                        }
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Add
                      </button>
                      <button
                        onClick={() =>
                          removeProductFromPDF(product.id)
                        }
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-semibold">
          Selected Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Të dhëna për pozitën
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Sasia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Njësia matëse
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Çmimi njësisë pa TVSH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Çmimi i përgjithshëm pa TVSH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {selectedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {product.pozita}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="text"
                      value={product.sasia}
                      className="m-2 rounded-lg border-[1.5px] border-indigo-500 p-2 text-black"
                      onChange={(e) =>
                        handleSelectedProductChange(
                          index,
                          'sasia',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {product.njesiaMatese}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {parseFloat(
                      String(product.cmimiNjesisePaTVSH)
                    ).toLocaleString()}{' '}
                    ден.
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {parseFloat(
                      String(
                        product.cmimiNjesisePaTVSH *
                          Number(product.sasia)
                      )
                    ).toLocaleString()}{' '}
                    ден.
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      onClick={() => removeProductFromPDF(product.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={generatePDF} className={buttonStyle}>
        Generate PDF
      </button>
      <div>
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
