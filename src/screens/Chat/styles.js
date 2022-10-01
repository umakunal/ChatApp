import {StyleSheet} from 'react-native';
import colors from '../../assets/Theme/colors';

// define your styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    height: 65,
    width: 65,
    borderRadius: 40,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  name: {
    fontSize: 18,
    color: colors.primary,
    marginLeft: 10,
  },
  email: {
    fontSize: 14,
    color: colors.secondary,
    marginLeft: 10,
  },
  time: {
    fontSize: 14,
    color: colors.grey,
  },
});
