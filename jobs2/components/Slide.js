import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slide extends Component {

    renderButton(index) {
        const { data } = this.props;
        if (index === data.length - 1) {
            return (
                <Button
                    title='המשך'
                    raised
                    buttonStyle={styles.buttonStyles}
                    onPress={this.props.onComplete}
                />
            );
        }
        return null;
    }


    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={{ flex: 1, backgroundColor: slide.color }}>
                    <View key={slide.text} style={styles.slideContainer}>
                        <Text style={styles.slideText}>
                            {slide.text}
                        </Text>
                        <View style={styles.buttonConteiner}>
                        {this.renderButton(index)}
                        </View>
                    </View>
                    <View style={styles.circlesConteiner}>
                        <View style={[styles.circle, index === 0 ? { backgroundColor: '#0288D1' } : { backgroundColor: 'grey' }]} />
                        <View style={[styles.circle, index === 1 ? { backgroundColor: '#0288D1' } : { backgroundColor: 'grey' }]} />
                        <View style={[styles.circle, index === 2 ? { backgroundColor: '#0288D1' } : { backgroundColor: 'grey' }]} />
                    </View>
                </View>
            );
        })
    }

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {

    slideText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    slideContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 4,
        width: SCREEN_WIDTH

    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'grey',
        margin: 10
    },
    circlesConteiner: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    buttonConteiner: {
        margin: 20
    },
    buttonStyles: {
        backgroundColor: '#0288D1',
    }
}

export default Slide;