import { StyleSheet, Text, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview';

const WebViewScreen = ({route}) => {
  
  return (
    <View style={{backgroundColor:"#202124",flex:1}}>
      <WebView source={{uri: `${route.params.url}`}}/>
    </View>
  )
}

export default WebViewScreen

const styles = StyleSheet.create({})