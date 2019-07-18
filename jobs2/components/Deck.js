import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, UIManager, LayoutAnimation } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { },
          noMoreCards: () => {},
          keyProp: 'id'
    }

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: -1 * gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                }
                else {
                    this.resetPosition();
                }

            }
        });
        this.state = { panResponder, position, index: 0 }; //we never call setState on panResponder or position
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? -SCREEN_WIDTH : SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ?
            onSwipeRight(item) : onSwipeLeft(item)
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['120deg', '0deg', '-120deg']
        })
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.noMoreCards();
        }
        return this.props.data.map((item, i) => {
            if (i < this.state.index) return null;
            if (i === this.state.index) {
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}
                        style={[this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 }]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View key={item[this.props.keyProp]} style={[styles.cardStyle, { zIndex: i * -1 }, { top: 10 * (i - this.state.index) }]}>
                    {this.props.renderCard(item)}
                 </Animated.View>
            );
        }).reverse();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    },
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    }
}

export default Deck;
