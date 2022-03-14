import * as React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

import call from 'react-native-phone-call';
export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
      userId: firebase.auth().currentUser.email,
      userImage: '',
    };
  }

  getData = async () => {
    await db
      .collection('notifications')
      .where('sendTo', '==', this.state.userId)
      .where('isRead', '==', false)
      .onSnapshot((querySnapshot) => {
        var tempArray = [];
        querySnapshot.forEach(async (doc) => {
          var notification = doc.data();
          notification['doc_id'] = doc.id;
          tempArray.push(notification);
          console.log(tempArray);
        });
        this.setState({
          notifications: tempArray,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <View style={{ marginTop: '2%', marginLeft: '5%' }}>
            <Feather
              name="arrow-left-circle"
              size={35}
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <Text style={styles.headingTest}>Notifications</Text>
        </View>

        <FlatList
          data={this.state.notifications}
          renderItem={({ item }) => {
            if (item.notificationType === 'request') {
              return (
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#00a4e4', '#04619f']}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.1 }}
                  style={{
                    margin: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <View style={styles.list}>
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>
                        {item.requesterName} wants to share a ride with you to{' '}
                        {item.toDestination} on {item.date}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{
                          marginLeft: '45%',
                          backgroundColor: '#00008099',
                          padding: 7,
                          width: '25%',
                          borderRadius: 10,
                          marginRight: 20,
                        }}
                        onPress={() => {
                          const args = {
                            number: item.requesterContact, // String value with the number to call
                            prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
                          };

                          call(args).catch((err) => {
                            console.log(err.message);
                          });
                        }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                          Call
                        </Text>
                      </TouchableOpacity>

                      <Ionicons
                        name="checkmark"
                        size={28}
                        color="#39FF14"
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          //decrease the nofoseats by 1 for the rideId, send noti to requesterId
                          this.acceptRide(item);
                        }}
                      />
                      <Entypo
                        name="cross"
                        size={29}
                        color="red"
                        onPress={() => {
                          //decrease the nofoseats by 1 for the rideId, send noti to requesterId
                          db.collection('notifications').add({
                            rideId: item.rideId,
                            sendTo: item.requesterId,
                            date: item.date,
                            rideOwner: item.sendTo,
                            notificationType: 'declined',
                            isRead: false,
                          });
                          db.collection('notifications')
                            .doc(item.doc_id)
                            .update({
                              isRead: true,
                            });
                          alert('successfully');
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>
              );
            } else {
              return (
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#f53844', '#42378f']}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.1 }}
                  style={{
                    margin: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <View style={styles.list1}>
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>
                        {item.rideOwner} has {item.notificationType} your request at {item.toDestination}.
                        {item.notificationType === 'accepted' ? (
                          <Text style={{ fontWeight: 'bold' }}>
                            Meet at {item.fromDestination} pickup point. Happy CarPooling!
                          </Text>
                        ) : (
                          <Text style={{ fontWeight: 'bold' }}>
                            Sorry try other Car Ride
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }
          }}
          keyExtractor={(index, item) => {
            index.toString();
          }}
        />
      </View>
    );
  }
  acceptRide = async (item) => {
    await db.collection('notifications').add({
      rideId: item.rideId,
      rideOwner: item.sendTo,
      sendTo: item.requesterId,
      date: item.date,
      notificationType: 'accepted',
      isRead: false,
    });

    await db.collection('notifications').doc(item.doc_id).update({
      isRead: true,
    });

    await db
      .collection('createRide')
      .where('rideId', '==', item.rideId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          db.collection('createRide')
            .doc(doc.id)
            .update({
              noOfSeats: firebase.firestore.FieldValue.increment(-1),
              passengerNames: firebase.firestore.FieldValue.arrayUnion(
                item.requesterId
              ),
            });
          db.collection('createRide').doc(doc.id).collection('passengers').add({
            passengerId: item.requesterId,
            passengerName: item.requesterName,
            passengerImage: item.requesterImage,
          });
        });
      });
    alert('successfully');
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  heading: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '5%',
  },
  list: {
    margin: 5,
    height: 80,
    justifyContent: 'space-around',
    paddingLeft: 10,
    elevation: 1,
    marginBottom: 20,
  },
  list1: {
    margin: 5,
    height: 40,
    justifyContent: 'space-around',
    paddingLeft: 10,
    elevation: 1,
    marginBottom: 20,
  },
});
