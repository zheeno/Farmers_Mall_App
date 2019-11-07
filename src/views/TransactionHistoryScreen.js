import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { StyleProvider, Container, Text, View, Button, Icon, Thumbnail, Spinner, List, ListItem, Left, Body, Right } from 'native-base';
import { ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../../native-base-theme/variables/Styles';
import Parse from 'parse/react-native';
import { CusListItem, LoaderOverlay } from './components/MiscComponents';

export default class TransactionHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            transactions: [],
            refreshControl: false,
        }
        this.getTransactions = this.getTransactions.bind(this);
    }

    componentDidMount() {
        this.getTransactions(true);
    }

    async getTransactions(showLoader) {
        var currentUser = Parse.User.current();
        if (currentUser) {
            this.setState({ fetching: showLoader, refreshControl: !showLoader })
            var Transactions = Parse.Object.extend("Transactions");
            var query = new Parse.Query(Transactions);
            query.equalTo("user_id", currentUser.id);
            query.descending("createdAt")
            const object = await query.find();
            this.setState({ transactions: object, fetching: false, refreshControl: false });
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <StyleProvider style={getTheme(material)}>
                <ScrollView style={{ backgroundColor: "#FFF" }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshControl}
                            onRefresh={() => this.getTransactions(false)}
                        />
                    }>
                    {this.state.fetching ? (
                        <LoaderOverlay text={"We're fetching all transactions..."} />
                    ) :
                        this.state.transactions.length == 0 ?
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    paddingTop: 50,
                                    paddingHorizontal: 10,
                                }}>
                                <Icon
                                    type={'FontAwesome'}
                                    name="info-circle"
                                    style={[styles.greyText, { fontSize: 100 }]}
                                />
                                <Text
                                    style={[
                                        styles.greyText,
                                        { textAlign: 'center', fontSize: 20 },
                                    ]}>
                                    You have no recent transactions</Text>
                            </View>
                            :
                            <View
                                style={{ backgroundColor: "#FFF" }}>
                                {/* // loop through transactions */}
                                <List>
                                    {this.state.transactions.map(item => (
                                        <ListItem
                                            key={item.id}>
                                            <Body>
                                                <Text>{item.get("is_credit") ? `Credit` : `Debit`}</Text>
                                                <Text note numberOfLines={3}>{item.get("desc")}</Text>
                                                <Text note numberOfLines={1}>
                                                    {item.get("createdAt").toString().substring(0, 25)}
                                                </Text>
                                            </Body>
                                            <Right>
                                                <Text>&#8358;{item.get("amount")}</Text>
                                            </Right>
                                        </ListItem>
                                    )
                                    )}
                                </List>
                            </View>
                    }
                </ScrollView>
            </StyleProvider>
        );
    }
}
