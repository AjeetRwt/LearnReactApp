import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const TOP_HEADLINES_API =
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=086b61f7769448e697e684cb78453492';

const ExclusiveOffers = () => {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  const fetchTopHeadlines = async () => {
    try {
      setLoading(true);
      const response = await fetch(TOP_HEADLINES_API);
      const data = await response.json();

      if (data.articles) {
        const formattedOffers = data.articles
          .filter(article => article.urlToImage)
          .slice(0, 8) // Limit to 8 articles
          .map((article, index) => ({
            id: String(index),
            title: article.title,
            description: article.description,
            location: article.source?.name || 'News Source',
            image: article.urlToImage,
            author: article.author,
            publishedAt: article.publishedAt,
            content: article.content,
            url: article.url,
          }));

        setOffers(formattedOffers);
      }
    } catch (err) {
      console.error('Error fetching top headlines:', err);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation?.navigate('Details', {
          item: {
            ...item,
            price: '0',
          },
        })
      }
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>United State News</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : offers.length > 0 ? (
        <FlatList
          data={offers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderDestinationCard}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No offers available</Text>
        </View>
      )}
    </View>
  );
};

export default ExclusiveOffers;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    ...Platform.select({
      ios: { fontFamily: 'System' },
      android: { fontFamily: 'sans-serif-medium' },
    }),
  },

  listContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },

  card: {
    width: 300,
    height: 180,
    marginRight: 15,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
