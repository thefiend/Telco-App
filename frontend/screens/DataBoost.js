import React from "react"
import { TouchableOpacity, Text, Dimensions, StatusBar, StyleSheet, View } from "react-native"
import { Button } from "react-native-elements";
import { SafeAreaView } from 'react-navigation'
import { NavbarStyles } from "../styles/navbarStyles";
import { Card } from "react-native-elements";
import Slider from "react-native-slider";
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';


const { fontScale, height, width } = Dimensions.get('window')

export class Dashboard extends React.Component {
    state = {
        value: 1,
        isModalVisible: false,
        priceData: 2,
        priceCalltime: 4,
        priceSms: 6,
        data: 0,
        calltime: 0,
        sms: 0,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: "My Dashboard",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.headerTitleStyle,
        }
    }

    constructor(props) {
        super(props);
    }


    componentDidMount() {

        // Additional component initialization can go here.
        // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    }

    // dispatching an action based on state change
    componentWillUpdate(nextProps, nextState) {
        //if (nextState.open == true && this.state.open == false) {
        //  this.props.onWillOpen();
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        // if (prevProps.data !== this.props.data) {
        //   this.chart = c3.load({
        //    data: this.props.data
        //    });
        //  }
    }

    render() {

        return (
            <SafeAreaView style={styles.SafeArea}>
                <StatusBar barStyle={'dark-content'} />
                <View style={styles.Main}>
                    <Card title={'Data'}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View>
                                <Progress.Pie progress={0.8} size={50} />
                            </View>
                            <View>
                                <Text>8GB</Text>
                                <Text>out of 10GB</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text>Boost</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Card title={'Talktime'}>
                            <View>
                                <Progress.Pie progress={0.8} size={50} />
                            </View>
                            <View>
                                <Text>10mins</Text>
                                <Text>out of 500mins</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text>Boost</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                        <Card title={'SMS'}>
                            <View>
                                <Progress.Pie progress={0.8} size={50} />
                            </View>
                            <View>
                                <Text>10</Text>
                                <Text>out of 10000 SMSs</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text>Boost</Text>
                                </TouchableOpacity>
                            </View></Card>
                    </View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <Card title={'Data Boost'}>
                            <Button
                                style={styles.marginTop}
                                title="4G Boost"
                                color="#841584"
                                accessibilityLabel="4GB Boost"
                            />
                            <Button
                                style={styles.marginTop}
                                title="8GB Boost"
                                color="#841584"
                                accessibilityLabel="8GB Boost"
                            />
                            <Button
                                onPress={this._toggleModal}
                                style={styles.marginTop}
                                title="Cancel"
                                accessibilityLabel="Cancel"
                            />
                        </Card>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    Main: {
        flex: 1,
    },
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderBottomWidth: 0,
    },
    navigationBarItem: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16.00,
        fontFamily: "SFProDisplay-Thin"
    },

    marginTop: {
        marginTop: 16,
    }
})
