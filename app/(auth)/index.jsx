import{View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {router} from 'expo-router';
import LottieView from 'lottie-react-native';
import { Colors } from '../../constants/Color';

export default function GetStarted(){
    return(
        <View style={styles.container}>
            <View style={styles.animationContainer}>
            <LottieView
                source={{ uri: 'https://lottie.host/1ab1f0a9-dd45-4e5d-bf58-6d02c0bf1030/q8i8RxzIuV.lottie' }}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>

        <Text style={styles.subtitle}>
            LAMO finds routes that earn you rewards, while easing traffic for everyone.
        </Text>

        <Text style={styles.title}>
            Drive<Text style={styles.accent}> smarter</Text>,{"\n"}
            Reduce<Text style={styles.accent}> congestion</Text>,{"\n"}
            Reward<Text style={styles.accent}> yourself</Text>.
        </Text>

        <Text style={styles.terms}>
            By continuing, you agree to our Terms and Privacy Policy
        </Text>

        <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/signup')}
        >
            <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> router.push('/login')}>
            <Text style={styles.secondaryLink}>I already have an account</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    animationContainer:{
        width: 220,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    animation:{
        width: '100%',
        height: '100%',
    },
    subtitle:{
        fontSize:14,
        fontFamily: 'PoppinsRegular',
        color: Colors.light.text,
        opacity: 0.7,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
        maxWidth:290,
    },
    title:{
        fontSize: 34,
        fontFamily: 'PoppinsBold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 40,
    },
    accent:{
        color: Colors.light.accent,
        fontFamily: 'PoppinsBold',
    },
    terms:{
        fontSize: 12,
        fontFamily: 'PoppinsRegular',
        color: Colors.light.text,
        opacity: 0.6,
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 18,
        maxWidth: 290,
    },
    primaryButton:{
        backgroundColor: Colors.light.primary,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 18,
        width: '100%',
    },
    primaryButtonText:{
        fontFamily: 'PoppinsSemiBold',
        color:Colors.light.background,
        fontSize: 17,
    },
    secondaryLink:{
        fontFamily: 'PoppinsSemiBold',
        color: Colors.light.text,
        fontSize: 17,
    },
});
