import React, { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
  G,
  Polygon,
  Svg,
  Path,
} from '@react-pdf/renderer';
import { custom } from 'zod';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const stylesThor = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    padding: 35,
  },
  image: {
    marginLeft: 10,
    margin: 25,
    marginHorizontal: 90,
    marginTop: 100,
  },
  belowLogo: {
    padding: 10,
    flexDirection: 'row',
  },
  information: {
    paddingRight: 20,
    paddingTop: 10,
  },
  buyerRight: {
    borderColor: '#000000',
    borderWidth: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  data: {
    fontSize: 12,
  },
  table: {
    flex: 'auto',
    flexShrink: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { flexDirection: 'row' },
  tableCell: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flex: 1,
  },
  tableCellText: {
    fontSize: 10,
    padding: 5,
  },
});

const stylesEverest = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    padding: 25,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 70,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  headerRight: {
    borderColor: '#000000',
    borderWidth: 3,
    paddingTop: 60,
    paddingHorizontal: 10,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  belowLogo: {
    padding: 10,
    flexDirection: 'row',
  },
  information: {
    paddingRight: 20,
    paddingTop: 10,
  },
  table: {
    flex: 'auto',
    flexShrink: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: { flexDirection: 'row' },
  tableCell: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flex: 1,
  },
  tableCellBigger: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
  },
  tableCellText: {
    fontSize: 10,
    padding: 5,
    margin: 5,
  },
});

const customTable = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: '50pt 50pt 70pt', // Adjusted padding to leave space for page number
    fontFamily: 'Roboto',
    flexDirection: 'column',
    alignItems: 'center', // Center the table horizontally
    justifyContent: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 35,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    textAlign: 'center',
    textOverflow: 'ellipsis',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    width: '100%',
    wordWrap: 'break-word',
    minHeight: 35, // Adjust the value as needed
    textOverflow: 'ellipsis',
    height: 'auto',
  },
  tableCol: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    wordWrap: 'break-word', // Add this line to break long words
    textAlign: 'center',
    justifyContent: 'center',
    objectFit: 'contain',
    textOverflow: 'ellipsis',
  },
  tableCell: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
  },
  widerTableCol: {
    width: '12%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    wordWrap: 'break-word', // Add this line to break long words
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
    objectFit: 'contain',
    textOverflow: 'ellipsis',
  },
  tableCellArkiva: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
    borderTop: 1,
  },
  tableCellArkivaFirst: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tableCellArkivaEnd: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
    borderLeft: 1,
    justifyContent: 'center',
  },
  tableCellArkivaEndFirst: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  tableCellArkivaEndFirstDate: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
    width: '90%',
  },
  tableCellArkivaEndData: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    overflow: 'hidden',
    borderLeft: 1,
    justifyContent: 'center',
    width: '97%',
  },
  tableColEnd: {
    display: 'flex',
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    wordWrap: 'break-word', // Add this line to break long words
    textAlign: 'center',
    justifyContent: 'center',
    objectFit: 'contain',
    textOverflow: 'ellipsis',
  },
  tableRowEnd: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    width: '100%',
    wordWrap: 'break-word',
    minHeight: 35, // Adjust the value as needed
    textOverflow: 'ellipsis',
    height: 'auto',
    justifyContent: 'center',
    borderTop: 1,
  },
  tableRowEndData: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    width: '100%',
    wordWrap: 'break-word',
    minHeight: 25, // Adjust the value as needed
    textOverflow: 'ellipsis',
    height: 'auto',
    justifyContent: 'center',
  },
  tableColImePrezime: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    wordWrap: 'break-word', // Add this line to break long words
    textAlign: 'center',
    justifyContent: 'center',
    objectFit: 'contain',
    textOverflow: 'ellipsis',
  },
  tableCellArkivaWPadding: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
    flexWrap: 'wrap',
    wordBreak: 'break-word', // Add this line to break long words
    wordWrap: 'break-word',
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tableRowWPadding: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    width: '100%',
    wordWrap: 'break-word',
    minHeight: 25, // Adjust the value as needed
    textOverflow: 'ellipsis',
  },
});

const inputStyle =
  'w-48 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500';

const buttonStyle =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

const centerDivStyle = 'flex justify-center items-center h-screen';

