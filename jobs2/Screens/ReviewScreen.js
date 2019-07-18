import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
        headerRight: <Button
            onPress={() => navigation.navigate('settings')}
            title={'Settings'}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0, 122, 255,1)"
        />

    })

    renderLikedJobs() {

        return this.props.likedJobs.map(job => {
            const initialregion = {
                latitude: job.latitude,
                longitude: job.longitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
            }
            return (
                <Card
                title={job.jobtitle}
                key={job.jobkey}
                >
                    <View style={{ height: 200 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialregion}
                    />
                        <View style={styles.companyConteiner}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>>{job.formattedRelativeTime}</Text>

                        </View>

                        <Button
                            title='Apply'
                            onPress={() => Linking.openURL(job.url)}
                        />
                    </View>

                </Card>

            );
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { likedJobs: state.like }
}

const styles = {
    companyConteiner: {
        marginBottom: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
}


export default connect(mapStateToProps)(ReviewScreen);
