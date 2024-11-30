import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Calendario() {
  return (
    <View style= {{height:'100%'}}>
      <View style= {{height:'40%', width:'50%', backgroundColor: 'cyan'}}></View>
      <View style= {{height:'30%', backgroundColor: 'red'}}></View>
      <View style= {{height:'30%', backgroundColor: 'yellow'}}></View>
    </View>
  )
}

const styles = StyleSheet.create({})

