import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider, useDispatch} from "react-redux";
import {persistedReducer, persistor, store} from "./store/store";
import MainLayout from "./layouts/MainLayout";
import {GestureHandlerRootView} from "react-native-gesture-handler";
// import {loadAsync, useFonts} from "expo-font";
import {useEffect} from "react";
import {loadAsync, useFonts} from "expo-font";

export default function App() {

    loadAsync(
        {
            'HurmeGeom': require('./fonts/HurmeGeometricSans1.otf'),
            "HurmeGeomBold":require('./fonts/HurmeGeometricSans1Bold.otf'),
            "HurmeGeom2":require('./fonts/HurmeGeometricSans2.otf'),
            "HurmeGeom3":require('./fonts/HurmeGeometricSans3.otf'),
            "HurmeGeomBold2":require('./fonts/HurmeGeometricSans2Bold.otf'),
            "HurmeGeomHairline":require('./fonts/HurmeGeometricSans1Hairline.otf'),
            "HurmeGeomThin":require('./fonts/HurmeGeometricSans1Hairline.otf'),
            "HurmeGeomSemiBold":require('./fonts/HurmeGeometricSans1SemiBold.otf'),
            "HurmeGeomItalicBold2":require('./fonts/HurmeGeometricSans2BoldItalic.otf'),
            "HurmeGeomItalicSemiBold2":require('./fonts/HurmeGeometricSans2SemiBoldItalic.otf')
        }
    )
    // useEffect(()=>{
    //     console.log(loaded)
    // },[loaded])

  return (
      <Provider store={store}>
          <GestureHandlerRootView style={styles.container}>
              <MainLayout/>
          </GestureHandlerRootView>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#f2f2f2'
  },
});
