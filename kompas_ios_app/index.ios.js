/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Navigator,
  ListView
} from 'react-native';

import PlacesScreen from './app/Screens/PlacesScreen.js'
import UsersScreen from './app/Screens/UsersScreen.js'

export default class kompas_ios_app extends Component {
  render() {
    const routes = [
      {
        title: 'Home',
        index: 0,
        name: 'home'
      },
      {title: 'List Users', index: 1, name: 'list_users'},
      {title: 'List Places', index: 2, name: 'list_places'},
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          {
            if (route.name === 'home') {
              return <HomeView navigator={navigator} title={route.title} routes={routes} />; // see below
            } else if (route.name === 'list_users') {
              return <CommonListView navigator={navigator} title={route.title} type='users' routes={routes}/>; // see below
            } else if (route.name === 'list_places') {
              return <CommonListView navigator={navigator} title={route.title} type='places' routes={routes}/>; // see below
            }
          }
        }
      />
    );
  }
}

function getData(type) {
  return fetch('http://localhost:3000/' + type)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}


// Did not manage to use push and pop so need a back button
function HomeView(props) {
  function viewListUsers() {
    props.navigator.replace(props.routes[1]);
  }

  function viewListPlaces() {
    props.navigator.replace(props.routes[2]);
  }

  function sendData() {
    fetch('http://localhost:3000/sent', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'KompasApp',
      })
    })
    .then(function(res){
      if (res.status === 200) {
        Alert.alert("Requête envoyée avec succès")
      }
    })
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={viewListUsers}
        title="View Users"
        color="purple"
        accessibilityLabel="List all users of the application"
      />

      <Button
        onPress={viewListPlaces}
        title="View Places"
        color="#841004"
        accessibilityLabel="List all places of the application"
      />

      <Button
        onPress={sendData}
        title="Send"
        color="#761084"
        accessibilityLabel="Send data to our server"
      />
    </View>
  );
}


class CommonListView extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.type = props.type;
    this.state = {
      dataSource: null,
      ready: false
    }
    var self = this;
    this.backHome = function() {
      self.props.navigator.replace(self.props.routes[0]);
    }
  }

  componentWillMount() {
    var self = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    getData(this.type)
      .then(function(res) {
        console.log(res);
        self.state = {
          dataSource: ds.cloneWithRows(res),
          ready: true
        };

      })
      .done(function(){
        self.render();
      });
  }

  render() {
    if (!this.state.ready){
      return (<View style={styles.list_container}><Text>Loading</Text></View>)
    } else {
      return (
        <View style={styles.container}>
          <Button
            onPress={this.backHome}
            title="Back"
            color="purple"
            accessibilityLabel="backHome"
          />
          <ListView
            dataSource= {this.state.dataSource}
            renderRow={(rowData) => {
              if (rowData.rating) {
                return (
                  <View style={styles.container}>
                    <Text>{rowData.name} - {rowData.type} - {rowData.address} - {rowData.city} - {rowData.rating}</Text>
                  </View>
                )
                //return <PlacesScreen place={rowData}/>
              } else {
                return (
                  <View style={styles.container}>
                    <Text>{rowData.first_name} - {rowData.last_name} - {rowData.age} - {rowData.city}</Text>
                  </View>
                )
              }
            }}
          />

        </View>
      );
    }
  }


}



const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list_container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#3638e5'
  }
});

const onPressViewUsers = () => {
  Alert.alert('See Users YEAH');
};

const onPressViewPlaces = () => {
  Alert.alert('See Places YEAH');
};

AppRegistry.registerComponent('kompas_ios_app', () => kompas_ios_app);
