import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setStories, setLoading, incrementPage} from '../../store/storiesSlice';
import {getStoryIds, getStory} from '../../services/api';

type RootStackParamList = {
  Home: undefined;
  StoryDetail: {storyId: number};
};

type Story = {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  url?: string;
};

const PAGE_SIZE = 10;

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {items, loading, page} = useAppSelector(state => state.stories);

  const loadNews = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const storyIds = await getStoryIds();
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageStoryIds = storyIds.slice(start, end);

      const storyPromises = pageStoryIds.map(id => getStory(id));
      const stories = await Promise.all(storyPromises);

      dispatch(setStories(stories));
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const loadMore = () => {
    dispatch(incrementPage());
  };

  const renderStoryItem = ({item}: {item: Story}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.url) {
            Linking.openURL(item.url);
          } else {
            navigation.navigate('StoryDetail', {storyId: item.id});
          }
        }}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.by}>By: {item.by}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.date}>
              {new Date(item.time * 1000).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.header.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hacker News</Text>
        <Text style={styles.headerSubtitle}>Top Stories</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) =>
          `story-${item.id}-${index}-${Date.now()}`
        }
        renderItem={renderStoryItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading stories...' : 'No stories found'}
            </Text>
          </View>
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={PAGE_SIZE}
        initialNumToRender={PAGE_SIZE}
        refreshing={loading}
        onRefresh={loadNews}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  by: {
    fontSize: 14,
    color: '#666',
  },
  scoreContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scoreIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
