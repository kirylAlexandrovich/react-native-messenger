import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { screenWidth } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default Chat = ({ currentMessage, messages, email, onChangeText, onSendMessage }) => {

  renderDate = (date, email) => {
    return (
      <View>
        <View style={{position: "absolute"}}>
          <Text style={styles.messageEmail}>
            {email && email}
          </Text>
        </View>
        <Text style={styles.time}>
          {date}
        </Text>
      </View>
    );
  }

  renderMessage = (message) => {
    const item = message.item;
    const inMessage = item.email === email;
    const itemStyle = inMessage ? styles.itemOut : styles.itemIn;
    const time = item.time.match(/\d{2}:\d{2}/)[0];
    
    return (
      <View style={[styles.item, itemStyle]}>
        {!inMessage && this.renderDate(time, item.email)}
        <View style={[styles.balloon]}>
          <Text>{item.mess}</Text>
        </View>
        {inMessage && this.renderDate(time)}
      </View>
    )
  }

  keyExtractor = (item, index) => index.toString();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list}
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderMessage}
        inverted={true}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            onSubmitEditing={onSendMessage}
            value={currentMessage}
            placeholder="Write a message..."
            underlineColorAndroid='transparent'
            onChangeText={(text) => { onChangeText(text) }} />
        </View>
        <TouchableOpacity style={styles.btnSend} onPress={onSendMessage}>
          <Icon name="paper-plane" size={33} color="white" />
          {/* <Image source={require('../images/icons/round_send_white_36dp.png')} style={styles.iconSend} /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const maxMsgWidth = screenWidth - 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f6"
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    position: "relative",
    bottom: 0,
    flexDirection: 'row',
    height: 55,
    backgroundColor: "#e1e2e1",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    width: 40,
    height: 40,
    backgroundColor: "#00aeff",
    borderRadius: 360,
    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    flex: 1,
  },
  balloon: {
    maxWidth: maxMsgWidth,
    minWidth: 100,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  itemOut: {
    alignSelf: 'flex-end',
    borderRadius: 30,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    // borderTopEndRadius: 300,
    // borderBottomRightRadius: 300,
    // borderBottomLeftRadius: 300,
  },
  messageEmail: {
    position: "absolute",
    marginLeft: 5,
    fontSize: 10,
    color: "#808080",
  }
});
