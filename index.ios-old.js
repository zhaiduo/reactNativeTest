/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  pbFont: {
    fontFamily: 'Cochin',
    color: '#00c0a0',
    fontSize: 20
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} />
        <Text style={[styles.pbFont, styles.welcome]}>
          Welcome to visit!
        </Text>
        <Text style={[styles.pbFont, styles.instructions]}>
          To get started, edit index.ios.js
        </Text>
        <Text style={[styles.pbFont, styles.instructions]}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
