import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface IStagesProps {
  stages: [{ stage: string; duration: number }];
}

const Stages = ({ stages }: IStagesProps) => {
  return (
    <LineChart
      data={{
        labels: stages.map((stage) => {
          return stage.stage;
        }),
        datasets: [
          {
            data: stages.map((stage) => {
              return stage.duration;
            }),
          },
        ],
      }}
      width={Dimensions.get("window").width}
      height={220}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 1,
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
  );
};

export default Stages;
