import { GET_ALL_PRODUCTS } from '@/lib/constants/endpoints/products/products';
import useData from '@/lib/hooks/useData';
import { IProduct } from '@/lib/schema/product/product';
import { Text, View } from '@react-pdf/renderer';
import { generalStyle } from './styles';

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

const predefinedProducts = [
  {
    id: 1,
    pozita: 'Unit 1',
    njesiaMatese: 'm3',
    sasia: 3.5,
    cmimiNjesisePaTVSH: 2000,
  },
  {
    id: 2,
    pozita: 'Unit 2',
    njesiaMatese: 'm3',
    sasia: 2,
    cmimiNjesisePaTVSH: 1500,
  },
  // Add more products as needed
];

export const Products = () => {
  
  return (
    <View>
      <View
        style={{
          borderTop: 0.4,
          borderBottom: 0.4,
          marginTop: 15,
        }}
      >
        {headers.map((row, rowIndex) => (
          <View style={generalStyle.tableRow} key={rowIndex}>
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
                <Text style={generalStyle.tableCellHeader}>
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
        {predefinedProducts.map((product, rowIndex) => {
          return (
            <View style={generalStyle.tableRow} key={rowIndex}>
              <View
                style={{
                  ...generalStyle.tableCell,
                  width: '17%',
                }}
              >
                <Text style={generalStyle.tableCellRow}>
                  {rowIndex + 1}
                </Text>
              </View>
              {Object.entries(product).map(
                ([key, value], cellIndex) => {
                  if (key !== 'id') {
                    let displayedValue;
                    if (key === 'sasia') {
                      // Use the quantity from the input
                      displayedValue = productQuantities[rowIndex];
                    } else {
                      // Use the original value from predefinedProducts
                      displayedValue = value;
                    }

                    return (
                      <View
                        style={
                          key === 'sasia'
                            ? {
                                ...generalStyle.tableCell,
                                width: '10%',
                              }
                            : key === 'cmimiNjesisePaTVSH'
                            ? {
                                ...generalStyle.tableCell,
                                width: '20%',
                                textAlign: 'right',
                              }
                            : {
                                ...generalStyle.tableCell,
                              }
                        }
                        key={cellIndex}
                      >
                        <Text style={generalStyle.tableCellRow}>
                          {typeof displayedValue === 'number'
                            ? displayedValue.toLocaleString('en-US')
                            : displayedValue}{' '}
                          <Text
                            style={{
                              ...generalStyle.tableCellRow,
                              textTransform: 'lowercase',
                            }}
                          >
                            {key === 'cmimiNjesisePaTVSH' ||
                            key === 'cmimiPergjithshemPaTVSH'
                              ? 'ден.'
                              : ''}
                          </Text>
                        </Text>
                        {key === 'pozita' && (
                          <Text
                            style={
                              generalStyle.tableCellItemDescription
                            }
                          >
                            {parseFloat(
                              String(product.cmimiNjesisePaTVSH)
                            ).toLocaleString('en-US')}
                          </Text>
                        )}
                      </View>
                    );
                  }
                  return null; // Exclude the 'id' property
                }
              )}

              {/* Add the total calculation in the last column */}
              <View
                style={{
                  ...generalStyle.tableCell,
                  width: '20%',
                  textAlign: 'right',
                }}
              >
                <Text
                  style={{
                    ...generalStyle.tableCellRow,
                    textTransform: 'lowercase',
                  }}
                >
                  {total.toLocaleString('en-US')} ден.
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
