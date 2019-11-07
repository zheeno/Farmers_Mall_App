import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { StyleProvider, Container, Text, View, Button, Icon, Thumbnail, Spinner } from 'native-base';
import { ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import Parse from 'parse/react-native';
import { CusListItem } from './components/MiscComponents';

export default class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            username: null,
            email: null,
            fetching: true,
            refreshControl: false,
            walletBalance: 0,
            ledgerBalance: 0
        }
        this.getWalletBalance = this.getWalletBalance.bind(this);
    }

    componentDidMount() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            // do stuff with the user
            this.setState({
                userId: currentUser.id,
                username: currentUser.getUsername(),
                email: currentUser.getEmail()
            });
            // get user's wallet balance
            this.getWalletBalance(currentUser.id, true);
        }
    }

    async getWalletBalance(userId, showLoader) {
        this.setState({ fetching: showLoader, refreshControl: !showLoader })
        var Transactions = Parse.Object.extend("Transactions");
        var query = new Parse.Query(Transactions);
        query.equalTo("user_id", userId);
        const object = await query.find();
        console.log("object", object)
        var debit = 0, credit = 0, balance = 0;
        // loop through object to get balance
        for (i = 0; i < object.length; i++) {
            if (object[i].get("is_credit")) {
                // credit transaction
                credit += object[i].get("amount");
            } else {
                // debit transaction
                debit += object[i].get("amount");
            }
        }
        balance = credit - debit;
        this.setState({ walletBalance: balance, ledgerBalance: balance, fetching: false, refreshControl: false });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <StyleProvider style={getTheme(material)}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshControl}
                            onRefresh={() => this.getWalletBalance(this.state.userId, false)}
                        />
                    }>
                    <Container>
                        <View style={{ flex: 1 }}>
                            <View style={[styles.bgLeafGreen, { padding: 20, paddingTop: 80, flexDirection: "row" }]}>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Thumbnail
                                        circular
                                        source={require('../assets/img/white_onion_leaf.jpg')}
                                    />
                                </View>
                                <View style={{ flex: 4, paddingHorizontal: 10 }}>
                                    <Text style={[{ fontSize: 20 }, styles.whiteText]}>{this.state.username}</Text>
                                    <Text style={[styles.greyText, { fontSize: 15 }]}>{this.state.email}</Text>
                                </View>
                            </View>
                            <View style={[styles.bgWhite, {
                                padding: 20,
                                paddingVertical: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }]}>
                                {this.state.fetching ?
                                    <Spinner color={styles.greyText.color} size={50} />
                                    :
                                    <React.Fragment>
                                        <Text style={{ fontSize: 25 }}>&#8358;{this.state.walletBalance}</Text>
                                        <Text note>Wallet Balance</Text>
                                        <Text style={{ fontSize: 18, marginTop: 10 }}>&#8358;{this.state.ledgerBalance}</Text>
                                        <Text note>Ledger Balance</Text>
                                    </React.Fragment>
                                }
                            </View>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ flex: 1, padding: 5 }}>
                                    <Button block iconRight light>
                                        <Text>Fund Wallet</Text>
                                        <Icon name={"ios-wallet"} />
                                    </Button>
                                </View>
                                <View style={{ flex: 1, padding: 5 }}>
                                    <Button block iconRight style={[styles.bgLeafGreen]}>
                                        <Text>Withdraw</Text>
                                        <Icon name={"ios-cash"} />
                                    </Button>
                                </View>
                            </View>
                            <View>
                                <CusListItem
                                    action={() => navigate("OrderList")}
                                    hasIcon={true}
                                    iconName={"ios-list"}
                                    iconBgColor={styles.bgLeafGreen.backgroundColor}
                                    text={"Orders"} />
                                <CusListItem
                                    action={() => navigate("Transactions")}
                                    hasIcon={true}
                                    iconName={"ios-clock"}
                                    iconBgColor={styles.bgLeafGreen.backgroundColor}
                                    text={"Transaction History"} />
                                <CusListItem
                                    action={() => alert(1)}
                                    hasIcon={true}
                                    iconName={"ios-person"}
                                    iconBgColor={styles.bgLeafGreen.backgroundColor}
                                    text={"Account Settings"} />
                            </View>
                        </View>
                    </Container>
                </ScrollView>
            </StyleProvider>
        );
    }
}
