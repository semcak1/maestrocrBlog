import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, FlatList } from "react-native";

const BlogCard = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchBlogItems = async () => {
      const response = await fetch(
        "https://www.lenasoftware.com/api/v1/en/maestro/1"
      );
      const data = await response.json();
      setdata(data.result);
    };
    fetchBlogItems();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.cardView}>
          <Text style={styles.titleView}> {item.title}</Text>
          <Text style={styles.subTitleView}>
            Total Reading Time : {item.totalReadingTime} minuts
          </Text>
          <Image />
          <View>
            <Text style={styles.summaryHeadView}>Summary</Text>
            <Text style={styles.summaryTextView}>{item.summary}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  cardView: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    padding: 15,
  },
  titleView: {
    fontSize: 45,
    fontWeight: "bold",
  },
  subTitleView: {
    fontSize: 18,
    opacity: 0.4,

    marginBottom: 5,
  },
  summaryHeadView: {
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryTextView: {
    fontSize: 20,
  },
});

export default BlogCard;
