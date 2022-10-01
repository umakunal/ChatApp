import {StyleSheet} from 'react-native';
import COLORS from '../../assets/Theme/colors';

// define your styles
export const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 20,
    color: COLORS.primary,
    fontWeight: '500',
  },

  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  form: {
    paddingTop: 20,
  },

  createSection: {
    marginTop: 10,
    flexDirection: 'row',
  },
  linkBtn: {
    paddingLeft: 17,
    color: COLORS.primary,
    fontSize: 16,
  },

  infoText: {
    fontSize: 17,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 15,
  },
});
