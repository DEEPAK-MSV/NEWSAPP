import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/components/Navigation'

const App = () => {
  


  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor="#202124" />
      <Navigation />
    </>
  )
}

export default App

const styles = StyleSheet.create({})