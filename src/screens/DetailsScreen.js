import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Card with Overlay */}
        <View style={styles.imageCardContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Header Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation?.goBack()}
            >
              <Text style={styles.iconText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔖</Text>
            </TouchableOpacity>
          </View>

          {/* Overlay Content */}
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>{item.price || '230'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'details' && styles.activeTabText,
              ]}
            >
              Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        <View style={styles.content}>
          {item.description && (
            <>
              <Text style={styles.descriptionTitle}>Summary</Text>
              <Text style={styles.description}>{item.description}</Text>
            </>
          )}
          {item.content && (
            <>
              <Text style={styles.descriptionTitle}>Full Article</Text>
              <Text style={styles.description}>{item.content}</Text>
            </>
          )}
        </View>

        {/* Published Date */}
        {item.publishedAt && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Published:</Text>
            <Text style={styles.dateText}>
              {new Date(item.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        )}

        {/* Book Now Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read Full Article</Text>
            <Text style={styles.buttonIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageCardContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 380,
  },
  headerButtons: {
    paddingVertical: 15,
    position: 'absolute',
    top: 25,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  iconText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundLinearGradient: ['transparent', 'rgba(0, 0, 0, 0.7)'],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  overlayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  cardLocation: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  priceLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  description: {
    fontSize: 14,
    color: '#7a7a7a',
    lineHeight: 22,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    marginTop: 15,
  },
  dateContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
  },
});
