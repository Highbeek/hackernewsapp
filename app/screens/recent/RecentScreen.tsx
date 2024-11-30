import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Linking,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  setRecentStories,
  setLoadingRecent,
} from '../../store/RecentStoriesSlice';
import {getStoryIds, getStory} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {incrementPage} from '../../store/storiesSlice';

type RootStackParamList = {
  Recent: undefined;
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

const RecentScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {recentItems, loading} = useAppSelector(state => state.recentStories);

  const loadRecentStories = useCallback(async () => {
    try {
      dispatch(setLoadingRecent(true));

      const storyIds = await getStoryIds();
      const recentStoryIds = storyIds.slice(0, PAGE_SIZE);

      const storyPromises = recentStoryIds.map((id: any) => getStory(id));
      const stories = await Promise.all(storyPromises);

      const validStories = stories.filter(
        (story): story is Story =>
          story != null &&
          typeof story === 'object' &&
          story.id != null &&
          story.title != null &&
          story.by != null &&
          story.time != null,
      );

      dispatch(setRecentStories(validStories));
    } catch (error) {
      console.error('Error loading recent stories:', error);
    } finally {
      dispatch(setLoadingRecent(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadRecentStories();
  }, [loadRecentStories]);

  const renderStoryItem = React.useCallback(
    ({item}: {item: Story}) => {
      if (!item || !item.id) return null;

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
    },
    [navigation],
  );

  const keyExtractor = React.useCallback(
    (item: Story, index: number) =>
      item?.id ? `story-${item.id}-${index}` : `story-${index}`,
    [],
  );

  const loadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Stories</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={recentItems || []}
          keyExtractor={keyExtractor}
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
          onRefresh={loadRecentStories}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  listContent: {
    paddingHorizontal: 16,
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
  by: {
    fontSize: 14,
    color: '#666',
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default RecentScreen;
