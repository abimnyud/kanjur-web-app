import React, { useContext, useState, useCallback } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';

const IsMobilesContext = React.createContext({});

export function useIsMobile() {
    return useContext(IsMobilesContext);
}

const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);
    const isomorphicEffect = useIsomorphicEffect();

    const updateTarget = useCallback((e: any) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    isomorphicEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addEventListener('change', (e) => updateTarget(e), {
            passive: true,
        });

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setTargetReached(true);
        }

        return () =>
            media.removeEventListener('change', (e) => updateTarget(e));
    }, [updateTarget, width]);

    return targetReached;
};

export function IsMobileProvider({ children }: { children: React.ReactNode }) {
    const isMobile = useMediaQuery(976);

    return (
        <IsMobilesContext.Provider value={isMobile}>
            {children}
        </IsMobilesContext.Provider>
    );
}
