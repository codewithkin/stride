import { View, Text, Pressable, TextInput, Image } from 'react-native';
import { ChevronsLeft, Check } from "lucide-react-native";
import { router } from 'expo-router';
import { Container } from '~/components/Container';
import { Button } from '~/components/Button';
import { useState } from 'react';
import { authClient } from '~/lib/auth-client';
import Toast from 'react-native-toast-message';
import { MotiView } from 'moti';

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [complete, setComplete] = useState(false);

    const signInWithMagicLink = async () => {
        try {
            setLoading(true);
            const { data, error } = await authClient.signIn.magicLink({
                email,
                callbackURL: "/(tabs)/home",
                newUserCallbackURL: "/welcome",
                errorCallbackURL: "/error",
            });

            if (data) {
                Toast.show({
                    type: 'success',
                    text1: 'Success! Please check your email',
                    text2: 'A magic link has been sent to your email address. Click the link to sign in.',
                });
                setComplete(true);
            }

            if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'An error occurred',
                    text2: 'Please try again later',
                });
                console.error("Error during sign-in with magic link:", error);
            }
        } catch (e) {
            console.error("Error during sign-in with magic link:", e);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle = async () => {
        try {
            setLoading(true);

            const { data, error } = await authClient.signIn.social({
                provider: "google",
                newUserCallbackURL: "/welcome",
                callbackURL: "/(tabs)/home"
            });

            if (error) {
                console.log("An error occured");

                Toast.show({
                    type: "error",
                    text1: "An error occured while signing in",
                    text2: "Pleas try again later"
                });

                return
            }
        } catch (e) {
            console.log("An error occured while signing in: ", e);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGithub = async () => {
        try {
            setLoading(true);

            const { data, error } = await authClient.signIn.social({
                provider: "github",
                newUserCallbackURL: "/welcome",
                callbackURL: "/(tabs)/home"
            });

            if (error) {
                console.log("An error occured");

                Toast.show({
                    type: "error",
                    text1: "An error occured while signing in",
                    text2: "Pleas try again later"
                });

                return
            }
        } catch (e) {
            console.log("An error occured while signing in: ", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <View className="flex flex-row w-full">
                <Pressable onPress={() => router.back()} className="p-4 bg-slate-500 rounded-xl">
                    <ChevronsLeft className="text-white" color="white" />
                </Pressable>
            </View>

            {complete ? (
                <MotiView
                    from={{ translateY: 50, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ type: 'timing', duration: 500 }}
                    className="flex flex-col items-center justify-center bg-white border border-green-200 rounded-xl p-6 mt-12"
                >
                    <View className="bg-green-100 p-4 rounded-full mb-4">
                        <Check size={48} color="green" />
                    </View>
                    <Text className="text-2xl font-semibold text-slate-800 mb-2">Magic Link Sent!</Text>
                    <Text className="text-center text-slate-600">
                        We've sent a secure login link to <Text className="font-medium text-blue-500">{email}</Text>.
                        Please check your inbox and follow the link to continue.
                    </Text>
                </MotiView>
            ) : (
                <MotiView
                    from={{ translateY: 60, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ type: 'timing', duration: 500 }}
                    className="flex flex-col gap-2 my-12 w-full"
                >
                    <View className="flex flex-col mt-8 gap-1">
                        <Text className="text-5xl font-medium text-slate-800">
                            Welcome back to <Text className='text-blue-500 font-semibold'>Stride</Text>
                        </Text>
                        <Text className='text-base text-slate-500'>Please login or signup to continue</Text>
                    </View>
                    <TextInput
                        className="p-4 bg-white focus:border-blue-500 rounded-xl border border-slate-300 w-full"
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Button
                        disabled={loading || !email}
                        className="rounded-xl bg-blue-500 disabled:bg-blue-300 w-full"
                        onPress={signInWithMagicLink}
                        title="Sign in"
                    />

                    <View className="flex flex-row gap-4 items-center justify-center w-full my-8">
                        <View className="w-[120px] h-[1px] bg-slate-500" />
                        <Text className="text-gray-500 font-medium text-lg">Or</Text>
                        <View className="w-[120px] h-[1px] bg-slate-500" />
                    </View>

                    <View className="flex flex-col gap-2">
                        <Pressable
                            onPress={async () => {
                                await signInWithGoogle()
                            }}
                            disabled={loading}
                            className="border border-slate-500 p-4 rounded-xl items-center justify-center flex flex-row gap-2 w-full disabled:bg-slate-200">
                            <Image
                                source={require('~/assets/icons/google.png')}
                                className="w-6 h-6"
                            />
                            <Text className="font-semibold text-slate-500 text-md">
                                Sign in with Google
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={async () => {
                                await signInWithGoogle()
                            }}
                            disabled={loading}
                            className="bg-slate-500 p-4 rounded-xl items-center justify-center flex flex-row gap-2">
                            <Image
                                source={require('~/assets/icons/github.png')}
                                className="w-6 h-6"
                            />
                            <Text className="font-semibold text-white text-md">
                                Sign in with Github
                            </Text>
                        </Pressable>
                    </View>
                </MotiView>
            )}
        </Container>
    )
}

export default Auth;
