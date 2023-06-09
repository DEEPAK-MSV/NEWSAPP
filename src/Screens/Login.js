import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState(null);
  const [isloading, setisloading] = useState(false);

  useEffect(()=>{
    get_email();
  })

  const get_email = async () => {
    let email = await AsyncStorage.getItem('email')
    if(email) {
      navigation.replace('Home', {email})
    } else {
      navigation.replace("Login")
    }
  }



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
    setisloading(true)

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace('home');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'NewsApp',
            'User Not Found Please SignUp.',
            [{ text: 'OK', style: 'cancel' }]
          );
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert(
            'NewsApp',
            'Wrong password, please try again.',
            [{ text: 'OK', style: 'cancel' }]
          );
        } else {
          Alert.alert('NewsApp',
            error.message,
            [{ text: 'OK', style: 'cancel' }]);
        }
      }).finally(() => {
        setisloading(false);
      });
  };


  return (
    <View style={styles.container}>
      {isloading ? <ActivityIndicator size="large" color="#d34646" style={{ justifyContent: "center", alignContent: 'center' }} /> : (
        <>
          <View style={{ alignItems: "center", justifyContent: 'center', paddingVertical: 20 }}>
            <Image source={require('../Images/logo.jpg')} />
          </View>
          <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <TextInput autoFocus placeholder='Email' value={email} onChangeText={text => setEmail(text)} placeholderTextColor={"#0782f9"} style={styles.tin} />
            <TextInput secureTextEntry placeholder='Password' value={password} onChangeText={text => setPassword(text)} placeholderTextColor={"#0782f9"} style={styles.tin} />
          </View>
          <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.tchable} onPress={handleLogin}>
              <Text style={{ color: "#fff", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ color: "#fff", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 10 }}>
                Don't have an Account?
              </Text>
              <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
                <Text style={{ color: "#d34646", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { backgroundColor: '#202124', height: '100%', width: "100%", alignItems: 'center', justifyContent: 'center' },
  text: { color: "#fff", fontSize: 40, fontWeight: 'bold', fontFamily: 'cursive', },
  tchable: { backgroundColor: "#0782f9", width: "60%", borderRadius: 10, marginVertical: 10, },
  tchable1: { backgroundColor: "#fff", width: "60%", borderRadius: 10, marginVertical: 10, borderColor: "#0782f9", borderWidth: 2 },
  tin: { width: "80%", backgroundColor: "#fff", textAlign: 'center', borderRadius: 10, marginVertical: 10, borderColor: "#0782f9", borderWidth: 2 },
})
