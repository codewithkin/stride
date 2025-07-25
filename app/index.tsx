import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

import PaperOnboarding, { PaperOnboardingItemType } from "@gorhom/paper-onboarding";
import { Text } from 'react-native';

export default function Home() {
    return (
        <>
            <Container>
                <ScreenContent path="app/index.tsx" title="Home"></ScreenContent>
                <Text>Welcome to Stride!</Text>
            </Container>
        </>
    );
}
