import { StyleSheet } from 'react-native';
import { WHITE } from '../../../GlobalCss';

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 350
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    optionButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 18,
        color: "#333",
        fontWeight: 'bold'
    },
    closeButton: {
        marginTop: 10,
        alignSelf: "flex-end",
    },
    closeButtonText: {
        fontSize: 18,
        color: "blue",
    },
    closeOkayText: {
        fontSize: 18,
        color: "blue",
    }

});