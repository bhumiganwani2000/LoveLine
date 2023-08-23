import React, { useState } from "react";
import { View, Text, Image, Alert, StyleSheet, Modal, TouchableOpacity } from "react-native";
import styles from './styles';

const ModalCmp = (props) => {
    const {
        openCamera,
        openGallery,
        closeModal,
    } = props;
    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select an Option</Text>
                    <TouchableOpacity onPress={openCamera} style={styles.optionButton}>
                        <Text style={styles.optionText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGallery} style={styles.optionButton}>
                        <Text style={styles.optionText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={ApiModal} style={styles.closeButton}>
                        <Text style={styles.closeOkayText}>Okay</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
};

export default ModalCmp;