import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");


export default function AuthScreen() {
    const router = useRouter();
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=> {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
};

      const authenticate = async () => {
        try{
            setIsAuthenticating(true);
            setError(null); 

            //check if device has biometric hardware
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

            //handle supported types
            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: hasHardware && isEnrolled ? 'Use face ID/Touch ID ': 'Enter your PIN to access meditations',
                fallbackLabel: 'Use PIN',
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
            });

            if(auth.success){
                router.replace('/home')
            } else {
                setError('Authentication Failed. Please try again ')
            }
        } catch (error){

        }
      };


  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
        <View style={styles.content}>

      <View style={styles.iconContainer}>
        <Ionicons name="medical" size={80} color="#fff" />
      </View>

      <Text style={styles.title}>MedRemind</Text>
      <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>

      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.instructionText}>
          {" "}
          {hasBiometrics
            ? "Use face ID/TouchID or PIN to access your medications"
            : "Enter your PIN to access your medications"}
        </Text>

        <TouchableOpacity 
        style={[styles.button, isAuthenticating && styles.buttonDisabled]}
        onPress={authenticate}
        disabled={isAuthenticating}
         >
          <Ionicons
            name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>
            {" "}
            {isAuthenticating
              ? "verfying..."
              : hasBiometrics
              ? "Authenticate"
              : "Enter PIN"}{" "}
          </Text>
        </TouchableOpacity>

        {error && (
            <View style={styles.errorContainer}> 
            <Ionicons name="alert-circle" size={20} color="#f44336"/>
            <Text style={styles.errorText}>{error}</Text>
            </View>
         
        )}
      </View>

      </View>

      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4caf50'
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer:{
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: width - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonIcon: {
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginLeft: 8,
  },

});
