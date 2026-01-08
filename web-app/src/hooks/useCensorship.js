import { useState, useCallback, useEffect } from 'react';

export const BANNED_WORDS = [
    "tonto", "idiota", "estúpido", "basura", "imbécil", "estupido", "mierda", "puto", "puta", "cabrón", "cojones", "pendejo"
];

export const useCensorship = () => {
    const [wasCensored, setWasCensored] = useState(false);
    const [censoredCount, setCensoredCount] = useState(0);

    const censorText = useCallback((text) => {
        if (!text) return text;

        let localCensored = false;
        let localCount = 0;
        let processedText = text;

        BANNED_WORDS.forEach(word => {
            const regex = new RegExp(word, "gi");
            const matches = processedText.match(regex);

            if (matches) {
                localCensored = true;
                localCount += matches.length;
                processedText = processedText.replace(regex, "*".repeat(word.length));
            }
        });

        setWasCensored(localCensored);
        setCensoredCount(localCount);

        return processedText;
    }, []);

    useEffect(() => {
        if (wasCensored) {
            console.log(`[Censorship] Se detectaron ${censoredCount} palabras prohibidas.`);
        }
    }, [wasCensored, censoredCount]);

    const resetCensorshipStats = useCallback(() => {
        setWasCensored(false);
        setCensoredCount(0);
    }, []);

    return {
        censorText,
        wasCensored,
        censoredCount,
        resetCensorshipStats,
        bannedWords: BANNED_WORDS
    };
};
