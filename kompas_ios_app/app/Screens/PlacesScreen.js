import React from 'react';
import {
  Text,
  View
} from 'react-native';

export default class PlacesScreen extends React.Component {
    constructor(props) {
      super()
      this.place = props;
      this.name = place.name;

    }
    render(){
      var place = this.place
      return (
        <View>
          <Text>{place.name} - {place.type} - {place.address} - {place.city} - {place.rating}</Text>
        </View>
      );
    }
}
