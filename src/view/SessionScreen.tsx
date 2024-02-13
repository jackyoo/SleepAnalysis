import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useSleepIntervalViewModel from "../controller/sleepSessionViewModel";
import { useEffect, useState } from "react";
import Stages from "./components/Stages";
import TimeSeries from "./components/TimeSeries";

interface ISessionScreenProps {
  navigation: BottomTabNavigationProp<{ EntityScreen: undefined }>;
  route: RouteProp<{ EntityScreen: { entityName: string; userId: string } }>;
}
const SessionScreen = ({ navigation, route }: ISessionScreenProps) => {
  const { fetchSleepIterval, transformedData, error, isLoading } =
    useSleepIntervalViewModel({
      userId: route.params.userId,
    });
  useEffect(() => {
    fetchSleepIterval();
  }, [fetchSleepIterval]);

  const [expandedItem, setExpandedItem] = useState(null);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{route.params.entityName} is loading</Text>
      </View>
    );
  } else if (error) {
    return (
      <View>
        <Text>Error while loading</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const isExpanded = expandedItem === item.id;

    const toggleExpansion = () => {
      setExpandedItem(isExpanded ? null : item.id);
    };

    return (
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity onPress={toggleExpansion}>
          <Text style={{ fontWeight: "bold" }}>
            {item.time} - Score: {item.score}
          </Text>
        </TouchableOpacity>
        {isExpanded && (
          <View style={{ marginTop: 5 }}>
            <Stages stages={item.stages} />
            <TimeSeries points={item.tnt} title={"tnt"} />
            <TimeSeries points={item.tempRoomC} title={"Room Temp"} />
            <TimeSeries
              points={item.respiratoryRate}
              title={"Respiratory Rate"}
            />
            <TimeSeries points={item.tempBedC} title={"Bed Temp"} />
            <TimeSeries points={item.heartRate} title={"Heart Rate"} />
            <TimeSeries points={item.heating} title={"Heating"} />
          </View>
        )}
      </View>
    );
  };

  if (!transformedData) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={transformedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={expandedItem}
      />
    </View>
  );
};

export default SessionScreen;
