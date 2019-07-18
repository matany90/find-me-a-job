import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import {connect} from 'react-redux';
import {fetchJobs} from '../Actions';
import {Icon, Button} from 'react-native-elements';

class MapScreen extends Component {

    static navigationOptions = () => ({
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />;
          }
    })
    state = {
        mapLoaded: false,
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.04,
            longitudeDelta: 0.09,
        }
    }

    componentDidMount() {
        this.setState({mapLoaded: true})
    }

    onRegionChangeComplete = (region) => {
        
        this.setState({region});
    }

    handlePress = () => {
        this.props.fetchJobs(this.state.region, () => {this.props.navigation.navigate('deck')})
    }

    render() {
        if(!this.state.mapLoaded) {
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            <View style={styles.mapContainer}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChangeComplete = {this.onRegionChangeComplete}
                />
                <View style ={styles.buttonConteiner}>
                <Button
                title='Search This Area'
                backgroundColor="#009688"
                icon={{name: 'search'}}
                onPress={this.handlePress}
                />
                </View>
            </View>
        );
    }
}

const styles = {
    mapContainer: {
        flex: 1
    },
    buttonConteiner: {
        position: 'absolute',
        bottom: 20,
        left:0,
        right: 0
    }
}


export default connect(null,{fetchJobs})(MapScreen);
