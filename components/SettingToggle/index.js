import { View, Text, Switch } from 'react-native';
import { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import theme from '../../constants/theme';

const { colors } = theme;

// 20520683 - Luu Huynh Phat
/**
 * Represents a customizable toggle switch for settings.
 * @param {string} title - The title of the setting
 * @param {boolean} isEnabled - The initial state of the toggle switch
 * @param {function} toggleHandler - The callback function for handling toggle events
 * @returns {JSX.Element} The rendered toggle switch component
 */
const SettingToggle = ({ title, isEnabled, toggleHandler }) => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  // Apply theme-dependent styles using the `getStyles` function
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Switch
        style={styles.switch}
        value={isEnabled}
        onValueChange={toggleHandler}
        thumbColor={isEnabled ? colors.tertiary : '#f4f3f4'}
        trackColor={{ false: '#f4f3f4', true: colors.background }}
      />
    </View>
  );
};

export default SettingToggle;
