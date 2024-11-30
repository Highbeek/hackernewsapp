import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getStory} from '../services/api';

const StoryDetailScreen: React.FC = ({route}: any) => {
  const navigation = useNavigation();
  const {storyId} = route?.params || {};

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const storyData = await getStory(storyId);
        setStory(storyData);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Story not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Story Detail</Text>
      </View>
      <View style={styles.storyDetailContainer}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.by}>By: {story.by}</Text>

        <Text style={styles.date}>
          Published: {new Date(story.time * 1000).toLocaleDateString()}
        </Text>
        {story.url && (
          <TouchableOpacity onPress={() => Linking.openURL(story.url)}>
            <Text style={styles.url}>Read full story</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#AD79E1',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  goBackText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  storyDetailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  by: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  score: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  url: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default StoryDetailScreen;
