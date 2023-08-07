import Svg, { Path } from "react-native-svg";
import { StyleSheet, View } from "react-native";

export default function AddRemoveButton() {
  return (
    <View style={styles.container}>
         <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 25 25"
        >
        <Path
          fill="#fff"
          stroke="#e8e8e8"
          strokeWidth={28.4444}
          strokeMiterlimit={4}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          d="M744.191 261.473c133.299 133.299 133.299 349.419 0 482.718s-349.419 133.299-482.718 0c-133.299-133.299-133.299-349.419 0-482.718s349.419-133.299 482.718 0z"
        />
        <Path
          fill="#bdbdbd"
          d="M382.154 362.038l-20.113 20.113 120.678 120.681-120.678 120.678 20.113 20.113 120.678-120.678 120.681 120.678 20.113-20.113-120.681-120.678 120.681-120.681-20.113-20.113-120.681 120.681-120.678-120.681z"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        width: 25,
        height: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
});