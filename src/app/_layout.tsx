import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Blender, Box, PackageSearch } from 'lucide-react-native';

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>

      <Tabs screenOptions={
        {
          tabBarInactiveTintColor: "#949494",
          tabBarActiveTintColor: "black",
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

        <Tabs.Screen
          name="tanstack"
          options={{
            title: "Receitas Tanstack",
            tabBarLabel: "Tanstack",
            tabBarIcon: (({ color, focused, size }) => <Box color={color} focusable={focused} size={size} />)
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
