import React, { useContext, useState } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import { getCookie } from 'cookies-next';
import type Product from '@/types/Product';
import Router from 'next/router';
const CartContext = React.createContext({});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartData, setCartData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const isomorphicEffect = useIsomorphicEffect();

    const loadUserCart = async (): Promise<void> => {
        setLoading(true);
        const token = getCookie('token');
        if (token) {
            let res: any = await fetch('/api/cart');
            res = await res.json();

            setCartData(res.data);
        }
        setLoading(false);
    };

    const updateUserCart = async (): Promise<void> => {
        const token = getCookie('token');
        if (token) {
            let res: any = await fetch('/api/cart');
            res = await res.json();

            setCartData(res.data);
        }
    };

    isomorphicEffect(() => {
        loadUserCart();
    }, []);

    const add = async (id: number): Promise<any> => {
        let res: any = await fetch(`/api/cart/add?product_id=${id}`, {
            method: 'POST',
        });
        if (res.status === 401) return Router.reload();

        res = await res.json();

        if (res.status) {
            updateUserCart();
        }
    };

    const remove = async (id: number): Promise<any> => {
        setLoading(true);
        let res: any = await fetch(`/api/cart/remove?product_id=${id}`, {
            method: 'POST',
        });
        if (res.status === 401) Router.reload();

        res = await res.json();

        if (res.status) {
            const newCartData = cartData.filter((item: any) => {
                return item.id !== id;
            });
            setCartData(newCartData);
        }
        setLoading(false);
    };

    return (
        <CartContext.Provider
            value={{
                loading,
                cartData,
                add,
                remove,
                updateUserCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
