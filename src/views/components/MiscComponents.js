import React, { Component } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  Text,
  View,
  Item,
  Form,
  Icon,
  Button,
  Input,
  Left,
  Right,
  Body,
  Container,
  Spinner,
  Row,
  List,
  Card,
  CardItem,
  H2,
  Header,
  Badge,
  H1,
  H3,
  Radio,
  Footer,
  Label,
  ListItem
} from 'native-base';
import { styles } from '../../../native-base-theme/variables/Styles';

export const CusListItem = props => {
  return (
    <ListItem icon onPress={props.action} disabled={props.disabled}>
      {props.hasIcon ?
        <Left>
          <Button style={{ backgroundColor: props.iconBgColor }}>
            <Icon active name={props.iconName} />
          </Button>
        </Left>
        : null}
      <Body>
        <Text>{props.text}</Text>
      </Body>

      <Right>
        <Icon active name="ios-arrow-forward" />
      </Right>
    </ListItem>
  );
}

export const LoaderOverlay = props => {
  return (
    <View
      style={[
        {
          zIndex: 20,
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignContent: 'center',
          aliginSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.80)',
        },
      ]}>
      {/* <Image source={require('../../assets/img/liquid_circle_loader.gif')} /> */}
      <View
        style={{
          backgroundColor: 'transparent',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Spinner color={styles.greenText.color} />
            <Text style={[styles.greenText, { marginLeft: 5, fontSize: 16 }]}>
              {props.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const MiscModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={props.togModal}
      transparent={props.transparent}
      style={props.style}>
      {props.hasHeader ? (
        <View transparent style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Button onPress={props.togModal} icon transparent>
              <Icon style={{ color: '#333' }} name="md-arrow-back" />
            </Button>
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
            <H3 style={{ color: '#333' }}>{props.title}</H3>
          </View>
        </View>
      ) : null}
      <View style={{ flex: 1 }}>{props.children}</View>
    </Modal>
  );
};

export const ErrorOverlay = props => {
  return (
    <View
      style={[
        {
          flex: 1,
          zIndex: 20,
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.80)',
        },
      ]}>
      <View
        style={{
          backgroundColor: 'transparent',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={[{ justifyContent: "center" }]}>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 5, borderRadius: 20, padding: 20, alignItems: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#f7f7f7", height: 60, width: 60, borderRadius: 100, marginTop: -50 }}>
              <Icon name={"ios-information-circle-outline"} style={styles.greenText} />
            </View>
            <View style={{ marginVertical: 0, minHeight: 100 }}>
              <H3 style={[styles.greenText, { alignSelf: "center", marginTop: 10 }]}>{props.title}</H3>
              <Text style={[styles.greenText, { fontSize: 16, alignSelf: "center", textAlign: "center" }]}>{props.errorMessage}</Text>
              {props.action != null ?
                <View>{}
                  <Button
                    onPress={props.action}
                    iconLeft rounded
                    style={[styles.bgLeafGreen, { alignSelf: "center", marginVertical: 10 }]}>
                    <Icon name={"ios-refresh"} />
                    <Text>Refresh</Text>
                  </Button></View>
                : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
