import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TopHeader = () => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.menuButton}>
        <MaterialIcons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          style={styles.searchBar}
        />
      </View>

      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="shopping-cart" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginTop:40,
  },
  menuButton: {
    padding: 6,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f7',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 15,
    height: 42,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 6,
  },
  topIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 6,
  },
});

export default TopHeader;
