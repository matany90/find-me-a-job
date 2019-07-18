import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin } from '../Actions';

class AuthScreen extends Component {
    componentDidMount() {
        
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
        //AsyncStorage.removeItem('fb_token')
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.fbToken) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View>
                <Text> AuthScreen </Text>
                <Text> AuthScreen </Text>
            </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { fbToken: auth.fbToken};
}

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);
