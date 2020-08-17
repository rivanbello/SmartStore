import React, { useContext } from 'react';
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import ListHeader from './ListHeader';
import Item from './Item';
import { UserContext } from '../../context';
import { SCREEN_WIDTH } from '../../constants';

const screenWidth = Math.round(Dimensions.get('window').width);

const List = ({ navigation, list }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  const filterListAndSlice = (list) => {
    let filteredList = list
      .filter(({ categoryId, categoryName}) => 
        category === `Categoria ${categoryId}`
        || category === categoryName
      );
      if (filteredList.length > 4) filteredList = filteredList.slice(0, 5);
    return filteredList;
  }

  return (
    <FlatList style={styles.container}
      data={Array.isArray(userInfo.categories) && userInfo.categories}
      renderItem={({ item: category }) => <> 
        <ListHeader
          label={category}
          expandLabel="Ver tudo"
          style={styles.header}
          expandOnPress={() => navigation.navigate('Category', {
            // categoryName: categoryName || `Categoria ${categoryId}`
            category,
            list: list
            .filter(({ categoryId, categoryName}) => 
              category === `Categoria ${categoryId}`
              || category === categoryName
            )
          })}
        />
        <FlatList
          style={styles.list}
          viewabilityConfig = {{
            itemVisiblePercentThreshold: 50,
          }}
          horizontal
          data={
            list
              .filter(({ categoryId, categoryName}) => 
                category === `Categoria ${categoryId}`
                || category === categoryName
              )
            .slice(0, 5)}
          // contentContainerStyle={styles.content}
          keyExtractor={item => item.id}
          renderItem={({item: { id, ageRestricted, description, categoryName, price, quantity, imageUrl } = {}} ) => (
            <Item
              img={imageUrl}
              style={styles.item} 
              description={description}
              category={categoryName}
              price={price}
              qty={quantity}
              onPress={() => navigation.navigate('Product', {
                stock: quantity == 0 ? false : true,
                name: description,
                price,
                ageRestricted,
                qty: quantity,
                imageUrl,
                id,
              })}
            />
          )}
        />
      </>}
    />
  )
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  list: {
    marginBottom: 30,
  },
  header: {
    marginBottom: 16,
  },
  item: {
    marginRight: screenWidth > 550 ? (screenWidth - (74 * 4) - 40) / 3 : 0,
  }
});