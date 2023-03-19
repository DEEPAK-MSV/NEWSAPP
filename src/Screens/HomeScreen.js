import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator, Linking, Alert , Share} from 'react-native';
import React, { useState, useEffect } from 'react'
import Categories from '../components/Categories'



const HomeScreen = ({ navigation, }) => {

    const categories = () => {
        const newses = ["Business", "Entertainment","Health", "Sports", "Science","Technology",];
        setTopic(newses);
    }

    const [news, setNews] = useState([]);
    const [topic, setTopic] = useState([]);
    useEffect(() => {
        getResponse();
        categories();
    }, []);

    const getResponse = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${topic}&apiKey=276b17dde3084eb3b3e1083c5b6c9437`);
            const data = await response.json();
            const filteredData = data.articles.filter(article => article.author && article.urlToImage && article.description);
            setNews(filteredData);
            
        } catch (error) {
            console.log(error);
        }
    }


    const share =async (url)=>{
        try {
            const result = await Share.share({
                message: url,
            });
           
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const isUrl = (str) => {
        // Check if the string is a valid URL using a regular expression
        const urlPattern = /^(http|https):\/\/[^ "]+$/;
        return urlPattern.test(str);
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 15, borderRadius: 20 }}>
                <Categories navigation={navigation}/>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {news.length === 0 ? (
                    <ActivityIndicator size='large' color="white" />
                ) : (
                    <ScrollView>
                        {news.map((article, index) => (
                            <View key={index} style={styles.newscontainer}>
                                <Image source={{ uri: article.urlToImage }} style={styles.img} />
                                <View>
                                    <Text style={styles.author}>
                                        {isUrl(article.author) ? null : `${article.author}`}
                                    </Text>
                                </View>
                                <Text style={styles.description}>
                                    {article.description}
                                </Text>
                                <View style={{justifyContent:'space-between',flexDirection:'row',}}>
                                    <Text style={styles.read} onPress={() => navigation.navigate('webview', { url: article.url })}>
                                        Read More
                                    </Text>
                                    <Text style={styles.share} onPress={()=>share(article.url)}>Share </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
                <View style={{ height: "10%" }} />
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: '#202124', height: '100%', width: "100%", },
    txt: { fontSize: 20, color: '#fff', paddingVertical: 50 },
    newscontainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10, paddingVertical: 20,},
    author: { fontSize: 20, color: '#e6e6e6', paddingVertical: 10 },
    img: { height: 250, width: "100%" },
    description: { fontSize: 14, color: "#fff", paddingBottom: 10 },
    read:{fontSize: 15, color: '#e6e6e6',backgroundColor: "#d34646", padding: 10, borderRadius: 10,margin:5,},
    share:{fontSize: 15, color: '#e6e6e6',backgroundColor: "#d34646", padding: 10, borderRadius: 10,margin:5 }

});
