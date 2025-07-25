import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { magicLinkClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === "production" ? "https://api.stride.buzz" : "http://192.168.1.2:8080",
    plugins: [
        expoClient({
            scheme: "stride",
            storagePrefix: "stride",
            storage: SecureStore,
        }),
        magicLinkClient()
    ]
});