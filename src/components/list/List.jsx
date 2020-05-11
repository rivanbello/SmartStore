import React, { useState, useEffect, useContext } from 'react';
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import ListHeader from './ListHeader';
import Item from './Item';
import { UserContext } from '../../context';

const screenWidth = Math.round(Dimensions.get('window').width);

const List = ({ navigation, list }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <ScrollView style={styles.container}>
      {userInfo.categories && userInfo.categories.map((category) => <> 
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
          horizontal
          data={
            list
              .filter(({ categoryId, categoryName}) => 
                category === `Categoria ${categoryId}`
                || category === categoryName
              )
            .slice(0, 10)}
          // contentContainerStyle={styles.content}
          keyExtractor={item => item.id}
          renderItem={({item: { ageRestricted, description, categoryName, price, quantity, imageUrl } = {}} ) => (
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
              })}
            />
          )}
        />
      </>)}
    </ScrollView>
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
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
  }
});