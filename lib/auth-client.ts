import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === "production" ? "https://api.stride.buzz" : "http://localhost:3000",
    plugins: [
        expoClient({
            scheme: "stride",
            storagePrefix: "stride",
            storage: SecureStore,
        })
    ]
});