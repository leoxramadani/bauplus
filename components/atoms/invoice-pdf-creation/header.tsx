import { Text, View } from '@react-pdf/renderer';
import { EverestLogo } from './EverestLogo';
import { generalStyle } from './styles';

interface HeaderData {
  companyName: String;
}

export const Header: React.FC<HeaderData> = ({ companyName }) => {
  return (
    <View style={generalStyle.header}>
      {/* our company logo and information */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* company logo */}
        <View>
          <EverestLogo />
        </View>

        {/* company information */}
        <View style={{ marginLeft: 13, rowGap: 3 }}>
          <Text style={generalStyle.headerLeftTitle}>
            Everest XH.D.
          </Text>
          <Text style={generalStyle.headerLeftText}>
            Даночен Број / Numri Tatimor: <Text>MK4028005149980</Text>
          </Text>
          <Text style={generalStyle.headerLeftText}>
            Жиро сметка / Xhiro Llogaria: <Text>38017960411108</Text>
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
          <Text style={generalStyle.headerRightText}>Address</Text>
          <Text style={generalStyle.headerRightText}>Email</Text>
        </View>
      </View>
      {/* end - billed company */}
    </View>
  );
};
