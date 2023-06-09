import {  Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'; 

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage] = useState(null);
    const [isloading, setisloading] = useState(false);



    const handleSignUp = () => {
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
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
                Alert.alert('NewsApp', 'Registered successfully please Login', [{ text: 'OK', style: 'cancel' }]);
                navigation.navigate('login')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('NewsApp', 'Email already in Exist', [{ text: 'OK', style: 'cancel' }]);
                } else {
                    Alert.alert('NewsApp',
                        error.message,
                        [{ text: 'OK', style: 'cancel' }]);
                }

            })
            .finally(() => {
                setisloading(false);
            })
    }

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
                        <TouchableOpacity style={styles.tchable} onPress={handleSignUp}>
                            <Text style={{ color: "#fff", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>
                                SignUp
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ color: "#fff", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 10 }}>
                                Have an Account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                <Text style={{ color: "#d34646", fontSize: 15, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold' }}>LogIn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}
export default Signup

const styles = StyleSheet.create({
    container: { backgroundColor: '#202124', height: '100%', width: "100%", alignItems: 'center', justifyContent: 'center' },
    text: { color: "#fff", fontSize: 40, fontWeight: 'bold', fontFamily: 'cursive', },
    tchable: { backgroundColor: "#0782f9", width: "60%", borderRadius: 10, marginVertical: 10, },
    tchable1: { backgroundColor: "#fff", width: "60%", borderRadius: 10, marginVertical: 10, borderColor: "#0782f9", borderWidth: 2 },
    tin: { width: "80%", backgroundColor: "#fff", textAlign: 'center', borderRadius: 10, marginVertical: 10, borderColor: "#0782f9", borderWidth: 2 },

})