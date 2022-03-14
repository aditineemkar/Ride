import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      image: 'https://freesvg.org/img/abstract-user-flat-4.png',
      name: '',
      contact: '',
      adderess: '',
      uploading: false,
      company: '',
      carDetails: '',
      docId: '',
      gender: '',
    };
  }

  fetchImage = () => {
    console.log('e2');

    var ref = firebase
      .storage()
      .ref()
      .child('userProfiles/' + this.state.userId);
    ref
      .getDownloadURL()
      .then((url) => {
        console.log(url);

        this.setState({ image: url });
        db.collection('users').doc(this.state.docId).update({
          name: this.state.name,
          contact: this.state.contact,
          adderess: this.state.adderess,
          company: this.state.company,
          carDetails: this.state.carDetails,
          gender: this.state.gender,
          image: url,
        });
        alert('Profile Updated!');
      })
      .catch((error) => {
        alert('Something went wrong in media uplaod, try again');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      });
  };

  updateDb = async () => {
    console.log('e');

    console.log(this.state.image);

    var response = await fetch(this.state.image);
    var blob = await response.blob();
    console.log(blob);
    try {
      var ref = firebase
        .storage()
        .ref()
        .child('userProfiles/' + this.state.userId);
      ref.put(blob).then((response) => {
        console.log('Response: ' + response);

        this.fetchImage();
      });
    } catch (e) {
      console.log(e);
    }
  };

  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            docId: doc.id,
            name: doc.data().name,
            contact: doc.data().contact,
            company: doc.data().company,
            image: doc.data().image,
            carDetails: doc.data().carDetails,
            gender: doc.data().gender,
          });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({ image: uri });
      console.log('Worked' + this.state.image);
      this.setState({
        modalVisible: false,
      });
    }
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: Dimensions.get('window').height,
        }}>
        <ScrollView>
          <View>
            <LinearGradient
              // Button Linear Gradient
              colors={['#03e5b7', '#09c7fb']}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.9, y: 0.1 }}
              style={{
                padding: 10,
                justifyContent: 'center',
              }}>
              <View style={styles.heading}>
                <View style={{ marginLeft: '5%' }}>
                  <Feather
                    name="arrow-left-circle"
                    size={35}
                    color="white"
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
                <Text style={styles.headingTest}>Edit Profile</Text>
              </View>
            </LinearGradient>
          </View>
          <KeyboardAvoidingView>
            <View>
              <View style={{ borderRadius: 40, resizeMode: 'contain' }}>
                <Avatar
                  size="large"
                  source={{
                    uri: this.state.image,
                  }}
                  onPress={() => {
                    this.selectPicture();
                  }}
                  containerStyle={{ alignSelf: 'center', margin: 20 }}
                  rounded
                  showEditButton
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30,
                marginTop: 20,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: 'white',
              }}>
              <Text style={{ color: '#ffffff88', fontWeight: 'bold' }}>
                Username
              </Text>
              <TextInput
                style={{
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 15,
                  paddingLeft: 15,
                  color: 'white',
                }}
                onChangeText={(name) => {
                  this.setState({ name });
                }}
                value={this.state.name.trim()}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30,
                marginTop: 20,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: 'white',
              }}>
              <Text style={{ color: 'grey', fontWeight: 'bold' }}>Phone</Text>
              <TextInput
                style={{
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 15,
                  color: 'white',
                }}
                onChangeText={(contact) => {
                  this.setState({ contact });
                }}
                value={this.state.contact}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30,
                marginTop: 20,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: 'white',
              }}>
              <Text style={{ color: 'grey', fontWeight: 'bold' }}>Company</Text>
              <TextInput
                style={{
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 15,
                  color: 'white',
                }}
                onChangeText={(company) => {
                  this.setState({ company });
                }}
                value={this.state.company}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30,
                marginTop: 20,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: 'white',
              }}>
              <Text style={{ color: 'grey', fontWeight: 'bold' }}>Gender</Text>
              <TextInput
                style={{
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 15,
                  color: 'white',
                }}
                onChangeText={(gender) => {
                  this.setState({ gender });
                }}
                value={this.state.gender}
              />
            </View>
            <TouchableOpacity
              style={styles.signin}
              onPress={() => {
                this.updateDb();
              }}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#9dfbc8', '#70b2d9']}
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 0.9, y: 0.1 }}
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    padding: 8,
                  }}>
                  Submit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    marginLeft: '25%',
  },
  signin: {
    backgroundColor: '#797ef6',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 5,
  },
});
