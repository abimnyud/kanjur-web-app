import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AuthProvider } from '@contexts/AuthContext';
import { IsMobileProvider } from '@contexts/MobileContext';
import { CartProvider } from '@contexts/CartContext';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
    Component: Page<P>;
};

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => page;

function MyApp({ Component, pageProps }: MyAppProps) {
    const getLayout = Component.getLayout ?? defaultGetLayout;
    const router = useRouter()

    return (
        <AuthProvider>
            <CartProvider>
                <IsMobileProvider>
                    {getLayout(<Component {...pageProps} key={router.asPath}/>)}
                </IsMobileProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default MyApp;
