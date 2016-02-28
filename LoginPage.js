
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    /*marginTop: 65,*/
    alignItems: 'center',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  logo: {
    margin: 15,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    margin: 5,
    alignSelf: 'stretch',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 2,
    color: '#008000',
    backgroundColor: '#efefef',
  }
});

function urlForQueryAndPage(postData, pageNumber) {
  var data = {
        //X-CSRFToken:PYqaGATf5pAU45tT2cNs2AOzyAt8V0aw
      'csrfmiddlewaretoken': 'PYqaGATf5pAU45tT2cNs2AOzyAt8V0aw',
  };
  for(var k in postData){
    data[k] = postData[k];
  }
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return '/vip/get_user_info/?' + querystring;
};

class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        passwd:'',
        loading: false,
      };
    }

    onUsernameChanged(event) {
      console.log('onUsernameChanged');
      this.setState({ username: event.nativeEvent.text });
      console.log(this.state.username);
    }

    onPasswdChanged(event) {
      console.log('onPasswdChanged');
      this.setState({ passwd: event.nativeEvent.text });
      console.log(this.state.passwd);
    }

    _postLogin(query) {
      this.setState({ loading: true });
      console.log(query);
      fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'failed ' + error
       }));
    }

    _handleResponse(response) {
      this.setState({ isLoading: false , message: '' });
      //alert('1');
      /*if (response.application_response_code.substr(0, 1) === '1') {
        console.log('Properties found: ' + response.listings.length);
      } else {
        this.setState({ message: 'Location not recognized; please try again.'});
      }*/
    }

    onLogin() {
      var query = urlForQueryAndPage({
        'username':this.state.username,
        'password':this.state.passwd
      }, 1);
      this._postLogin(query);
    }

  render() {
    var spinner = this.state.loading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('./logo.png')} />
            {spinner}

            <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.onUsernameChanged.bind(this)}
            placeholder='用户名'/>

            <TextInput
            style={styles.searchInput}
            value={this.state.passwd}
            onChange={this.onPasswdChanged.bind(this)}
            placeholder='密码'/>

            <TouchableHighlight style={styles.button}
              onPress={this.onLogin.bind(this)}
                underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>登录</Text>
            </TouchableHighlight>

            <Text style={styles.description}>
              2016@copyright.
            </Text>

          </View>
    );
  }
}

module.exports = LoginPage;
