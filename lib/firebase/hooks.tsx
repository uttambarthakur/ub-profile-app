"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { type User } from "firebase/auth";
import { auth } from "./clientApp";


export function useAuthState(initializedUser: User | null = null) {
    const [user, setUser] = useState<User | null>(initializedUser ?? null);
    const [loading, setLoading] = useState(initializedUser === null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
}