const ThorLogo = () => {
  return (
    <Svg width="150" height="98" viewBox="0 0 150 98">
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
    <Svg width="300" height="100" viewBox="0 0 510.54 223">
      <Path
        d="m470.2,172.29c-1.36-3.4,3.12-12.66,6.34-13.83.93-2.82.12-2.03-.58-5.76h2.3c3.05-4.24,3.62-10.73,5.76-16.13,6.7-16.89,25.03-46.21,10.37-64.54-3.65-1.54-7.3-3.07-10.95-4.61-13.79-9-27.57-21.41-40.91-31.69-8.46-6.52-38.99-34.85-48.4-35.73-9.55,10.96-23.7,18.57-35.15,27.66-26.85,21.31-52.24,45.38-78.37,67.42-10.14,8.55-37.94,23.01-42.06,35.15,15.81-.23,16.02,1.43,24.78,6.91,14.65-6.15,15.58-23.25,25.93-33.42,1.34.19,2.69.38,4.03.58.58.38,1.15.77,1.73,1.15-1.59,7.97-9.5,10.45-11.52,19.02,6.72-2.11,13.45-4.23,20.17-6.34,28.42-3.07,56.86-6.15,85.28-9.22,17.35.83,53.57-2.97,70.3-8.64,2.89,3.23-.39,15.17-1.73,20.74-3.87,16.12-7.82,50.46-13.25,61.66,3.57,4.92,7.73.15,13.83,2.88,7.68,7.3,15.37,14.6,23.05,21.9,1.44,3.33-.32,5.29,1.15,8.64,2.56,1.42,2.52,1.32,6.34,1.15v4.61c.58.38,1.15.77,1.73,1.15,5.99-6.82,18.38-24.83,20.17-34.57-8.83-19.89-31.19-4.73-40.34-16.13Zm-195.34-69.72v-.58c5.43-7.23,17.71-11.63,25.35-16.71,17.86-11.91,35.73-23.82,53.59-35.73,4.25,2.61,6.28,6.29,12.1,7.49,3.13-8.85,24.84-19.87,31.69-27.66,6.12.8,15.59,8.47,17.86,13.25,5.26-.8,6.19-6.07,11.52-5.19,17.29,9.99,34.58,19.98,51.86,29.96.38.58.77,1.15,1.15,1.73-9.1,7.38-55.05,6.69-69.72,9.8-17.59,3.73-39.28,7.31-57.05,10.95-9.41.96-18.82,1.92-28.24,2.88-14.6,4.06-33.44,8.49-50.13,9.8Zm156.73-10.37c-10.18.38-20.36.77-30.54,1.15-16.88,2.74-39.26,5.04-56.47,3.46v-1.15c22.66-3.26,45.33-6.53,67.99-9.8,6.53-1.73,13.06-3.46,19.59-5.19,13.83-2.11,27.66-4.23,41.49-6.34,1.54.19,3.07.38,4.61.58.19.58.38,1.15.58,1.73-4.48,4.53-10.77,8.6-13.25,14.98-9.86-3.07-22.42-1.22-34,.58Zm26.51,83.55h-.58c.58-2.11,1.15-4.23,1.73-6.34,1.34-1.54,2.69-3.07,4.03-4.61h2.3c-.94,4.8-4.05,8.58-7.49,10.95Zm5.76-77.79h3.46c-1.61,1.19-1.89,1.57-3.46,0Zm4.03,57.05c-.04-2.08-.08-1.5.58-3.46h.58c.38.38.77.77,1.15,1.15-.44,2.05-.41,1.66-1.15,2.88-.38-.19-.77-.38-1.15-.58Zm-399.33-13.83c2.98,12.84,20.61,32.51,28.24,43.22h9.8c26.31-37.84,52.63-75.68,78.94-113.52,26.7,10.37,53.4,20.75,80.1,31.12v-.58c-17.09-8.26-34.19-16.52-51.28-24.78-9.81-4.84-21.53-14.61-33.42-16.13-19.4,28.62-39.96,55.88-58.78,85.28-6.53,9.41-13.06,18.82-19.59,28.24h-1.15c-9.97-8.4-16.08-25.64-23.63-36.3-3.07,1.15-6.15,2.3-9.22,3.46Zm-54.74,35.73v-32.84h38.03c.74-1.5,1.03-2.01,1.15-4.61-9.69-3.52-28.33-1.25-38.61-1.15v-44.37c18.64-3.18,62.8,4.26,67.99-10.37h-4.03c-13.48,7.5-53.62,3.09-73.18,2.88-2.75,5.02-1.73,17.37-1.73,26.51-.19,23.05-.38,46.1-.58,69.15,2.76,2.77,13.44,2.22,19.02,1.73h42.64c4.99.77,9.99,1.54,14.98,2.3h1.15c-9.43-13.82-44.98-9.63-66.84-9.22Zm429.29-36.3c.38-.58.77-1.15,1.15-1.73-.38-.96-.77-1.92-1.15-2.88-4.99-.19-9.99-.38-14.98-.58-3.96-6.22-.35-16.67-2.3-24.78.39-2.08.59-1.82-2.3-2.3-2.5.58-4.99,1.15-7.49,1.73-2.72,5.91-.21,17.33-1.73,23.05-2.06,2.97-11.79,1.94-16.71,1.73-.19,1.54-.38,3.07-.58,4.61,5.38.19,10.76.38,16.13.58,1.74,3.98,1.14,11.52,1.15,17.29.03,16.16,5.83,27.09,17.86,31.12h.58c.19-.38.38-.77.58-1.15-6.96-6.78-11.96-33.23-5.76-46.67h15.56Zm-265.64-5.76c-8.26.96-16.52,1.92-24.78,2.88-3.26,10.41-1.32,26.26-1.15,38.61,7.6,5.96,28.46,16.45,44.37,9.22h1.15c-.19-.58-.38-1.15-.58-1.73-15.58-2.48-31.17,1.77-32.84-14.41v-.58c16.12-7.81,42.1-3.31,51.28-17.86-.58-2.88-1.15-5.76-1.73-8.64-4.33-8.72-22.41-7.94-35.73-7.49Zm26.51,14.98c-8.31,8.51-25.4,10.44-38.61,13.83-2.61-2.65-1.93-18.11-.58-21.9,3.46-.77,6.92-1.54,10.37-2.3,9.97-.18,19.76-.92,25.93,3.46.96,1.15,1.92,2.3,2.88,3.46v3.46Zm93.93-14.41c-9.6.96-19.21,1.92-28.81,2.88-.19,5.95-.38,11.91-.58,17.86-5.09,32.68,17.08,31.84,44.95,31.12-1.79-3.7-13.29-1.45-19.02-2.88-7.7-1.92-11.9-6.56-14.41-13.83,14.59-10.88,42-.84,51.86-20.74-.77-2.5-1.54-4.99-2.3-7.49-8.64-5.73-19.29-7.14-31.69-6.91Zm-18.44,29.39c-.05-8.23-.06-16.6,1.15-21.9,4.61-.96,9.22-1.92,13.83-2.88,10.52-.28,21.41,0,25.35,6.34,4.42,9.98-32.11,19.36-40.34,18.44Zm72.03-9.8c-1.89-2.88-2.22-4.79-2.3-8.64,9.01-7.02,22.92-5.49,39.18-5.19.19-.38.38-.77.58-1.15v-.58c-9.96-2.41-19.6-3.5-31.69-3.46-5.98,3.34-13.23,4.62-18.44,7.49-.86,4.2-.46,9.74.58,13.25,10.57,6.48,25.42,4.81,38.61,9.8,4.62,2.87,2.93,9.31,1.73,13.83-14.41,7.7-25.88-.45-40.34-2.88-.19.38-.38.77-.58,1.15v.58c9.77,10.12,48.92,15.17,54.17-2.3,6.34-21.14-29.19-19.16-41.49-21.9Zm-127.35-16.13c-1.18,9.96-3.62,35.15.58,45.52v1.15c3.07-.19,6.15-.38,9.22-.58,3.82-4.31.45-31.5,2.3-39.18,8.01-1.54,15.73.43,23.05,0,.19-.38.38-.77.58-1.15-6.4-7.07-18.32-6.06-27.66-8.07-2.69.77-5.38,1.54-8.07,2.3ZM27.66,190.16c-.19-.38-.38-.77-.58-1.15h-1.73c-3.65,3.23-7.11,3.72-9.8,8.07h-2.3c-3.08-2.97-3.83-4.73-10.37-4.61-.19.19-.38.38-.58.58,2.11,3.46,4.23,6.92,6.34,10.37C5.76,206.48,2.88,209.55,0,212.63c.38.77.77,1.54,1.15,2.3,1.73-.19,3.46-.38,5.19-.58,1.92-2.3,3.84-4.61,5.76-6.91,3.46,3.07,6.92,6.15,10.37,9.22,2.88-.77,5.76-1.54,8.64-2.3-4.42-3.84-8.84-7.68-13.25-11.52,1.12-5.42,6.41-9.28,9.8-12.68Zm32.27,2.3l1.73,1.73c-1.37,2.41-2.2,2.9-2.3,6.91-2.11.96-4.23,1.92-6.34,2.88-2.69-.19-5.38-.38-8.07-.58v-10.37c-2.11-.77-4.23-1.54-6.34-2.3-3.54,5.76-3.4,16.63-2.88,24.2,3.07.77,6.15,1.54,9.22,2.3,2.09-2.66.85-6.46.58-9.8.38-.19.77-.38,1.15-.58,2.88.19,5.76.38,8.64.58.77,2.3,1.54,4.61,2.3,6.91,2.69.19,5.38.38,8.07.58,1.34-7.68,2.69-15.37,4.03-23.05-3.75-1.8-6.13-.39-9.8.58Zm32.27-1.73c-1.54.58-3.07,1.15-4.61,1.73,0,0-.94,17.49-.58,23.05,7.82,2.85,29.83-1.17,31.69-9.22,2.54-10.99-16.53-15.83-26.51-15.56Zm16.13,19.02c-3.56,1.58-6.32,2.48-12.1,2.3-.38-6.15-.77-12.29-1.15-18.44,10.83.01,14.86,6.8,13.25,16.13Zm-36.3.58c-.38.77-.77,1.54-1.15,2.3v.58c2.3,1.15,4.61,2.3,6.91,3.46h1.73v-1.73c-1.85-2.57-3.31-4.24-7.49-4.61Zm50.13.58c-.38.96-.77,1.92-1.15,2.88,2.3,1.15,4.61,2.3,6.91,3.46h.58c.96-4.04-1.56-6.29-6.34-6.34Z"
        fill="black"
      />
    </Svg>
  );
};

