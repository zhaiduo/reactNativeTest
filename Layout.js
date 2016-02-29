'use strict';

//http://stackoverflow.com/questions/35471326/react-native-flexbox-align

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ScrollView
} = React;

var width = Dimensions.get('window').width - 20

//item个数
var circles = "1234567".split("").map(function(x){return parseInt(x, 10)})

//每排个数: 实际每排 eachNum - 1 的数量
var eachNum = 4;
//间隔
var padding = 10;
//一排间隔调整
var paddingHFix = 2;
//item宽度调整
var itemWFix = 6;
//item高度调整
var itemHFix = -26;
//item样式间隔调整
var itemCssPaddingFix = -2;

var Layout = React.createClass({

  render() {

    let Circles = circles.map((c, i) => {
    return <View key={ i } style={ styles.cContainer }>
        <TouchableHighlight style={styles.c}
                underlayColor='#99d9f4'>
          <Text style={{ color:'#000',fontSize:40,
    textAlign:'center',fontWeight:'900' }}>{i+1}</Text>
        </TouchableHighlight>
      </View>
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
    marginTop:padding,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    height: 400
  },
  cContainer: {
    margin: padding+paddingHFix,
    height: width / eachNum - padding + itemHFix,
    width: width / eachNum - padding + itemWFix,
    backgroundColor: '#0000ff',
    position: 'relative',
    right: itemCssPaddingFix,
    //alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
    alignItems: 'center',
  },
  c: {
    backgroundColor: '#ff8800',
    /*borderRadius: width / 4,*/
    flex:1,
    justifyContent:'center',
    //alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
    //alignSelf: 'flex-start',
  }

});

module.exports = Layout;