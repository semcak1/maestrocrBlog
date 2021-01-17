import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const BlogCard = () => {
  const [data, setdata] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [newDataLength, setnewDataLength] = useState(1);
  console.log("BLOG CARD RENDER OLDU");
  console.log("DATA LENGTH", newDataLength);
  const loadingIndicator = () => {
    return loading ? (
      <View style={styles.indicatorView}>
        <ActivityIndicator color="black" animating={true} size="large" />
      </View>
    ) : null;
  };

  const infiniteScroll = () => {
    setpage((prev) => prev + 1);
    if (newDataLength !== 0) {
      fetchBlogPost();
    }
  };

  const fetchBlogPost = useCallback(() => {
    const count = 3;

    setloading(true);
    fetch(
      `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${page}&count=${count}`
    )
      .then((res) => res.json())
      .then((json) => {
        setnewDataLength(json.result.length);
        if (newDataLength !== 0) {
          setdata((prev) =>
            page === 1 ? json.result : prev.concat(json.result)
          );
          setloading(false);
        }
      })
      .catch((err) => alert("Errror", err.message));
  }, [page]);

  const onRefresh = useCallback(() => {
    setrefreshing(true);

    if (newDataLength !== 0) {
      fetchBlogPost();
    }

    setrefreshing(false);
  }, [refreshing]);

  const onClickPost=()=>{
      console.log('clck')
  }

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={onClickPost}>
        <ScrollView>
          <View style={styles.cardView}>
            <Text style={styles.titleView}>
              id : {item.postId} {item.title}
            </Text>
            <Text style={styles.subTitleView}>
              Total Reading Time : {item.totalReadingTime} minuts
            </Text>
            <Image style={styles.bannerView} source={{ uri: item.banner }} />
            <View style={styles.summaryView}>
              <Text style={styles.summaryHeadView}>Summary</Text>
              <Text style={styles.summaryTextView}>{item.summary}</Text>
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.postId)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={infiniteScroll}
        ListFooterComponent={loadingIndicator}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 25,
    // shadowColor:'black',
    // shadowRadius:15,
    // shadowOffset:{bottom:20},
    // elevation:1,

    paddingVertical: 15,
  },
  summaryView: {
    paddingLeft: 15,
  },
  titleView: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subTitleView: {
    fontSize: 18,
    opacity: 0.4,
    marginBottom: 15,
  },
  summaryHeadView: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  summaryTextView: {
    fontSize: 20,
    marginBottom: 15,
  },
  bannerView: {
    height: 100,
    marginBottom: 15,
  },
  indicatorView: {
    paddingVertical: 20,
  },
});

export default BlogCard;
