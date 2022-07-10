import React, { useState } from 'react';
import type Product from '@/types/Product';
import { useCart } from '@contexts/CartContext';
import { useAuth } from '@contexts/AuthContext';
import { currency } from '@lib/currencyFormatter';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    data: Product;
}

const ProductCard: React.FC<Props> = ({ data }: Props) => {
    const { cartData, add, remove }: any = useCart();
    const { isAuthenticated }: any = useAuth();
    const [loading, setLoading] = useState(false);

    let inCart: number[] = cartData.map((item: any) => item.id);

    const handleClick = async (id: number): Promise<void> => {
        setLoading(true);
        if (inCart.includes(id)) {
            await remove(id);
        } else {
            await add(id);
        }
        setLoading(false);
    };

    return (
        <div
            key={`product-${data.id}`}
            onClick={() => (isAuthenticated ? handleClick(data.id) : null)}
            className="z-0 flex flex-col gap-4 md:gap-6 p-3 md:p-4 bg-light-100 relative group-one max-h-96 w-full lg:hover:scale-105 lg:active:scale-100 transition duration-300 rounded-xl overflow-hidden cursor-pointer"
        >
            <Link href={`/product/${data.id}`}>
                <a
                    onClick={(e) => e.stopPropagation()}
                    className="relative aspect-square rounded-lg overflow-hidden group shadow-md shadow-blue-0"
                >
                    {data.image && (
                        <Image
                            src={data.image}
                            className=""
                            layout="fill"
                            objectFit="cover"
                            alt={data.name}
                        />
                    )}
                </a>
            </Link>
            <div className="flex flex-col gap-2 h-auto">
                <span className="product-card-title">{data.name}</span>
                <p className="product-card-price">
                    {currency.format(Number(data.price))}
                </p>
                <div className="flex justify-between items-center justify-self-end">
                    <Link href={`/user/${data.seller.student_id}`}>
                        <a
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-ellipsis truncate w-28 text-gray-200 hover:text-gray-300 transition"
                        >
                            {data.seller.name}
                        </a>
                    </Link>
                    {isAuthenticated && (
                        <a
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick(data.id);
                            }}
                            className={`p-2 lg:p-3 flex justify-center items-center ${
                                inCart.includes(data.id)
                                    ? 'bg-blue-100'
                                    : 'bg-blue-0 lg:group-one-hover:bg-blue-100'
                            } rounded-full aspect-square cursor-pointer group transition`}
                        >
                            {loading ? (
                                <svg
                                    role="status"
                                    className="w-[0.70rem] h-3 md:w-[0.9rem] md:h-4 animate-spin text-light-100 fill-blue-100"
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
                            ) : (
                                <svg
                                    className={`h-3 md:h-4 stroke-2 ${
                                        inCart.includes(data.id)
                                            ? 'stroke-light-100'
                                            : 'stroke-blue-500 lg:group-one-hover:stroke-light-100'
                                    } `}
                                    viewBox="0 0 21 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.5 21H10H5.56873C3.14958 21 1.2841 18.8693 1.60382 16.4713L2.53715 9.47134C2.80212 7.48412 4.49726 6 6.50207 6H13.4979C15.5027 6 17.1979 7.48412 17.4628 9.47134L17.5 9.75L17.75 11.625"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M13 17H19"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 14L16 20"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 8V5C14 2.79086 12.2091 1 10 1V1C7.79086 1 6 2.79086 6 5L6 8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
