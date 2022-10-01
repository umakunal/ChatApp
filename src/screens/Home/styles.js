import {StyleSheet} from 'react-native';
import colors from '../../assets/Theme/colors';

// define your styles
export const styles = StyleSheet.create({
  mainView: {
    marginVertical: 5,
    height: 1,
    width: '100%',
    backgroundColor: colors.grey,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    paddingBottom: 20,
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
