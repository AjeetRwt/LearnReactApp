import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import ExclusiveOffers from './ExclusiveOffers';
import logger from '../utils/logger';
import Filter from '../assets/svg/fiter';
import Fav from '../assets/svg/fav';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const API_URL =
  'https://newsapi.org/v2/everything?q=tesla&from=2026-03-15&sortBy=publishedAt&apiKey=086b61f7769448e697e684cb78453492';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Most Viewed');
  const [favorites, setFavorites] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState({
    camera: 'unknown',
    location: 'unknown',
  });
  const [deviceInfo, setDeviceInfo] = useState(null);
  const navigation = useNavigation();

  const { DemoNativeModule, DemoSwiftModule } = NativeModules;

  const updateDeviceInfo = async () => {
    try {
      const module = DemoSwiftModule ?? DemoNativeModule;
      if (module?.getDeviceInfo) {
        const info = await module.getDeviceInfo();
        logger.info('Device info from native module', info);
        setDeviceInfo(info);
      }
    } catch (err) {
      logger.warn('Native module getDeviceInfo failed', err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to continue.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        const status =
          granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied';
        setPermissionStatus(prev => ({ ...prev, camera: status }));
        logger.event('camera_permission_requested', {
          platform: Platform.OS,
          status,
        });
        return status;
      }
      const module = DemoSwiftModule ?? DemoNativeModule;
      if (module?.requestCameraPermission) {
        const status = await module.requestCameraPermission();
        setPermissionStatus(prev => ({ ...prev, camera: status }));
        logger.event('camera_permission_requested', {
          platform: Platform.OS,
          status,
        });
      }
      return 'unsupported';
    } catch (err) {
      logger.warn('Camera permission request failed', err);
      setPermissionStatus(prev => ({ ...prev, camera: 'denied' }));
      return 'denied';
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs location access to continue.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        const status =
          granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied';
        setPermissionStatus(prev => ({ ...prev, location: status }));
        logger.event('location_permission_requested', {
          platform: Platform.OS,
          status,
        });
        return status;
      }
      const module = DemoSwiftModule ?? DemoNativeModule;
      if (module?.requestLocationPermission) {
        const status = await module.requestLocationPermission();
        setPermissionStatus(prev => ({ ...prev, location: status }));
        logger.event('location_permission_requested', {
          platform: Platform.OS,
          status,
        });
      }
      return 'unsupported';
    } catch (err) {
      logger.warn('Location permission request failed', err);
      setPermissionStatus(prev => ({ ...prev, location: 'denied' }));
      return 'denied';
    }
  };

  useEffect(() => {
    updateDeviceInfo();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.articles) {
        const formattedArticles = data.articles
          .filter(article => article.urlToImage) // Only articles with images
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

        setArticles(formattedArticles);
      }
      setError(null);
    } catch (err) {
      logger.error('Error fetching articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation?.navigate('Details', {
          item: {
            ...item,
            price: '0', // Default price for news articles
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
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Fav />
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {' '}
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi, Ajeet 👋</Text>
              <Text style={styles.subtitle}>Explore the world</Text>
            </View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
              style={styles.profileImage}
            />
          </View>

          {/* Native module + permission demo */}
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionTitle}>Device + Permission Demo</Text>
            <Text style={styles.permissionText}>
              Native module: {deviceInfo?.deviceName || 'unavailable'} · OS:{' '}
              {deviceInfo?.osVersion || 'unknown'}
            </Text>
            <View style={styles.permissionButtonsRow}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={requestCameraPermission}
              >
                <Text style={styles.smallButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={requestLocationPermission}
              >
                <Text style={styles.smallButtonText}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={updateDeviceInfo}
              >
                <Text style={styles.smallButtonText}>Refresh Info</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.permissionText}>
              Camera: {permissionStatus.camera} · Location:{' '}
              {permissionStatus.location}
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              {/* <Icon name="search-outline" size={20} color="#999" /> */}
              <TextInput
                style={styles.searchInput}
                placeholder="Search places"
                placeholderTextColor="#999"
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
              <Filter />
              {/* <Icon name="options-outline" size={20} color="#666" /> */}
            </TouchableOpacity>
          </View>

          {/* Popular Places Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Global News</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {['Business', 'Technology', 'Sports'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Loading State */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.loadingText}>Loading articles...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchArticles}
              >
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : articles.length > 0 ? (
            <FlatList
              data={articles}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderDestinationCard}
              contentContainerStyle={styles.listContent}
              snapToInterval={CARD_WIDTH + 15}
              decelerationRate="fast"
              bounces={true}
              pagingEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles found</Text>
            </View>
          )}
          <ExclusiveOffers />
        </View>{' '}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  filterButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    borderRadius: 14,
    backgroundColor: '#F8FAFF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    marginHorizontal: 20,
    padding: 12,
    marginBottom: 16,
  },
  permissionTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  permissionText: {
    color: '#333',
    marginBottom: 8,
    fontSize: 13,
  },
  permissionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#2236F0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#1A1A1A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  card: {
    width: 300,
    height: 300,
    marginRight: 15,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
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
    position: 'absolute',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginLeft: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
