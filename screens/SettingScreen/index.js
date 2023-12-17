import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import LanguageSwitch from '../../components/LanguageSwitch';
import SettingToggle from '../../components/SettingToggle';
import { Divider } from '../../components';

const ProfileScreen = () => {
  const { isDarkMode, changeDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <SettingToggle
        title={t('Dark Mode')}
        isEnabled={isDarkMode}
        toggleHandler={changeDarkMode}
      />
      <Divider color={isDarkMode ? '#fff' : '#000'} />
      <LanguageSwitch />
    </View>
  );
};

export default ProfileScreen;
