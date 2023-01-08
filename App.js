import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "./compos/config";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons/faTemperatureLow";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
// import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons/faTemperatureLow";
// import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

const light = "#00E0FF";
const dark_contrast = "#232D46";
const dark = "rgb(26, 34, 52)";

export default function App() {
  const [data, setData] = useState("Air: 166| Hum: 38.00| Temp: 27.70");
  const [fill, setFill] = useState(58);
  const show = () => {
    const starCountRef = ref(db, "data/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setData(data);
      setFill(parseInt(data.split("| ")[1].slice(5)));
    });
  };
  const sound = () => {
    console.log("lol");
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Pressable onPress={sound}>

      <FontAwesomeIcon icon="fa-volume-high" style={styles.icon_tit} />
        </Pressable>
        <Text style={styles.txt}>
        Weather Analytics
        </Text>
        <Pressable onPress={show}>

      <FontAwesomeIcon icon="fa-arrow-rotate-right" style={styles.icon_tit} />
        </Pressable>
      
      </View>

      <View style={hum.hum}>
        <AnimatedCircularProgress
          size={160}
          width={3}
          fill={fill}
          rotation={0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {(fill) => (
            <>
              <Text style={hum.prog}>{Math.round(fill)}%</Text>
              <Text style={hum.hum_txt}>Humadity</Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={temp.co2_box}>
        <Text style={temp.box}>
          <Text style={styles.icon}>
            <FontAwesomeIcon icon="fa-cloud-meatball" style={temp.icon}/>
            {/* <FontAwesomeIcon icon={faMugSaucer} style={temp.icon} /> */}
          </Text>
          <Text style={temp.txt}>
            CO<Text style={{fontSize: 15, height: "7px"}}>2</Text>
          </Text>
          <Text style={temp.txt_left}>
          {Math.round(data.split("| ")[0].slice(5))} ppm
          </Text>
        </Text>
        
      </View>

      <View style={temp.co2_box}>
        <Text style={temp.box}>
          <Text style={styles.icon}>
            <FontAwesomeIcon icon="fa-temperature-high" style={temp.icon}/>
            {/* <FontAwesomeIcon icon={faMugSaucer} style={temp.icon} /> */}
          </Text>
          <Text style={temp.txt}>
            Tamperature
          </Text>
          <Text style={temp.txt_left}>
            {data.split("| ")[2].slice(6)} <Text style={{fontSize: 14, height: "30px"}}>o</Text>
          </Text>
          
        </Text>
      </View>

      <View style={temp.co2_box}>
        <Text>
          
          <Text style={styles.icon}>
            <FontAwesomeIcon icon="fa-cloud-sun" style={temp.icon}/>
            {/* <FontAwesomeIcon icon={faMugSaucer} style={temp.icon} /> */}
          </Text>
        </Text>
        <Text style={temp.txt}>
            Air Quality
          </Text>
          <Text style={temp.txt_left}>
          {100 - Math.round(parseInt(data.split("| ")[0].slice(5))*100/400)} %
          </Text>
      </View>

      <Pressable onPress={show} style={refresh.btn}>
        {/* <Text style={refresh.txt}>{"Refresh"}</Text> */}
        {/* <FontAwesomeIcon icon="fa-cloud-sun" style={temp.icon}/> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232D46",
    backgroundColor: "rgb(26, 34, 52)",
    alignItems: "center",
    // justifyContent: "center",
    position: "relative",
  },

  title: {
    width: "100%",
    textAlign: "center",
    position: "relative",
    top: "0",
    left: "50%",
    transform: "translate(-50%, 0%)",
    color: "#fff",
    fontSize: "26px",
    fontFamily: "sans-serif",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: "3px",
    borderBottomColor: "#232D46",
  },

  txt: {

    width: "80%",
    color: "rgba(115, 168, 183, 1)",
    fontSize: "25px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  icon_tit: {
    padding: "10px",
    width: "25px",
    height: "25px",
    // backgroundColor: light,
    color: light,
  },
  
});

const hum = StyleSheet.create({
  hum: {
    position: "relative",
    margin: "80px",
  },

  prog: {
    fontSize: "40px",
    color: "white",
  },

  hum_txt: {
    color: light,
  },
});

const refresh = StyleSheet.create({
  btn: {
    width: "100%",
    textAlign: "center",
    textTransform: "capitalize",
    backgroundColor: light,
    padding: "10px",
    // borderRadius: "12px",
    position: "absolute",
    bottom: "0px",
  },
  txt: {
    color: "black",
    fontSize: "22px",
  },
});

var wid_icon = "30px";

const temp = StyleSheet.create({
  co2_box: {
    marginBottom: "12px",
    width: "90%",
    height: "50px",
    // padding: "12px",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50px",
    color: "#01FBFD",
    backgroundColor: dark_contrast,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    overflow: "hidden",
  },

  co2_txt: {
    fontWeight: "bold",
    color: "#01FBFD",
  },

  box: {
    width: "100%",
    display: "flex",
  },
  icon: {
    padding: "10px",
    width: wid_icon,
    height: wid_icon,
    backgroundColor: light,
    fontSize: "20px",
  },

  txt: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: "20px",
    fontSize: "23px",
    color: "rgba(115, 168, 183, 1)",
  },
  txt_left: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    paddingRight: "20px",
    fontSize: "23px",
    color: light,
  }
  
});
