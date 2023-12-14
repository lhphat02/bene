import { StyleSheet } from 'react-native';

//20520683 - Luu Huynh Phat
const getStyles = (isDarkMode, fontSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#171717' : '#fff',
    },
    header: {
      fontSize: fontSize + 4 || 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 50,
      color: 'orange',
    },
    text: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: fontSize || 16,
      color: isDarkMode ? 'white' : 'gray',
    },
    addTaskBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginHorizontal: 20,
    },
    title: {
      fontSize: fontSize + 8 || 20,
      fontWeight: '600',
      color: isDarkMode ? 'white' : 'gray',
    },
    taskList: {
      flex: 1,
      marginTop: 10,
    },
  });

export default getStyles;
