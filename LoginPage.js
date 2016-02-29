
'use strict';

var Config = require('./_config');

var AV = require('avoscloud-sdk').AV;

AV.initialize(Config.AppID, Config.AppKey);

var Item = AV.Object.extend('Item');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AlertIOS,
  Image,
  Dimensions,
  Component
} = React;

var containerH = Dimensions.get('window').height - 65
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
    height: containerH,
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
  return '/?' + querystring;
};

var LayoutComponent = require('./LayoutComponent');

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
      //console.log('onUsernameChanged');
      this.setState({ username: event.nativeEvent.text });
      //console.log(this.state.username);
    }

    onPasswdChanged(event) {
      //console.log('onPasswdChanged');
      this.setState({ passwd: event.nativeEvent.text });
      //console.log(this.state.passwd);
    }

    _postLogin(query) {

      var _this = this;
      _this.setState({ loading: true });
      //console.log(query);

      //https://blog.leancloud.cn/3993/

      /*var item = new Item();
      item.set('content', query);
      item.save().then(function() {
        AlertIOS.alert('保存成功');
      }).catch(function(e) {
        AlertIOS.alert('保存失败', e.message);
      });*/

      //https://leancloud.cn/docs/js_guide.html#检索对象
      var q = new AV.Query(Item);
      q.get('56d5bd16816dfa0051c49e47').then(function(item) {

        _this.setState({
          username: '',
          passwd:'',
          loading: false,
        });

        // 成功获得实例
        var content = item.get('content');
        if(content == query){

          _this.props.navigator.push({
            title: '欢迎～',
            component: LayoutComponent,
            passProps: {listings: [item]}
          });
        }else{
          AlertIOS.alert("登录失败");
        }


      }, function(error) {
        AlertIOS.alert('Error: ' + error.code + ' ' + error.message);
      });

      /*var q = new AV.Query('Item');
      q.equalTo('content', query);
      q.find().then(function(results) {
        AlertIOS.alert(results.length);
        // 处理返回的结果数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          AlertIOS.alert(object.id + ' - ' + object.get('content'));
        }
      }, function(error) {
        AlertIOS.alert('Error: ' + error.code + ' ' + error.message);
      });*/

    }

    _handleResponse(response) {
      this.setState({ isLoading: false , message: '' });

      AlertIOS.alert(response);
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
      //AlertIOS.alert('query: '+query);
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
