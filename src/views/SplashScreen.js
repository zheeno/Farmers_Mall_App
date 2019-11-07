import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { StyleProvider, Container, Text, View, Button, Icon } from 'native-base';
import { ImageBackground } from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import Parse from 'parse/react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let install = new Parse.Installation();
    install.set("deviceType", navigator.userAgent);

    install.save().then((resp) => {
      console.log('Created install object', resp);

      this.setState({
        result: 'New object created with objectId: ' + resp.id
      })
    }, err => {
      console.log('Error creating install object', err);

      this.setState({
        result: 'Failed to create new object, with error code: ' + err.message
      })
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ flex: 1 }}>
          <View>
            <ImageBackground
              source={require('../assets/img/crops_growing.jpg')}
              style={{ width: '100%', height: '100%' }}>
              <View style={[{ flex: 1 }, styles.maskDarkSlight]}>
                <View
                  style={[
                    {
                      flex: 1,
                      paddingVertical: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={[styles.introHeader, styles.centerText]}>
                    Farmers&apos; Mall
                  </Text>
                  <Text note style={{ color: '#FFF' }}>
                    We bring the farm to you
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 30,
                    paddingVertical: 40,
                  }}>
                  <Button
                    iconRight
                    block
                    rounded
                    light
                    onPress={() => {
                      navigate('Login');
                    }}>
                    <Text>Continue</Text>
                    {/* <Icon type={'fontAwesome'} name="ios-arrow-forward" /> */}
                  </Button>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
