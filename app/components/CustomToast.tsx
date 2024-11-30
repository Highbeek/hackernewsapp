import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {isEmpty, isNil} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {s} from 'react-native-size-matters';

const CustomToast = ({toast, variant = 'custom'}: any) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return '#3CD599';
      case 'warning':
        return '#FFA500';
      case 'error':
        return '#FF0000';
      default:
        return '#8A2BE2';
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: getBackgroundColor()}]}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => toast.onHide && toast.onHide()}>
        {variant === 'success' && (
          <Icon name="check-circle" size={20} color="#FFFFFF" />
        )}
        {variant === 'error' && (
          <Icon name="close-circle" size={20} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {(!isNil(toast?.data?.title) || !isEmpty(toast?.data?.title)) && (
          <Text
            style={[styles.title, variant === 'success' ? styles.bold : null]}>
            {toast?.title ?? toast?.data?.title ?? 'Notification'}
          </Text>
        )}

        <Text style={styles.message}>{toast?.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    minHeight: 100,
    backgroundColor: '#8A2BE2',
    marginTop: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: s(14),
    color: '#FFFFFF',
    fontFamily: 'Trap-Bold',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  message: {
    color: '#FFFFFF',
    fontFamily: 'Trap-Bold',
    fontSize: s(14),
    lineHeight: s(22),
    letterSpacing: -0.05,
  },
});

export default CustomToast;
