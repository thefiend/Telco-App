import React from "react";
import { TouchableOpacity, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-navigation';
import { NavbarStyles } from "../styles/navbarStyles";
import { Button, Card, Icon } from "react-native-elements";
import ProgressCircle from 'react-native-progress-circle';
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
        this.state = {
            dashboard: null,
            selectedOption: null,
            user: null,
        }
    }


    componentDidMount() {
        fetch('http://www.mocky.io/v2/5c9f38e23000000547ee993f').then(response => {
            this.setState({
                user: JSON.parse(response._bodyInit)
            })
        })
        fetch('http://www.mocky.io/v2/5c9f3cb1300000e54eee9947').then(res => {
            this.setState({
                dashboard: JSON.parse(res._bodyInit)
            }, () => {
                this.setState({
                    selectedOption: this.state.dashboard[0]
                })
            })
        })
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
        console.log(this.state.selectedOption)
        console.log(this.state.user)
        return (
            <SafeAreaView style={styles.SafeArea}>
                <StatusBar barStyle={'dark-content'} />
                <View style={styles.Main}>
                    <Text style={{
                        fontSize: 35,
                        fontWeight: '700',
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 20,
                    }}>{this.state.user ? this.state.user.name : null}</Text>
                    <Card title={'Data'}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                            <ProgressCircle
                                percent={30}
                                radius={50}
                                borderWidth={8}
                                color="#3399FF"
                                shadowColor="#999"
                                bgColor="#fff"
                            >
                                <Text
                                    style={{
                                        fontSize: 12,

                                    }}>{this.state.user ? this.state.user.data.used : null} / {this.state.user ? this.state.user.data.avaliable : null} {this.state.user ? this.state.user.data.unit : null}</Text>
                            </ProgressCircle>
                            <Button
                                onPress={this._toggleModal}
                                icon={
                                    <Icon
                                        type={'antdesign'}
                                        name="plus"
                                        size={15}
                                        color="white"
                                    />} />
                        </View>
                    </Card>
                    <View style={{ flexDirection: 'row', }}>
                        <Card title={'SMS'}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                                <ProgressCircle
                                    percent={30}
                                    radius={50}
                                    borderWidth={8}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text
                                        style={{ fontSize: 12 }}>{this.state.user ? this.state.user.sms.used : null} / {this.state.user ? this.state.user.sms.avaliable : null} {this.state.user ? this.state.user.sms.unit : null}</Text>
                                </ProgressCircle>
                                <Button
                                    onPress={this._toggleModal}
                                    icon={
                                        <Icon
                                            type={'antdesign'}
                                            name="plus"
                                            size={15}
                                            color="white"
                                        />} />
                            </View>
                        </Card>
                        <Card title={'Talktime'}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                                <ProgressCircle
                                    radius={50}
                                    borderWidth={8}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text
                                        style={{ fontSize: 12 }}>{this.state.user ? this.state.user.voice.used : null} / {this.state.user ? this.state.user.voice.avaliable : null} {this.state.user ? this.state.user.voice.unit : null}</Text>
                                </ProgressCircle>
                                <Button
                                    onPress={this._toggleModal}
                                    icon={
                                        <Icon
                                            type={'antdesign'}
                                            name="plus"
                                            size={15}
                                            color="white" />} />
                            </View>
                        </Card>

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
                {/*{this.renderSimplePicker()}*/}
            </SafeAreaView>
        )
    }

    renderSimplePicker() {
        return (
            <SimplePicker
                ref={'picker2'}
                options={this.state.dashboard}
                itemStyle={{
                    fontSize: 25,
                    color: 'red',
                    textAlign: 'left',
                    fontWeight: 'bold',
                }}
                onSubmit={(option) => {
                    this.setState({
                        selectedOption: option,
                    });
                }}
            />
        )
    }

    onDataPress() {
        this.setState({
            isLoading: true,
        })
        setTimeout(() => {
            this.props.navigation.navigate('DataBoost')
        }, 1500)
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
