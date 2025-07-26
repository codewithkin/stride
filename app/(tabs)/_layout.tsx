import { Tabs } from "expo-router";
import { CircleUser, Goal, History, Home } from "lucide-react-native";
import { StyleSheet } from "react-native";

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
                tabBarActiveTintColor: "#1d4ed8", // Optional: active icon/text color
                tabBarInactiveTintColor: "#6b7280", // Optional: inactive color
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => <History size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="goals"
                options={{
                    title: "Your Goals",
                    tabBarIcon: ({ color }) => <Goal size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <CircleUser size={24} color={color} />,
                }}
            />
        </Tabs>
    );
};

export default _layout;

const styles = StyleSheet.create({
    tabBar: {
        paddingVertical: 12,
        borderTopWidth: 2,
        borderTopColor: "#1d4ed8", // Tailwind blue-700
        backgroundColor: "#f9fafb", // Tailwind gray-50
        height: 60, // Optional: increase tab bar height for spacing
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
});