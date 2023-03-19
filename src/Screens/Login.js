import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    

    const handleLogin = () => {
        if (!email || !password) {
          Alert.alert(
            'NewsApp',
            'Please enter email and password.',
            [{ text: 'OK', style: 'cancel' }]
          );
          return;
        }
      
        if (!/\S+@\S+\.\S+/.test(email)) {
          Alert.alert(
            'NewsApp',
            'Please enter a valid email address.',
            [{ text: 'OK', style: 'cancel' }]
          );
          return;
        }
      
        if (password.length < 6) {
          Alert.alert(
            'NewsApp',
            'Password must be at least 6 characters long.',
            [{ text: 'OK', style: 'cancel' }]
          );
          return;
        }
      
        auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.replace('home');
          })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              Alert.alert(
                'NewsApp',
                'Email and password are incorrect.',
                [{ text: 'OK', style: 'cancel' }]
              );
            } else if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'NewsApp',
                'Wrong password, please try again.',
                [{ text: 'OK', style: 'cancel' }]
              );
            } else {
              setErrorMessage(error.message);
            }
          });
      };
      
      

      const handleSignUp = () =>{
        if (!email || !password) {
          Alert.alert(
            'NewsApp',
            'Please enter email and password.',
            [{ text: 'OK', style: 'cancel' }]
          );
          return;
        }
        
        if (!/\S+@\S+\.\S+/.test(email)) {
          Alert.alert(
            'NewsApp',
            'Please enter a valid email address.',
            [{ text: 'OK', style: 'cancel' }]
          );
          return;
        }
        if (password.length < 6) {
            Alert.alert(
              'NewsApp',
              'Password must be at least 6 characters long.',
              [{ text: 'OK', style: 'cancel' }]
            );
            return;
          }
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials =>{
          const user = userCredentials.user;
          console.log(user.email);
          Alert.alert('NewsApp', 'Registered successfully', [{ text: 'OK', style: 'cancel' }]);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('NewsApp', 'Email already in Exist', [{ text: 'OK', style: 'cancel' }]);
          } else {
            setErrorMessage(error.message);
          }
        });
      }

      


    return (
        <View style={styles.container}>
            <View style={{alignItems:"center", justifyContent:'center',paddingVertical:20}}>
                <Image source={require('../Images/logo.jpg')}/>
            </View>
            <View style={{width:"100%",alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} placeholderTextColor={"#0782f9"} style={styles.tin}/>
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} placeholderTextColor={"#0782f9"} style={styles.tin}/>
            </View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <View style={{width:"100%",alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={styles.tchable} onPress={handleLogin}>
                    <Text style={{color:"#fff",fontSize:15,paddingVertical:10,textAlign:'center',fontWeight:'bold'}}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tchable1} onPress={handleSignUp}>
                    <Text style={{color:"#0782f9",fontSize:15,paddingVertical:10,textAlign:'center',fontWeight:'bold'}}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: { backgroundColor: '#202124', height: '100%', width: "100%", alignItems:'center',justifyContent:'center' },
    text:{color:"#fff",fontSize:40 , fontWeight:'bold',fontFamily:'cursive',},
    tchable:{backgroundColor:"#0782f9",width:"60%",borderRadius:10,marginVertical:10,},
    tchable1:{backgroundColor:"#fff",width:"60%",borderRadius:10,marginVertical:10,borderColor:"#0782f9",borderWidth:2},
    tin:{width:"80%",backgroundColor:"#fff",textAlign:'center',borderRadius:10,marginVertical:10,borderColor:"#0782f9",borderWidth:2},
    error: { color: '#FF0000', fontSize: 16, marginTop: 10 },
})
