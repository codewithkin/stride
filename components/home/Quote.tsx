import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Modal,
    StyleSheet,
} from "react-native";
import { MotiView } from "moti";
import axios from "axios";

type QuoteType = {
    q: string; // quote
    a: string; // author
};

const Quote = () => {
    const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
    const [quote, setQuote] = useState<QuoteType | null>(null);
    const [bgUrl, setBgUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const lastImageFetchTime = useRef<number | null>(null);

    const fetchQuote = async () => {
        try {
            const { data } = await axios.get<QuoteType[]>("https://zenquotes.io/api/quotes");
            setQuotes(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBackgroundImage = () => {
        const now = Date.now();
        if (!lastImageFetchTime.current || now - lastImageFetchTime.current > 20000) {
            const width = Math.round(Dimensions.get("window").width);
            const height = 200 + Math.floor(Math.random() * 300);
            const newUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
            setBgUrl(newUrl);
            lastImageFetchTime.current = now;
        }
    };

    const getRandomQuote = (quotesArray: QuoteType[]) => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        setQuote(quotesArray[randomIndex]);
    };

    useEffect(() => {
        fetchQuote();
        fetchBackgroundImage();

        const imageInterval = setInterval(fetchBackgroundImage, 5000); // Check every 5s

        return () => clearInterval(imageInterval);
    }, []);

    useEffect(() => {
        if (quotes && quotes.length > 0) {
            getRandomQuote(quotes);
        }
    }, [quotes]);

    if (loading || !quote || !bgUrl) {
        return (
            <MotiView
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                    loop: true,
                    type: "timing",
                    duration: 1000,
                }}
                className="rounded-lg bg-gray-200 h-32 w-full my-4 p-4"
            />
        );
    }

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9}>
                <ImageBackground
                    source={{ uri: bgUrl }}
                    imageStyle={{ borderRadius: 12 }}
                    className="rounded-tr-lg rounded-bl-lg overflow-hidden p-4 my-4 min-h-[300px] shadow-md"
                >
                    <View className="bg-black/40 p-4 rounded-lg">
                        <Text className="text-white text-base italic">"{quote.q}"</Text>
                        <Text className="text-right text-sm text-white mt-2">— {quote.a || "Unknown"}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={false}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.modalContainer}
                    activeOpacity={1}
                >
                    <ImageBackground source={{ uri: bgUrl }} style={styles.modalBackground}>
                        <View style={styles.overlay}>
                            <Text style={styles.quoteText}>"{quote.q}"</Text>
                            <Text style={styles.authorText}>— {quote.a || "Unknown"}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        maxWidth: "90%",
    },
    quoteText: {
        color: "#fff",
        fontSize: 20,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 12,
    },
    authorText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

export default Quote;