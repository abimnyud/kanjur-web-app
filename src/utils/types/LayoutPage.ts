import type { NextPage, NextComponentType } from 'next';
import type { ReactNode, ReactElement } from 'react';

export type LayoutPage<P = {}> = NextPage<P> & {
    // You can disable whichever you don't need
    getLayout?: (page: ReactElement) => ReactNode;
    layout?: NextComponentType;
};
