import{Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView}from "react-native";
import {Colors}from"../constants/Color";
import { fonts } from "../constants/Tokens";

export default function LegalModal({visible, type, onClose}){
    const isTerms = type === "terms";

    return(
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        {isTerms ? "Terms of Service" : "Privacy Policy"}
                    </Text>
                    <ScrollView style={styles.content}>
                        <Text sytle={styles.body}>
                            {isTerms
                            ?"These Terms of Service explain how users may access and use LAMO. Final legal copy can be added later."
                            :"This Privacy Policy explains how LAMO may collect, use, and protect user information. Final legal copy can be added later."
                            }
                        </Text>
                    </ScrollView>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        backgroundColor: "#00000059",
        justifyContent:"center",
        paddingHorizontal:24,
    },
    modal:{
        backgroundColor:Colors.light.background,
        borderRadius:24,
        padding:24,
        maxHeight:"70%",
    },
    title:{
        fontSize:24,
        fontFamily: fonts.bold,
        color:Colors.light.text,
        marginBottom:16,
    },
    content:{
        marginBottom:20,
    },
    body:{
        fontSize:14,
        fontFamily:fonts.regular,
        color:Colors.light.text,
        lineHeight:22,
        opacity:0.75,
    },
    button:{
        backgroundColor:Colors.light.primary,
        paddingVertical:16,
        borderRadius:18,
        alignItems:"center",
    },
    buttonText:{
        color:Colors.light.background,
        fontFamily:fonts.semiBold,
        fontSize:16,
    },
});