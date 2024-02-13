import moment from "moment";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ITimeSeries {
  points: string[] | undefined;
  title: string;
}

const TimeSeries = ({ points, title }: ITimeSeries) => {
  if (!points || points.length === 0) {
    return null;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{title}</Text>
      <LineChart
        data={{
          labels: points.map((t) => {
            return moment(t[0]).format("HH:MM");
          }),
          datasets: [
            {
              data: points.map((t) => {
                return parseInt(t[1]);
              }),
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#f26b00",
          backgroundGradientFrom: "#cb8c00",
          backgroundGradientTo: "#efa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default TimeSeries;
