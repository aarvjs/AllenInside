import React from 'react';
import {  Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Invite = () => {
    return(

        <View>
<TouchableOpacity style={styles.inviteCard}>
        <View style={styles.inviteIcon}>
          <MaterialIcons name="person-add" size={24} color="white" />
        </View>
        <View style={styles.inviteTextContainer}>
          <Text style={styles.inviteTitle}>Invite Friends</Text>
          <Text style={styles.inviteSubtitle}>Invite your friends to join app</Text>
        </View>
        <MaterialIcons name="arrow-forward" size={24} color="#888" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.inviteCard}>
        <View style={styles.inviteIcon}>
          <MaterialIcons name="notifications" size={24} color="white" />
        </View>
        <View style={styles.inviteTextContainer}>
          <Text style={styles.inviteTitle}>Notification</Text>
          <Text style={styles.inviteSubtitle}>Get alerts when friends join.</Text>
        </View>
        <MaterialIcons name="arrow-forward" size={24} color="#888" />
      </TouchableOpacity>
        <TouchableOpacity style={styles.inviteCard}>
        <View style={styles.inviteIcon}>
          <MaterialIcons name="privacy-tip" size={24} color="white" />
        </View>
        <View style={styles.inviteTextContainer}>
          <Text style={styles.inviteTitle}>Privacy</Text>
          <Text style={styles.inviteSubtitle}>Your contacts stay private.</Text>
        </View>
        <MaterialIcons name="arrow-forward" size={24} color="#888" />
      </TouchableOpacity>

      </View>

    );
};

const styles = StyleSheet.create({
     inviteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginTop: 25,
    padding: 20,
    borderRadius: 25,
    elevation: 5,
  },
  inviteIcon: {
    backgroundColor: '#5E60CE',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  inviteTextContainer: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  inviteSubtitle: {
    fontSize: 14,
    color: '#888',
  },
});

export default Invite;