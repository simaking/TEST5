import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Design reference
const baseWidth = 395;
const baseHeight = 807;

const scale = (size: number) => (deviceWidth / baseWidth) * size;
const vScale = (size: number) => (deviceHeight / baseHeight) * size;

// Colors
const Colors = {
  bg: '#FFFFFF',
  headerBg: '#F2EFFE',
  brand: '#2E2A5E',
  muted: '#6B6887',
  mint: '#BFFFE5',
  purple: '#9B5BFF',
  cardBorder: 'rgba(46, 42, 94, 0.12)',
};

const ROW_ICON_SIZE = scale(18);

function calculateAge(isoBirthDate: string): number {
  const birth = new Date(isoBirthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const birthDateIso = '2001-09-24';
  const age = calculateAge(birthDateIso);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoDots}>
            <View style={styles.logoDot} />
            <View style={[styles.logoDot, { marginLeft: scale(6) }]} />
          </View>
          <Text style={[styles.brandText, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Sikt</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={scale(18)} color={Colors.brand} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/180?img=67' }}
            style={styles.avatar}
          />
        </View>

        <Text style={[styles.name, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Even Martin Ableseth Riksheim <Text style={[styles.age, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>({age})</Text></Text>

        <View style={styles.infoCard}>
          <InfoRow
            icon={<MaterialCommunityIcons name="calendar-blank-outline" size={ROW_ICON_SIZE} color={Colors.brand} />}
            label="Fødselsdato:"
            value="24.09.2001"
            fontsLoaded={fontsLoaded}
          />
          <InfoRow
            icon={<MaterialCommunityIcons name="card-account-details-outline" size={ROW_ICON_SIZE} color={Colors.brand} />}
            label="Studentnummer:"
            value="599264"
            fontsLoaded={fontsLoaded}
          />
          <InfoRow
            icon={<MaterialCommunityIcons name="school-outline" size={ROW_ICON_SIZE} color={Colors.brand} />}
            label="Studiested:"
            value={'Norges teknisk-naturvitenskapelige\nuniversitet'}
            multiline
            fontsLoaded={fontsLoaded}
          />
        </View>

        <View style={styles.statusCard}>
          <Text style={[styles.statusTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Gyldig studentbevis</Text>
          <Text style={[styles.statusBody, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>Vår 2025</Text>
          <Text style={[styles.statusBodyMuted, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>
            Utløper: <Text style={styles.statusStrong}>31.08.2025</Text>
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
          <Text style={[styles.primaryButtonText, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Kontroll</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
          <Text style={[styles.secondaryText, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>Europeisk studentbevis</Text>
          <MaterialCommunityIcons name="qrcode" size={scale(18)} color={Colors.purple} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerMain, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>Sist oppdatert: 09.08.2025 kl. 13:58 (CEST)</Text>
          <Text style={[styles.footerSub, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>Tidssone: Europe/Oslo</Text>
          <Text style={[styles.footerSub, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>Versjon: 4.1.8</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, multiline, fontsLoaded }: { icon: React.ReactNode; label: string; value: string; multiline?: boolean; fontsLoaded: boolean }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>{label}</Text>
        <Text style={[styles.rowValue, fontsLoaded && { fontFamily: 'Inter_400Regular' }]} numberOfLines={multiline ? 2 : 1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    height: vScale(60),
    backgroundColor: Colors.headerBg,
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
  },
  logoDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.brand,
  },
  brandText: {
    color: Colors.brand,
    fontSize: scale(20),
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: vScale(40),
  },
  avatarWrapper: {
    marginTop: vScale(40),
    width: scale(102),
    height: scale(102),
    borderRadius: scale(51),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: scale(6),
    borderColor: '#FFFFFF',
  },
  name: {
    marginTop: vScale(12),
    fontSize: scale(18),
    color: Colors.brand,
  },
  age: {
    color: Colors.muted,
  },
  infoCard: {
    width: scale(350),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: scale(14),
    marginTop: vScale(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vScale(8),
  },
  rowIcon: {
    width: scale(28),
    alignItems: 'center',
    marginTop: scale(2),
  },
  rowLabel: {
    fontSize: scale(13),
    color: Colors.brand,
  },
  rowValue: {
    marginTop: scale(2),
    fontSize: scale(13),
    color: Colors.muted,
  },
  statusCard: {
    width: scale(350),
    borderRadius: scale(12),
    backgroundColor: Colors.mint,
    alignItems: 'center',
    paddingVertical: vScale(14),
    marginTop: vScale(16),
    shadowColor: 'rgba(46, 42, 94, 0.06)',
  },
  statusTitle: {
    fontSize: scale(18),
    color: Colors.brand,
  },
  statusBody: {
    marginTop: scale(6),
    fontSize: scale(14),
    color: Colors.brand,
  },
  statusBodyMuted: {
    marginTop: scale(2),
    fontSize: scale(14),
    color: Colors.brand,
  },
  statusStrong: {
    fontWeight: '700',
    color: Colors.brand,
  },
  primaryButton: {
    width: scale(350),
    height: vScale(50),
    borderRadius: vScale(25),
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vScale(18),
    shadowColor: 'rgba(46, 42, 94, 0.06)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
  },
  secondaryButton: {
    width: scale(350),
    height: vScale(50),
    borderRadius: vScale(25),
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginTop: vScale(12),
    flexDirection: 'row',
  },
  secondaryText: {
    color: Colors.purple,
    fontSize: scale(16),
  },
  footer: {
    width: scale(350),
    alignItems: 'center',
    marginTop: vScale(20),
  },
  footerMain: {
    fontSize: scale(12),
    color: Colors.brand,
  },
  footerSub: {
    marginTop: scale(6),
    fontSize: scale(12),
    color: Colors.muted,
  },
});