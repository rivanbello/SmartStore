import React, { useState, useEffect, useContext } from 'react';
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import all from '../../client/list'
import ListHeader from './ListHeader';
import Item from './Item';
import { UserContext } from '../../context';

const screenWidth = Math.round(Dimensions.get('window').width);

const List = () => {
  const [list, setList] = useState([]);
  const [userInfo, setUserInfo] = useContext(UserContext);
  
  useEffect(() => {
    all({ pointOfSaleId: 1 }).then(response => {
      setList(response);
    })
  }, []);

  return (
    <ScrollView style={styles.container}>
      {userInfo.categories && userInfo.categories.map((category) => <> 
        <ListHeader label={category} expandLabel="Ver tudo" style={styles.header}/>
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
          renderItem={({item: { description, categoryName, price, slots } = {}} ) => (
            <Item
              style={styles.item} 
              description={description}
              category={categoryName}
              price={price}
              qty={slots && slots[0].quantity}/>
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
    marginBottom: 10,
  },
  header: {
    marginBottom: 16,
  },
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
  }
});