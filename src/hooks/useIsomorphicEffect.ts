import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = (): any => {
    return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
};
