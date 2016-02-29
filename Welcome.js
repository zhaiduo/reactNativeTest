'use strict';


var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

class Welcome extends Component {


  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }


  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          <Text style={{textAlign:'center'}}>Welcome</Text>
        </View>
      </TouchableHighlight>
    );
  }


  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }


}


module.exports = Welcome;