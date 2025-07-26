import { Image, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import { MotiView } from 'moti';
import { ChevronRight, Sparkles, WandSparkles, SquarePen } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Store from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';

export default function Home() {
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => {
            const result = await Store.getItem('hasCompletedOnboarding');
            if (result === 'true') {
                // router.replace('/(tabs)/home');
                router.replace('/auth'); // Use `replace` to prevent back nav
            } else {
                setHasCompletedOnboarding(false); // User needs onboarding
            }
        });
    }, []);

    if (hasCompletedOnboarding === null) {
        return null; // Or show splash/loading screen
    }

    return (
        <View className="flex flex-col items-center justify-between w-full px-2 h-full">
            {/* Image container */}
            <View className="relative h-1/2 p-4">
                <View className="flex flex-col relative w-full">
                    <MotiView
                        from={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 0.4, type: 'timing', duration: 800 }}
                        className="absolute top-0 left-0 items-center"
                    >
                        <Image
                            className="rounded-full w-48 h-48"
                            source={require('../assets/images/onboarding/sing.jpg')}
                        />
                        <Sparkles className="text-blue-600" />
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 0.6, type: 'timing', duration: 800 }}
                        className="absolute top-40 right-16 items-center"
                    >
                        <Image
                            className="rounded-full w-36 h-48"
                            source={require('../assets/images/onboarding/walk.jpg')}
                        />
                        <WandSparkles className="stroke-blue-600" />
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 0.8, type: 'timing', duration: 800 }}
                        className="absolute top-0 right-16 items-center"
                    >
                        <Image
                            className="rounded-full w-20 h-20"
                            source={require('../assets/images/onboarding/read.jpg')}
                        />
                        <WandSparkles size={12} className="text-gray-600" />
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 1, type: 'timing', duration: 800 }}
                        className="absolute top-60 left-16 items-center"
                    >
                        <Image
                            className="rounded-full w-24 h-36"
                            source={require('../assets/images/onboarding/write.jpg')}
                        />
                        <SquarePen size={12} className="text-gray-600" />
                    </MotiView>
                </View>
            </View>

            {/* Text content */}
            <MotiView
                from={{
                    opacity: 0,
                    translateY: 200,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0,
                }}
                transition={{
                    type: 'timing',
                    duration: 1500,
                }}
                className="flex flex-col justify-between items-center h-1/2 rounded-tr-3xl rounded-tl-3xl bg-indigo-200 w-full p-6"
            >
                <View className="flex flex-col gap-1">
                    <Text className="text-2xl font-semibold">Build your stride</Text>
                    <Text className="text-base text-gray-600">
                        Stay consistent with your goals by showing up daily. Stride helps you build momentum one
                        step at a time.
                    </Text>
                </View>

                <View className="flex flex-row w-full items-center justify-between mt-4">
                    {/* Progress indicator */}
                    <View className="flex flex-row items-center justify-center gap-2">
                        <View className="w-[30px] h-[8px] bg-blue-600 rounded-full" />
                        <View className="w-[30px] h-[8px] bg-blue-300 rounded-full" />
                    </View>

                    {/* Next Btn */}
                    <Button
                        className="bg-blue-600"
                        title="Next"
                        onPress={() => {
                            router.push('/second');
                        }}
                    >
                        Next
                        <ChevronRight />
                    </Button>
                </View>
            </MotiView>
        </View>
    );
}
