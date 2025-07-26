import { router } from 'expo-router';
import { User } from 'lucide-react-native';
import { View, Text, Image, Pressable } from 'react-native'
import Quote from '~/components/home/Quote';
import { authClient } from '~/lib/auth-client';

const Home = () => {
    // Get the user's session
    const { data: session } = authClient.useSession();
    console.log("Session data:", session);

    return (
        <View className="p-4 flex flex-col gap-8">
            <View className="flex flex-row items-center justify-between w-full">
                {/* Logo */}
                <View className="flex flex-row gap-2 items-center rounded-full px-8 py-4 border border-gray-500">
                    <Text className='text-lg text-gray-500 font-semibold'>Stride</Text>
                </View>

                {
                    session?.user ?
                        (
                            <Pressable
                                onPress={() => {
                                    router.push("/(tabs)/profile")
                                }}
                            >
                                <Image
                                    className="rounded-full shadow-md border-2 border-blue-600"
                                    style={{
                                        height: 56,
                                        width: 56
                                    }}
                                    source={{
                                        uri: session?.user.image || "https://imgs.search.brave.com/a-_x5h2gdM9N2IND0zPoO2pSchDMLlo-ii43W1epLE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/bG90bS13aHkta2xl/aW4tbW9yZXR0aS1p/cy1zby1hbWF6aW5n/LXYwLWhyOGlpMTMw/YmtwZDEuanBnP3dp/ZHRoPTY0MCZjcm9w/PXNtYXJ0JmF1dG89/d2VicCZzPTQ1NmI4/YjA0NGU3ZDU5ZDNk/ZjczOTBiMTk3YWQ4/MTc2OTA4YmFjNjk"
                                    }}
                                />
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => {
                                    router.push("/auth");
                                }}
                                className="bg-blue-500 border border-gray-600 rounded-full p-4">
                                <User size={24} color="white" />
                            </Pressable>
                        )
                }
            </View>

            <Quote />

            {/* Previous goals */}
        </View >
    )
}

export default Home