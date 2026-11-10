import { Tabs } from "expo-router";
import { Blender, PackageSearch } from 'lucide-react-native';


export default function RootLayout() {
  return (
    <Tabs screenOptions={
      {
        tabBarInactiveTintColor: "#4b4b4b",
        tabBarActiveTintColor: "black"
      }
    }>
      <Tabs.Screen 
        name="index"
        options={{
          title: "Receitas Fetch",
          tabBarLabel: "Fetch",
          tabBarIcon: (({ color, focused, size }) => <Blender color={color} focusable={focused} size={size} />)
        }}
      />
      <Tabs.Screen 
        name="axios"
        options={{
          title: "Receitas Axios",
          tabBarLabel: "Axios",
          tabBarIcon: (({ color, focused, size }) => <PackageSearch color={color} focusable={focused} size={size} />)
        }}
      />
    </Tabs>
  );
}
