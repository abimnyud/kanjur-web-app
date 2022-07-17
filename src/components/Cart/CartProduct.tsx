import { FC, useState } from 'react';
import { currency } from '@lib/currencyFormatter';
import Image from 'next/image';
import { useCart } from '@contexts/CartContext';
import Link from 'next/link';


const CartProduct: FC<any> = ({ data, sold = false }) => {
    const { remove }: any = useCart();
    const [loading, setLoading] = useState(false);

    return (
        <li className="flex gap-6 grow w-auto">
            <div className="relative overflow-hidden rounded-xl aspect-square h-24">
                {sold && (
                    <div className="flex justify-center items-center h-full w-full bg-gray-300 absolute z-10 bg-opacity-90">
                        <span className="text-sm font-medium text-light-100">
                            Terjual
                        </span>
                    </div>
                )}
                <Image src={data.image} alt={data.name} layout="fill" objectFit="cover" />
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
                        onClick={!loading ? async () => {
                            setLoading(true);
                            await remove(data.id);
                        } : undefined}
                        className="p-3 bg-light-200 hover:bg-red-0 rounded-full cursor-pointer group transition"
                    >
                        {loading ? (
                            <svg
                                role="status"
                                className="w-[0.9rem] h-4 animate-spin text-light-100 fill-red-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        ) : (<svg
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
                        </svg>)
                        }
                    </a>
                </div>
            </div>
        </li>
    );
};

export default CartProduct;
