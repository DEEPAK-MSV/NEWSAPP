import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const categories = ["Business", "Entertainment","Health", "Sports", "Science","Technology",];

const Categories = ({ navigation }) => {

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('getnews',{category,})}>
                    <View>
                        <Text style={styles.txt}>{category}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({
    txt: { color: "#fff", fontSize: 17, backgroundColor: "#d34646", borderWidth: 1, borderColor: '#d34646', paddingHorizontal: 14, paddingVertical: 5, marginHorizontal: 9, borderRadius: 10, fontWeight: 'bold', }
})