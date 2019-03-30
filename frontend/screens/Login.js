import React from "react"
import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native"
import {SafeAreaView} from 'react-navigation'
import {NavbarStyles} from "../styles/navbarStyles";
import PhoneInput from "react-native-phone-input";
import {Button} from "react-native-elements";
import {autobind} from "core-decorators";


const {fontScale, height, width} = Dimensions.get('window')

@autobind
export class Login extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Login",
            headerStyle: NavbarStyles.headerStyle,
            headerTitleStyle: NavbarStyles.headerTitleStyle,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            user: {}
        }
    }


    componentDidMount() {
        fetch('http://www.mocky.io/v2/5c9f38e23000000547ee993f').then(response => {
            this.setState({
                user: response
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
        console.log(this.state.user);
        return (
            <SafeAreaView style={styles.SafeArea}>
                <StatusBar barStyle={'dark-content'}/>
                <View style={styles.Main}/>
                <View style={styles.Main}>
                    <Text style={{fontWeight: '700', fontSize: 35,}}>Circles Life</Text>
                    <Text style={{fontWeight: '500', fontSize: 20,}}>Welcome</Text>
                    <PhoneInput ref='phone'/>
                    <Button loading={this.state.isLoading} title={'Login'} onPress={this.onLoginPressed}/>
                </View>
                <View style={styles.Main}/>
            </SafeAreaView>
        )
    }

    onLoginPressed() {
        this.setState({
            isLoading: true,
        })
        setTimeout(() => {
            this.props.navigation.navigate('Dashboard')
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
        alignItems: 'stretch',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
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
})
