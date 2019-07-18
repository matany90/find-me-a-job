import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Deck from '../components/Deck';
import { MapView } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';
import { likeJob } from '../Actions';


class DeckScreen extends Component {
    static navigationOptions = () => ({
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
        }
    })
    renderCard = (job) => {
        const initialregion = {
            latitude: job.latitude,
            longitude: job.longitude,
            longitudeDelta: 0.02,
            latitudeDelta: 0.045
        }

        return (
            <Card
                title={job.jobtitle}>
                <View style={{ height: 300 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialregion}
                    />
                </View>
                <View style={styles.companyContainer}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <View style={{ height: 80 }}>
                    <Text>
                        {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                    </Text>
                </View>

            </Card>
        )
    }

    noMoreCards = () =>
        <Card title="No more jobs">
            <Button
                title='Go Back To Search!'
                icon={{ name: 'my-location' }}
                backgroundColor='#03A9F4'
                onPress={() => this.props.navigation.navigate('map')}
            />
        </Card>

    render() {
        console.log('this.props.jobsData', this.props.jobsData);
        return (
            <View style={{ marginTop: 15 }}>
                <Deck
                    data={this.props.jobsData}
                    renderCard={this.renderCard}
                    noMoreCards={this.noMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="jobkey"
                />
            </View>
        );
    }
}
const styles = {
    companyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
}


const mapStateToProps = ({ jobs }) => {
    const { jobsData } = jobs;
    return { jobsData };
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);
