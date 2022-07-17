import type { LayoutPage } from '@/types/LayoutPage';
import { ReactNode, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useAuth } from '@contexts/AuthContext';
import { useCart } from '@contexts/CartContext';
import Image from 'next/image';
import MainLayout from '@components/Layout/MainLayout';
import MyHead from '@components/Shared/MyHead';
import moment from 'moment';
import 'moment/locale/id';

const ProductPage: LayoutPage<any> = ({ productData }) => {
    const { data } = productData;
    const { isAuthenticated }: any = useAuth();
    const { cartData, add, remove }: any = useCart();
    const [loading, setLoading] = useState(false);

    moment.locale('id');
    const d = moment(data.updated_at)
    const d2 = moment(data.seller.created_at)
    const time = moment(d).format('LLLL');
    const memberSince = moment(d2).format('LL');

    let inCart: number[] = cartData?.map((item: any) => item.id) || [];

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
        <>
            <MyHead
                title="Kanjur - Kantin Kejujuran"
                description="Jujur itu indah"
                url=""
                image=""
                type="website"
                alt="Kanjur website Thumbnail"
            />
            <div className="w-full h-full pt-16 md:pt-0 pb-48 lg:pb-16">
                <div className="flex flex-col xl:flex-row w-full gap-12">
                    <div className="flex flex-col w-full xl:w-4/6 gap-8 bg-light-100 rounded-xl p-8">
                        <div className="flex flex-col lg:flex-row h-full w-full gap-8">
                            <div className="relative overflow-hidden lg:h-64 rounded-lg aspect-square">
                                <Image
                                    src={data.image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={data.name}
                                />
                            </div>
                            <div className="flex flex-col grow justify-between gap-6">
                                <div className="flex flex-col gap-4">
                                    <span className="text-3xl font-semibold text-gray-100">
                                        #{data.id}
                                    </span>
                                    <span className="text-3xl font-semibold">
                                        {data.name}
                                    </span>
                                </div>
                                <div className="flex w-full justify-center md:justify-start">
                                    {isAuthenticated && (
                                        <a
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(data.id);
                                            }}
                                            className={`py-3 px-6 flex w-full md:w-fit gap-2 justify-center items-center ${
                                                inCart.includes(data.id)
                                                    ? 'bg-red-0'
                                                    : 'bg-blue-0 lg:group-one-hover:bg-blue-100'
                                            } rounded-full cursor-pointer group transition`}
                                        >
                                            {loading ? (
                                                <svg
                                                    role="status"
                                                    className="h-5 md:h-6 animate-spin text-light-100 fill-blue-100"
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
                                                    className={`h-5 md:h-6 stroke-2 ${
                                                        inCart.includes(data.id)
                                                            ? 'stroke-red-300'
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
                                                    {!inCart.includes(
                                                        data.id
                                                    ) ? (
                                                        <path
                                                            d="M16 14L16 20"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    ) : null}
                                                    <path
                                                        d="M14 8V5C14 2.79086 12.2091 1 10 1V1C7.79086 1 6 2.79086 6 5L6 8"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            )}
                                            <span
                                                className={`text-base ${
                                                    inCart.includes(data.id)
                                                        ? 'text-red-300'
                                                        : 'text-blue-500'
                                                } font-semibold selection-none`}
                                            >
                                                {inCart.includes(data.id)
                                                    ? 'Hapus dari keranjang'
                                                    : 'Tambahkan ke keranjang'}
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col gap-6">
                                <span className="text-lg text-gray-500 font-medium border-b border-b-gray-0 pb-2">
                                    Deskripsi Produk
                                </span>
                                <p>{data.description}</p>
                            </div>
                            <span className="text-sm text-gray-300">
                                Terakhir diperbarui: {time}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full xl:w-2/6 bg-light-100 rounded-xl p-8 h-fit">
                        <div className="flex gap-3 items-center border-b border-gray-0 pb-4">
                            <span>
                                <svg
                                    className="h-4 fill-gray-300"
                                    viewBox="0 0 16 19"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        r="4"
                                        transform="matrix(-1 0 0 1 8 5)"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                            <span className="font-semibold text-gray-300">
                                Data Penjual
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-blue-100 text-2xl">
                                    #{data.seller.student_id}
                                </span>
                                <span className="font-semibold text-3xl">
                                    {data.seller.name}
                                </span>
                            </div>
                            <span className="text-gray-300 text-sm font-medium">
                                Anggota sejak: {memberSince}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id }: any = params;
    const res: any = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${id}`
    );
    const isFound = res.status === 200;
    const data = await res.json();

    return {
        props: {
            productData: data,
        },
        notFound: !isFound,
    };
};

ProductPage.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default ProductPage;
