import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['All','Assignment', 'Projects', 'Electronics', 'Home', 'Notes'];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('Assignment');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {categories.map((item, index) => {
        const isActive = item === activeCategory;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.categoryButton, isActive && styles.activeButton]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.categoryText, isActive && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: -10,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 34,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 13,
    color: '#444',
  },
  activeButton: {
    // backgroundColor: '#333',
        backgroundColor: '#007bff',

    borderColor: '#007bff',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Categories;
