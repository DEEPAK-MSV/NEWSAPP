import { StyleSheet, Text, View } from 'react-native'
import React ,{useEffect}from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen';
import WebViewScreen from '../Screens/WebViewScreen';
import GetNews from '../Screens/GetNews';
import Login from '../Screens/Login';
import { auth } from '../../firebase';

const Stack = createNativeStackNavigator();

const global = {
  headerTitle: 'News App',
  headerTitleStyle: { fontSize: 35, fontWeight: 'bold', fontFamily: 'cursive', },
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: '#202124' },
}

const Navigation = ({navigation}) => {

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(user=>{
         if(user){
          navigation.replace('home');
         }
     })
     return unsub
 },[])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={global}>
        <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='home' component={HomeScreen}/>
        <Stack.Screen name='webview' component={WebViewScreen} />
        <Stack.Screen name='getnews' component={GetNews} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({
  lgbtn:{ marginRight: 1, backgroundColor: "#d34646", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, borderColor: "#fff", borderWidth: .8},
  txt:{ fontSize: 13, color: "#fff", fontWeight: 'bold' },
})
