import { View, Text, Pressable, TextInput, Image } from 'react-native';
import { ChevronsLeft } from "lucide-react-native"
import { router } from 'expo-router';
import { Container } from '~/components/Container';
import { Button } from '~/components/Button';

const Auth = () => {
    return (
        <Container>
            <View className="flex flex-row w-full">
                <Pressable onPress={() => {
                    router.back();
                }} className="p-4 bg-slate-500 rounded-xl">
                    <ChevronsLeft className="text-white" color="white" />
                </Pressable>
            </View>

            <View className="flex flex-col mt-8 gap-1">
                <Text className="text-5xl font-medium text-slate-800">Welcome back to <Text className='text-blue-500 font-semibold'>Stride</Text></Text>
                <Text className='text-base text-slate-500'>Please login or signup to continue</Text>
            </View>

            <View className="flex flex-col gap-2 my-12">
                <TextInput
                    className="p-4 bg-white focus:border-blue-500 rounded-xl border border-slate-300"
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <Button
                    className="rounded-xl bg-blue-500"
                    onPress={() => {
                        // Handle sign in logic here
                        console.log("Sign in button pressed");
                    }}
                    title="Sign in">

                </Button>

                <View className="flex flex-row gap-4 items-center justify-center w-full my-8">
                    <View className="w-[120px] h-[1px] bg-slate-500"></View>
                    <Text className="text-gray-500 font-medium text-lg">Or</Text>
                    <View className="w-[120px] h-[1px] bg-slate-500"></View>
                </View>

                <View className="flex flex-col gap-2">
                    <Pressable className="border border-slate-500 p-4 rounded-xl items-center justify-center flex flex-row gap-2">
                        <Image
                            source={require('~/assets/icons/google.png')}
                            className="w-6 h-6"
                        />
                        <Text className="font-semibold text-slate-500 text-md">
                            Sign in with Google
                        </Text>
                    </Pressable>

                    <Pressable className="bg-slate-500 p-4 rounded-xl items-center justify-center flex flex-row gap-2">
                        <Image
                            source={require('~/assets/icons/github.png')}
                            className="w-6 h-6"
                        />
                        <Text className="font-semibold text-white text-md">
                            Sign in with Google
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Container>
    )
}

export default Auth