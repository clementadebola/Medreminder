import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

const FREQUENCIES = [
  {
    id: "1",
    label: "Once daily",
    icon: "sunny-outline" as const,
    times: ["09:00"],
  },
  {
    id: "2",
    label: "Twice daily",
    icon: "sync-outline" as const,
    times: ["09:00", "21:00"],
  },
  {
    id: "3",
    label: "Three times daily",
    icon: "time-outline" as const,
    times: ["09:00", "15:00", "21:00"],
  },
  {
    id: "4",
    label: "Four times daily",
    icon: "repeat-outline" as const,
    times: ["09:00", "13:00", "17:00", "21:00"],
  },
  { id: "5", label: "As needed", icon: "calendar-outline" as const, times: [] },
];

const DURATIONS = [
  { id: "1", label: "7 days", value: 7 },
  { id: "2", label: "14 days", value: 14 },
  { id: "3", label: "30 days", value: 30 },
  { id: "4", label: "90 days", value: 90 },
  { id: "5", label: "Ongoing", value: -1 },
];

export default function AddMedicationScreen() {
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    startDate: new Date(),
    times: ["09:00"],
    notes: "",
    reminderEnabled: true,
    refillReminder: false,
    currentSupply: "",
    refillAt: "",
  });

  const renderFrequencyOptions = () => {
    return (
      <View>
        {FREQUENCIES.map((freq) => (
          <TouchableOpacity key={freq.id}>
            <View>
              <Ionicons name={freq.icon} size={24} />
              <Text> {freq.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDurationOptions = () => {
    return (
      <View>
        {DURATIONS.map((dur) => (
          <TouchableOpacity key={dur.id}>
            <View>
              <Text>{dur.value > 0 ? dur.value : "∞"}</Text>
              <Text> {dur.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View>
      <LinearGradient
        colors={["#1a8e2d", "#146922"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View>
        <View>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
            <Text>New Medication</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <TextInput
              placeholder="medication Name"
              placeholderTextColor={"#999"}
              // value={}
            />
          </View>
          <View>
            <TextInput
              placeholder="Dosage (e.g., 500mg)"
              placeholderTextColor={"#999"}
              // value={}
            />
          </View>

          {/* Schedule */}
          <View>
            <Text>How often?</Text>
            {renderFrequencyOptions()}

            <Text>For How Long?</Text>
            {renderDurationOptions()}

            <TouchableOpacity>
              <View>
                <Ionicons name="calendar" size={20} color={"#1a8e2d"} />
                <Text>Starts {}</Text>
              </View>
            </TouchableOpacity>

            <DateTimePicker value={form.startDate} mode="date" />

            {/* <DateTimePicker mode="time" value={(()=> {
                const [hours, minutes] = form.times[0].split(":").map(Number);
                const date = new Date();
                date.setHours(hours, minutes, 0, 0);
                return date;
            })()}
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
