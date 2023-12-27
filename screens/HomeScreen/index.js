import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import AccomdtCard from '../../components/AccomdtCard';
import mockHomeData from '../../constants/mock/mockHomeData';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommend for you</Text>
      <View style={styles.list}>
        <FlatList
          data={mockHomeData}
          renderItem={({ item }) => (
            <AccomdtCard
              data={item}
              onCardClicked={() =>
                navigation.navigate('AccomdtDetail', { data: item })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
