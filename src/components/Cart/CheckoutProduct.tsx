import React from 'react';
import { currency } from '@lib/currencyFormatter';
import Image from 'next/image';
import { useCart } from '@contexts/CartContext';
import Link from 'next/link';

const CheckoutProduct: React.FC<any> = ({ data, sold = false }) => {
    const { remove }: any = useCart();

    return (
        <li>
            <div className="flex gap-6 w-full items-center">
                <div className="relative overflow-hidden rounded-xl aspect-square h-20">
                    <Image src={data.image} alt={data.name} layout="fill" />
                </div>
                <div className="flex flex-col gap-2 grow justify-between">
                    <div className="flex justify-between">
                        <span className={`font-semibold text-sm `}>
                            {data.name}
                        </span>
                        <span
                            className={`text-sm font-medium text-gray-300 ${
                                sold ? 'text-gray-200 line-through' : ''
                            }`}
                        >
                            {currency.format(data.price)}
                        </span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CheckoutProduct;
