import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { cleanLikes } from '../Actions';
import { Button } from 'react-native-elements';


class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
    })

    handlePress = () => {
        this.props.cleanLikes();
    }


    render() {
        return (
            <View>
                <Button
                icon={{name: 'delete-forever'}}
                large
                backgroundColor='red'
                title='Reset Liked Jobs'
                onPress = {this.handlePress}
                />
            </View>
            );
        }
    }
    
export default connect(null, {cleanLikes})(SettingsScreen);
