import React from 'react';
import { currency } from '@lib/currencyFormatter';
import Image from 'next/image';
import { useCart } from '@contexts/CartContext';
import Link from 'next/link';

const CartProduct: React.FC<any> = ({ data, sold = false }) => {
    const { remove }: any = useCart();

    return (
        <li>
            <div className="flex gap-6 grow w-auto">
                <div className="relative overflow-hidden rounded-xl aspect-square h-24">
                    {sold && (
                        <div className="flex justify-center items-center h-full w-full bg-gray-300 absolute z-10 bg-opacity-90">
                            <span className="text-sm font-medium text-light-100">
                                Terjual
                            </span>
                        </div>
                    )}
                    <Image src={data.image} alt={data.name} layout="fill" />
                </div>
                <div className="flex flex-col gap-2 grow justify-between">
                    <div className="flex flex-col gap-2">
                        <span
                            className={`font-semibold ${
                                sold ? 'text-gray-300 line-through' : ''
                            }`}
                        >
                            {data.name}
                        </span>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-sm font-semibold text-gray-300 ${
                                    sold ? 'text-gray-200 line-through' : ''
                                }`}
                            >
                                {currency.format(data.price)}
                            </span>
                            <span
                                className={`text-xs ${
                                    sold ? 'text-red-100' : 'text-green-300'
                                }`}
                            >
                                •
                            </span>
                            <span
                                className={`text-xs ${
                                    sold ? 'text-red-100' : 'text-green-300'
                                }`}
                            >
                                {sold ? 'Stok Tidak Tersedia' : 'Stok Tersedia'}
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <Link href={`/user/${data.seller.student_id}`}>
                            <a className="text-xs font-medium text-blue-500 hover:text-blue-100 transition">
                                {data.seller.name}&nbsp;
                            </a>
                        </Link>
                        <a
                            onClick={() => remove(data.id)}
                            className="p-3 bg-light-200 hover:bg-red-0 rounded-full cursor-pointer group transition"
                        >
                            <svg
                                className="h-4 stroke-2 stroke-gray-300 group-hover:stroke-red-100"
                                viewBox="0 0 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.05063 6.73418C1.20573 5.60763 2.00954 4 3.41772 4H14.5823C15.9905 4 16.7943 5.60763 15.9494 6.73418V6.73418C15.3331 7.55584 15 8.5552 15 9.58228V16C15 18.2091 13.2091 20 11 20H7C4.79086 20 3 18.2091 3 16V9.58228C3 8.5552 2.66688 7.55584 2.05063 6.73418V6.73418Z" />
                                <path
                                    d="M11 15L11 9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 15L7 9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13 4L12.4558 2.36754C12.1836 1.55086 11.4193 1 10.5585 1H7.44152C6.58066 1 5.81638 1.55086 5.54415 2.36754L5 4"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartProduct;
