import { ColorScheme } from "@constants/colorScheme";
import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap
  } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
  import { withLayoutContext } from "expo-router";
  
  const { Navigator } = createMaterialTopTabNavigator();
  
  export const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator,
   TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator);


  export default function Layout () {
    return <MaterialTopTabs screenOptions={{
      tabBarIndicatorStyle: {
        backgroundColor:ColorScheme.MagentaPrimary,
      }, 
    }}>
          <MaterialTopTabs.Screen name="countryDetail" options={{ title: "Country Info"}}/>
          <MaterialTopTabs.Screen name="mapView" options={{ title: "Map View"}}/>

    </MaterialTopTabs>
  }