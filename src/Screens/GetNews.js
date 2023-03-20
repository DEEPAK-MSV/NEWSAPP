import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, Share } from 'react-native';

const GetNews = ({ route, navigation }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.category,
    });
    getNews();
  }, [route.params.category, navigation]);

  const getNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${route.params.category}&apiKey=276b17dde3084eb3b3e1083c5b6c9437`
      );
      const data = await response.json();
      const filteredData = data.articles.filter(
        (article) => article.author && article.urlToImage && article.description
      );
      setNews(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const share = async (url) => {
    try {
      const result = await Share.share({
        message: url
      });

    } catch (error) {
      console.log(error);
    }

  }




  const isUrl = (str) => {
    // Check if the string is a valid URL using a regular expression
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    return urlPattern.test(str);
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "#d34646", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <Text style={styles.txt}>{`${route.params.category}`}</Text>
          </View>
          <View style={{height:"100%", width:"100%" ,justifyContent:"center",alignItems:'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#d34646" style={{ justifyContent: "center", alignContent: 'center' }} />
      ) : (
        <>
          <ScrollView style={{marginBottom:50}}>
            {news.map((article, index) => (
              <View key={index} style={styles.newscontainer}>
                <Image source={{ uri: article.urlToImage }} style={styles.img} />
                <View>
                  <Text style={styles.author}>
                    {isUrl(article.author) ? null : `${article.author}`}
                  </Text>
                </View>
                <Text style={styles.description}>{article.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={styles.read}
                    onPress={() => navigation.navigate('webview', { url: article.url })}
                  >
                    Read More
                  </Text>
                  <Text style={styles.share} onPress={() => share(article.url)}>Share </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
    height: '100%',
    width: "100%",
  },
  newscontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  author: { fontSize: 20, color: '#e6e6e6', paddingVertical: 10 },
  img: { height: 250, width: '100%' },
  description: { fontSize: 14, color: '#fff', paddingBottom: 10 },
  read: {
    fontSize: 15,
    color: '#e6e6e6',
    alignSelf: 'flex-end',
    backgroundColor: '#d34646',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  txt: { color: "#fff", fontSize: 28, fontWeight: "bold", paddingVertical: 6, },
  share: {
    fontSize: 15,
    color: '#e6e6e6',
    alignSelf: 'flex-start',
    backgroundColor: '#d34646',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  }
});

export default GetNews;