const PDFRenderer = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [pdfData, setPdfData] = useState<React.ReactElement | null>(
    null
  );

  const tableData = [
    [
      'Ред бр.',
      'Опис',
      'Единица мера',
      'Количина',
      'Единица цена \nБез ДДВ',
      'Вкупно \nБез ДДВ',
    ],
    [
      input1,
      'Row 1, Cell 2',
      'Row 1, Cell 3',
      'Row 1, Cell 4',
      'Row 1, Cell 5',
      'Row 1, Cell 6',
    ],
    [
      input2,
      'Row 2, Cell 2',
      'Row 2, Cell 3',
      'Row 2, Cell 4',
      'Row 2, Cell 5',
      input3,
    ],
    // Add more rows here
  ];

  const tableData2 = [
    [
      'Nr. Бр.',
      'Pozicioni/Позици',
      'Masa\nМера',
      'Sasia\nКолич',
      'Çmimi\nЦена',
      'Totali/Вкупно',
    ],
    [
      input1,
      'Row 1, Cell 2',
      'Row 1, Cell 3',
      'Row 1, Cell 4',
      'Row 1, Cell 5',
      'Row 1, Cell 6',
    ],
    [
      input2,
      'Row 2, Cell 2',
      'Row 2, Cell 3',
      'Row 2, Cell 4',
      'Row 2, Cell 5',
      input3,
    ],
    // Add more rows here
  ];

  const [selectedLogo, setSelectedLogo] = useState('1');

  const handleLogoChange = (event: { target: { value: any } }) => {
    const logoId = event.target.value;
    setSelectedLogo(logoId);
  };

  function separateTextIntoLines(
    text: any,
    charactersPerLine: number
  ): string[] {
    const textString = String(text);
    const regex = new RegExp(`.{1,${charactersPerLine}}`, 'g');
    return textString.match(regex) || [];
  }

  const generatePDF = () => {
    if (input1 || input2 || input3 !== '') {
      // Create the PDF content
      const selectedLogoComponent =
        selectedLogo === '1' ? <ThorLogo /> : <EverestLogo />;
      const thorInvoice = (
        <Document>
          <Page size="A4" style={stylesThor.page}>
            <View style={stylesThor.image}>
              {selectedLogoComponent}
            </View>
            <View style={stylesThor.belowLogo}>
              <View
                style={{ flexDirection: 'column', paddingRight: 15 }}
              >
                <View>
                  <Text style={{ fontSize: 11 }}>
                    Продавач ТХОР ИНДУСТРИЕС ДООЕЛ СКОПЈЕ
                  </Text>
                </View>
                <View style={stylesThor.information}>
                  <Text style={{ fontSize: 9 }}>
                    Ул. Филип Втори Македонски бр. 3/11 Скопје
                  </Text>
                </View>
                <View
                  style={{
                    width: '70%',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 9 }}>300000004558842</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 12 }}>
                    MK4080020593677
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 23,
                      letterSpacing: -1,
                      paddingLeft: 15,
                    }}
                  >
                    Фактура бр. 01/2023
                  </Text>
                </View>
              </View>
              <View style={stylesThor.buyerRight}>
                <Text style={{ fontSize: 14 }}>Купувач </Text>
                <Text style={{ fontSize: 18 }}>Ас Сењак Дооел</Text>
                <Text style={{ fontSize: 11 }}>Kичево</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                  }}
                >
                  <Text style={stylesThor.data}>Data:</Text>
                  <Text style={stylesThor.data}>13/07/2023</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={stylesThor.data}>Data:</Text>
                  <Text style={stylesThor.data}>13/07/2023</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={stylesThor.table}>
                {/* Header row */}
                <View style={stylesThor.tableRow}>
                  {tableData[0].map((header, index) => (
                    <View style={stylesThor.tableCell} key={index}>
                      <Text style={stylesThor.tableCellText}>
                        {header}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Data rows */}
                {tableData.slice(1).map((row, rowIndex) => (
                  <View style={stylesThor.tableRow} key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <View
                        style={stylesThor.tableCell}
                        key={cellIndex}
                      >
                        <Text style={stylesThor.tableCellText}>
                          {cell}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 'auto',
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#000000',
                  padding: 1,
                  flex: 'auto',
                  width: '70%',
                }}
              >
                <View
                  style={{
                    borderColor: '#000',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    height: 'auto',
                  }}
                >
                  <View style={stylesThor.tableRow}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={stylesThor.tableCellText}>
                        Пренесување на даночна обврска согласно член
                        32-а од законот за ДДВ
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[stylesThor.tableRow, { borderTop: 1 }]}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                      }}
                    >
                      <Text style={stylesThor.tableCellText}>
                        120000
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 35,
                paddingHorizontal: 35,
              }}
            >
              <View>
                <Text style={{ fontSize: 12 }}>Примил</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12 }}>Директор</Text>
              </View>
            </View>
          </Page>
        </Document>
      );

      const everestInvoice = (
        <Document>
          <Page size="A4" style={stylesEverest.page}>
            <View style={stylesEverest.header}>
              <View>
                <EverestLogo />
              </View>
              <View style={stylesEverest.headerRight}>
                <Text style={{ fontSize: 12 }}>
                  {`Fortis Energetika I \nGradeznistvo Dooel \nSkopje ul.Partenij \nZografski Br.23 Skopje \nCentar`}
                  ,
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <View>
                <Text>service@everestxhd.com</Text>
                <Text style={{ fontSize: 14 }}>
                  <Text style={{ fontSize: 16 }}>Nr. Tat.</Text>
                  /Данач.бр.{' '}
                  <Text style={{ fontSize: 16 }}>
                    MK4028005149980
                  </Text>
                </Text>
                <Text style={{ fontSize: 14 }}>
                  <Text style={{ fontSize: 16 }}>Zhiro Llog.</Text>/Ж.
                  Сметка{' '}
                  <Text style={{ fontSize: 16 }}>
                    380176960411108
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={{ borderBottom: 1 }}>Faktura</Text>
                <Text>Фактура</Text>
                <Text>
                  бр. <Text style={{ fontSize: 20 }}>#08</Text>
                </Text>
                <Text>
                  За месец <Text style={{ fontSize: 20 }}>05</Text>
                </Text>
              </View>
            </View>
            <View>
              <View style={stylesEverest.table}>
                {/* Header row */}
                <View style={stylesEverest.tableRow}>
                  {tableData2[0].map((header, index) => (
                    <View
                      style={
                        index === 1
                          ? {
                              ...stylesEverest.tableCell,
                            }
                          : stylesEverest.tableCell
                      }
                      key={index}
                    >
                      <Text style={stylesEverest.tableCellText}>
                        {header}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={stylesEverest.tableRow}>
                  <View style={stylesEverest.tableCell}>
                    <View
                      style={[
                        stylesEverest.tableRow,
                        { borderBottom: 1, borderBottomWidth: 1 },
                      ]}
                    >
                      <Text style={stylesEverest.tableCellText}>
                        1
                      </Text>
                    </View>
                    <View>
                      <Text style={stylesEverest.tableCellText}>
                        1
                      </Text>
                      <Text style={stylesEverest.tableCellText}>
                        1
                      </Text>

                      <View
                        style={[
                          stylesEverest.tableRow,
                          { borderTopWidth: 1 },
                        ]}
                      >
                        <View style={stylesEverest.tableCell}>
                          <Text style={stylesEverest.tableCellText}>
                            1
                          </Text>
                        </View>
                        <View style={stylesEverest.tableCell}>
                          <Text style={stylesEverest.tableCellText}>
                            1
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View></View>
          </Page>
        </Document>
      );

      const customPDF = (
        <Document>
          <Page orientation="landscape" style={customTable.page}>
            <View style={customTable.table} wrap>
              <View
                style={[customTable.tableRow, { borderTop: 1 }]}
                fixed
              >
                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Основен Број', 5)}
                  </Text>
                  <Text
                    style={[
                      customTable.tableCell,
                      { borderTop: 1, borderTopWidth: 1 },
                    ]}
                    break
                    wrap
                  >
                    {separateTextIntoLines('Пренос', 6)}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Предмет', 6)}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Под Броеви', 6)}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Датум на прием', 6)}
                  </Text>
                </View>

                <View style={customTable.tableColImePrezime}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Испрачаќ', 6)}
                  </Text>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines(
                      'Презиме и име, односно назив на место',
                      6
                    )}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Број', 6)}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Датум', 6)}
                  </Text>
                </View>

                <View style={customTable.tableCol}>
                  <Text style={customTable.tableCell} break wrap>
                    {separateTextIntoLines('Органи.Единица', 6)}
                  </Text>
                </View>

                <View style={customTable.tableColEnd}>
                  <Text
                    style={customTable.tableCellArkivaFirst}
                    break
                    wrap
                  >
                    {separateTextIntoLines('Развој', 6)}
                  </Text>
                  <View style={customTable.tableRowEnd}>
                    <Text
                      style={customTable.tableCellArkivaEndFirst}
                      break
                      wrap
                    >
                      {separateTextIntoLines('Датум', 6)}
                    </Text>
                    <Text
                      style={customTable.tableCellArkivaEnd}
                      break
                      wrap
                    >
                      {separateTextIntoLines('Oзнака', 6)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text
              style={customTable.pageNumber}
              key="pages"
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      );

      setPdfData(everestInvoice);
    } else {
      alert('Please fill in all three inputs.');
    }
  };

  return (
    <div className={centerDivStyle}>
      <div className="p-4">
        <div className="mb-4 flex space-x-4">
          <select onChange={handleLogoChange} value={selectedLogo}>
            <option value="1">Logo 1</option>
            <option value="2">Logo 2</option>
          </select>
          <input
            type="text"
            placeholder="Input 1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Input 2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Input 3"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            className={inputStyle}
          />

          <button onClick={generatePDF} className={buttonStyle}>
            Generate PDF
          </button>
        </div>
        {pdfData ? (
          <PDFViewer width="100%" height={800}>
            {pdfData}
          </PDFViewer>
        ) : null}
      </div>
    </div>
  );
};

export default PDFRenderer;
