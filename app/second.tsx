import { Image, Pressable, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import { MotiView } from 'moti';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Second() {
    const [checklist, setChecklist] = useState({
        item1: true,
        item2: false,
        item3: false,
    });

    const toggleItem = (key: keyof typeof checklist) => {
        setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View className="flex flex-col items-center justify-between w-full px-2 h-full">
            {/* Top 3/4: Image and Checklist */}
            <View className="relative h-1/2 p-4 flex flex-col justify-center items-center w-full">
                {/* Image */}
                <MotiView
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 800, type: 'timing' }}
                    className="mb-4"
                >
                    <Image
                        className="w-48 h-48 rounded-2xl"
                        source={require('../assets/images/onboarding/checklist.jpg')}
                    />
                </MotiView>

                {/* Checklist (custom checkboxes) */}
                <View className="w-full px-6 mt-4">
                    {[
                        { label: 'Drink a glass of water', key: 'item1' },
                        { label: 'Write in your journal', key: 'item2' },
                        { label: 'Walk 10 minutes', key: 'item3' },
                    ].map(({ label, key }, index) => (
                        <MotiView
                            from={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ delay: 0.2 + index * 0.15, type: 'timing' }}
                            key={key}
                        >
                            <Pressable
                                onPress={() => toggleItem(key as keyof typeof checklist)}
                                className="flex-row items-center gap-2 mb-2 shadow-md bg-white border border-indigo-400 rounded-xl p-4"
                            >
                                <View
                                    className={`w-5 h-5 rounded border-2 ${checklist[key as keyof typeof checklist]
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-gray-400'
                                        } items-center justify-center`}
                                >
                                    {checklist[key as keyof typeof checklist] && (
                                        <Text className="text-white text-xs">✓</Text>
                                    )}
                                </View>
                                <Text className="text-base text-gray-800">{label}</Text>
                            </Pressable>
                        </MotiView>
                    ))}
                </View>
            </View>

            {/* Bottom 1/4: Text & Buttons */}
            <MotiView
                from={{ opacity: 0, translateY: 200 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 1500 }}
                className="flex flex-col justify-between items-center h-1/2 rounded-tr-3xl rounded-tl-3xl bg-indigo-200 w-full p-6"
            >
                <View className="flex flex-col gap-1">
                    <Text className="text-2xl font-semibold text-gray-900">Your Progress Partner</Text>
                    <Text className="text-base text-gray-600">
                        Stride helps you stay accountable by tracking your daily goals. Small wins build big habits – and we’re here to cheer you on every step of the way.
                    </Text>
                </View>

                <View className="flex flex-row w-full items-center justify-between mt-4">
                    {/* Progress indicator */}
                    <View className="flex flex-row items-center justify-center gap-2">
                        <View className="w-[30px] h-[8px] bg-blue-300 rounded-full" />
                        <View className="w-[30px] h-[8px] bg-blue-600 rounded-full" />
                    </View>

                    {/* Navigation buttons */}
                    <View className="flex flex-row items-center gap-2">
                        <Button className="border border-gray-400 bg-gray-400" title="Back" onPress={() => router.back()}>
                            Back
                            <ChevronRight />
                        </Button>
                        <Button className="bg-blue-600" title="Sign up" onPress={() => router.push('/auth')}>
                            Sign up
                            <ChevronRight />
                        </Button>
                    </View>
                </View>
            </MotiView>
        </View>
    );
}
