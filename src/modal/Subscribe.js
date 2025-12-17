import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SubscribeModal = ({visible, onClose, onSubscribe}) => {
  const navigation = useNavigation();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>Confirm Your Subscription</Text>

          {/* Description */}
          <Text style={styles.bodyText}>
            You’re about to activate this plan and enjoy all premium features.
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.8}
              onPress={onClose}>
              <Text style={styles.cancelText}>Not Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subscribeBtn}
              activeOpacity={0.8}
              onPress={onSubscribe}>
              <Text style={styles.subscribeText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubscribeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  cancelText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  subscribeBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
