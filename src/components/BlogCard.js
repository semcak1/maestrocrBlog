import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";

const BlogCard = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(Context);

  const [refreshing, setrefreshing] = useState(false);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);

 

  const loadingIndicator = () => {
    return loading ? (
      <View style={styles.indicatorView}>
        <ActivityIndicator color="black" animating={true} size="large" />
      </View>
    ) : null;
  };

  const infiniteScroll = useCallback(() => {
    setloading(true);
    setpage((prev) => {
      if (state.isThereNewData) {
        
        prev = prev + 1;
        getBlogPosts(prev);

        return prev;
      }
    });
    setloading(false);
  }, [page]);

  const onRefresh = useCallback(() => {
    setrefreshing(true);

    getBlogPosts(page);

    setrefreshing(false);
  }, [refreshing]);

  const onClickPost = (item) => {
    navigation.navigate("BlogDetail", {
      postId: item.postId,
    });
  };

  useEffect(() => {
    getBlogPosts(page);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClickPost(item);
        }}
      >
        <ScrollView>
          <View style={styles.cardView}>
            <Text style={styles.titleView}>{item.title}</Text>
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
        data={state.blogList}
        keyExtractor={(item) => String(item.postId)}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
    borderColor: "rgba(22,32,32,0.3)",
    paddingVertical: 15,
    backgroundColor: "#fff",
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
