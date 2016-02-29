

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

/*var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: 'http://cn.bing.com/sa/simg/sw_mg_l_4d_ly_cn.png'},
];*/

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Text,
  View,
  Animated,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  rightContainer: {
    flex: 1,
    height:81,
    paddingLeft: 10,
    paddingVertical:15,
    backgroundColor:'#ff00ff'
  },
  thumbnail: {
    width: 53,
    height: 81,
    backgroundColor:'#ff0000'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 60,
    backgroundColor: '#F5FCFF',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: '#48BBEC',
  }
});


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //movies: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      bounceValue: new Animated.Value(0),
    };
  }
  // setState whenever it updates
  componentWillMount() {


  }
  componentDidMount() {
    this.fetchData();

  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('responseData',responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });

        this.state.bounceValue.setValue(4.5);
        Animated.spring(               // Base: spring, decay, timing
          this.state.bounceValue,      // Animate `bounceValue`
          {
            toValue: 0.2,              // Animate to smaller size
            friction: 10,              // Bouncier spring
            tension: 40,
          }
        ).start();

        /*this.setState({
          movies: responseData.movies,
        });*/
      })
      .done();
  }

  render() {
    //single line
    /*if (!this.state.movies) {
      return this.renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this.renderMovie(movie);*/

    //list view
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );

  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => console.log('pressed')}>
        <Animated.Image                         // Base: Image, Text, View
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        </TouchableHighlight>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>

      </View>
    );
  }
}

var LoginPage = require('./LoginPage'); //require('./CirclePage');


class AwesomeProject extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.rootContainer}
        initialRoute={{
          title: '阿蛋哥的测试',
          component: LoginPage,//Movies,
        }}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
