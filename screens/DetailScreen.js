import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, ScrollView, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import * as firebase from 'firebase'


//import CameraKitCameraScreen we are going to use.
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
      listingData:[],
      username : this.props.navigation.state.params.username,
    };
  }
  componentDidMount()
  {
    
    firebase.database().ref(this.state.username+"/").on("value",(data)=>{

      this.setState({listingData:this.snapshotToArray(data)});
      
  });
  }
  
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
        <TouchableHighlight
                onPress={()=>this.props.navigation.navigate('HomeScreen')}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Go Back</Text>
              </TouchableHighlight>
            <Text style={styles.heading}>{this.state.username}
            </Text>
            <ScrollView>
             {

               this.state.listingData.map((item,i)=>{
                 return(
                   <View>
                   <Text style={{fontSize:20}}>{item.key}</Text>
                   <View style={{height:10}} />
                   <Text>{item}</Text>
                    <View style={{height:10}} />
                    <View style={{height:10}} />
                    <View style={{height:10}} />

                   </View>
                 )
               })
             }
             </ScrollView>
            
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            
            <View style={{height:10}} />
            <View style={{height:10}} />
            <View style={{height:10}} />
            
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
  snapshotToArray(snapshot) {
   var returnArr = [];
   snapshot.forEach(function(childSnapshot) {
     var item = childSnapshot.val();
     item.key = childSnapshot.key
     returnArr.push(item);
      });

   return returnArr;
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});