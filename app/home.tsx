import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add\nMedication",
    route: "/medications/add" as const,
    color: "#2e7d32",
    gradient: ["#4CAF50", "#2E7D32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "History\nLog",
    route: "/history" as const,
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Refill\nTracker",
    route: "/refills" as const,
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"] as [string, string],
  },
];

interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressPercentage}>
          {Math.round(progress * 1)}%
        </Text>
        <Text style={styles.progressLabel}>
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={["#1a8e2d", "#146922"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}> Daily Progress</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />

              {
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>1</Text>
                </View>
              }
            </TouchableOpacity>
          </View>

          <CircularProgress progress={50} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <Link href={action.route} key={action.label} asChild>
                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionGradient}
                  >
                    <View style={styles.actionContent}>
                      <View style={styles.actionIcon}>
                        <Ionicons name={action.icon} size={24} color="white" />
                      </View>
                      <Text style={styles.actionLabel}>{action.label}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </View>

      <View>
        <View>
            <Text>Today's Schedule</Text>
            <Link rel="stylesheet" href="/calender" >
            <TouchableOpacity>

                <Text>See All</Text>
            </TouchableOpacity>
            </Link>
        </View>

        {true? (
            <View>
                <Ionicons name="medical-outline" size={48} color="#ccc" />
                <Text>No Medications Scheduled for today</Text>
                <Link href="/medications/add">
                <TouchableOpacity>
                  <Text>Add Medication</Text>
                </TouchableOpacity>
                </Link>
                </View>
              
        ): (
          [].map((medications)=> {
            // const taken = medications.taken
            return (
              <View>
                <View>
                  <Ionicons name="medical-outline" size={24} />
                </View>
                <View>
                 <View>
                  <Text>name</Text>
                  <Text>dosage</Text>
                 </View>
                 <View>
                  <Ionicons name="time-outline" size={16} color="#ccc"/>
                  <Text>time</Text>
                 </View>
                </View>

                {true ? (
                  <View>
                    <Ionicons name="checkmark-circle-outline" size={24}/>
                    <Text>Taken</Text>
                  </View>
                ): (
                  <View>
                    <Ionicons name="close-circle-outline" size={24}/>
                    <Text>Missed</Text>
                    
                  </View>
                )}
              </View>
            )
          })
        )};
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },

  notificationButton: {
    position: "relative",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    marginLeft: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF5252",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#146922",
    paddingHorizontal: 4,
  },
  notificationCount: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  progressPercentage: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },

  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "bold",
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },

  progressDetails: {
    fontSize: 11,
    color: "white",
    fontWeight: "bold",
  },

  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (width - 52) / 2,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
});
