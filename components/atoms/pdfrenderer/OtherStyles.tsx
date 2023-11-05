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
