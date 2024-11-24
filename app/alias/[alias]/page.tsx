"use client";

import { useEffect, useState } from "react";

export default function AliasRedirectPage({ params }: { params: { alias: string } }) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/alias/${params.alias}`);
                const data = await response.json();

                if (response.ok) {
                    window.location.href = data.url; // Redirect to the original URL
                } else {
                    setError(data.error || "Unknown error occurred");
                }
            } catch {

            }
        };

        fetchData();
    }, [params.alias]);

    if (error) {
        return <h1>{error}</h1>;
    }

    return <h1>Redirecting...</h1>;
}
