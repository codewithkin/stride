import { View, Text } from 'react-native'
import { authClient } from '~/lib/auth-client';

const Home = () => {
    // Get the user's session
    const { data: session } = authClient.useSession();
    console.log("Session data:", session);

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home