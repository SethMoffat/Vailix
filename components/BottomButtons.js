import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomButtons() {
  return (
    <View style={styles.container}>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>About Us</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>Blog</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>Help</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copyright}>© 2007 Vailix</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  copyright: {
    marginTop: 10,
    fontSize: 14,
  },
});