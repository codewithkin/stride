import { Tabs } from "expo-router"

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                }}
            />
        </Tabs>
    )
}

export default _layout