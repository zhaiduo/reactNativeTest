'use strict';

//http://stackoverflow.com/questions/35471326/react-native-flexbox-align

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} = React;

var width = Dimensions.get('window').width - 20
var circles = [1, 2, 3, 4, 5, 6, 7, 8]

var CirclePage = React.createClass({

  render() {

    let Circles = circles.map((c, i) => {
    return <View key={ i } style={ styles.cContainer }><View style={ styles.c }></View></View>
    })

    return (
      <View style={{ flex:1 }}>
        <ScrollView style={{ flex:1 }}>
         <View style={ styles.container }>{ Circles }</View>
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cContainer: {
    margin: 10,
    height:width / 2 - 10,
    width: width / 2 - 10
  },
  c: {
    backgroundColor: '#ededed',
    borderRadius: width / 4,
    flex:1
  }

});

module.exports = CirclePage;