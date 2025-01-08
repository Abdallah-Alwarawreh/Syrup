"use client";

export async function updateLocale(locale: string) {
    try {
        const response = await fetch("/api/set-locale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ locale }),
        });

        if (!response.ok) {
            throw new Error("Failed to set locale");
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error || "Unknown error");
        }

        console.log("Locale updated successfully");
    } catch (error) {
        console.error("An error occured during changing locale:", error);
    }
}
