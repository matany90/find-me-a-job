import React, { Component } from 'react';
import _ from 'lodash';
import { AppLoading } from 'expo';
import { View, Text, AsyncStorage } from 'react-native';
import Slide from '../components/Slide';
import { connect } from 'react-redux';
import { exsitingToken } from '../Actions';


const SLIDE_DATA = [
    { text: 'ברוך הבא ל- JobApp', color: '#03A9F4' },
    { text: 'אפליקציה למציאת העבודה הבאה שלך', color: '#009688' },
    { text: 'הגדר את מיקומך, והתחיל לחפש!', color: '#03A9F4' }
]

class WelcomeScreen extends Component {
    componentDidMount() {
        this.props.exsitingToken(this.props.navigation);
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.props.fbToken)) {
            return <AppLoading />
        }
        return (
            <Slide
                data={SLIDE_DATA}
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { fbToken: auth.fbToken };
}

export default connect(mapStateToProps, { exsitingToken })(WelcomeScreen);
