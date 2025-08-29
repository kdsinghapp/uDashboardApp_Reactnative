import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color, fonts } from '../../../constant';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff'
  },
  backButton: {
    marginTop: 8,
    width: '15%',
  },
  backIcon: {
    height: 32,
    width: 32,
  },
  headerContainer: {
    marginTop: 15,
    height: hp(9),
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 36,
  },

    description: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(157, 178, 191, 1)',
    lineHeight: 24,
    marginTop: 5,
    width: '85%',
  },
    formlabel: {
    fontSize: 16,
    fontFamily:fonts.bold,
    color: color.primary,
    lineHeight: 24,
    marginTop: 15,
    width: '85%',
    marginBottom:-12,
    marginLeft:3
  },
  formContainer: {
    marginTop: 80,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 4,
  },
});
