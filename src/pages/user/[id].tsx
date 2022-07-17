import type { LayoutPage } from '@/types/LayoutPage';
import type { GetServerSideProps } from 'next';
import type ResponseData from '@/types/ResponseData';
import { useAuth } from '@contexts/AuthContext';
import { useIsMobile } from '@contexts/MobileContext';
import React, { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
import useSWR from 'swr';
import MainLayout from '@components/Layout/MainLayout';
import ProductGallery from '@components/Product/ProductGallery';
import UserInfoSkeleton from '@components/Profile/UserInfoSkeleton';
import fetcher from '@lib/fetcher';
import MyHead from '@components/Shared/MyHead';
const UserInfo = dynamic(() => import('@components/Profile/UserInfo'), {
    ssr: false,
});
const TransactionHistory = dynamic(
    () => import('@components/Transaction/TransactionHistory'),
    { ssr: false }
);

interface Props {
    userData: ResponseData;
    productsData: ResponseData;
    transactionsData: ResponseData;
}

const ProfilePage: LayoutPage<Props> = ({
    userData,
    productsData,
    transactionsData,
}: any) => {
    // const router = useRouter();
    const { isAuthenticated, user, logout }: any = useAuth();
    const [columnActive, setColumnActive] = useState('produk');
    const isMobile = useIsMobile();

    const isTheirAccount = user?.student_id === userData?.data?.student_id;
    const { data: userSummary } = useSWR(
        isTheirAccount || isAuthenticated
            ? `/api/user/${userData?.data?.student_id}?scope=summary`
            : null,
        fetcher
    );

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
            <div className="h-full w-full items-center flex flex-col gap-8 pt-16 lg:pt-0 pb-48 lg:pb-16">
                {userData?.status ? (
                    <div className="profile-data">
                        <div className="bg-blue-0 h-32 p-6 flex justify-center items-center aspect-square rounded-full">
                            <svg
                                className="h-full"
                                viewBox="0 0 16 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    r="4"
                                    transform="matrix(-1 0 0 1 8 5)"
                                    fill="#2B3F6C"
                                    stroke="#2B3F6C"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z"
                                    fill="#2B3F6C"
                                    stroke="#2B3F6C"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <h4 className="bg-yellow-0 font-semibold text-yellow-500 px-4 rounded-full">
                                {userData.data.student_id}
                            </h4>
                            <h1 className="font-bold text-center">
                                {userData.data.name}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                {user &&
                    userData?.data.student_id === user?.student_id &&
                    isMobile && (
                        <div className="flex flex-row w-5/6 lg:w-1/2 gap-4 justify-center border-b-2 border-gray-0 pb-6">
                            <button
                                onClick={() => logout()}
                                className="transition group border-2 border-red-100 hover:bg-red-100 flex items-center gap-3 px-4 py-2 text-sm font-semibold text-center rounded-full"
                            >
                                <svg
                                    className="h-5"
                                    viewBox="0 0 21 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.25 15C13.25 14.5858 13.5858 14.25 14 14.25C14.4142 14.25 14.75 14.5858 14.75 15H13.25ZM14.75 7C14.75 7.41421 14.4142 7.75 14 7.75C13.5858 7.75 13.25 7.41421 13.25 7H14.75ZM10 1.75H5V0.25H10V1.75ZM1.75 5V17H0.25V5H1.75ZM5 20.25H10V21.75H5V20.25ZM13.25 17V15H14.75V17H13.25ZM13.25 7V5H14.75V7H13.25ZM10 20.25C11.7949 20.25 13.25 18.7949 13.25 17H14.75C14.75 19.6234 12.6234 21.75 10 21.75V20.25ZM1.75 17C1.75 18.7949 3.20507 20.25 5 20.25V21.75C2.37665 21.75 0.25 19.6234 0.25 17H1.75ZM5 1.75C3.20507 1.75 1.75 3.20507 1.75 5H0.25C0.25 2.37665 2.37665 0.25 5 0.25V1.75ZM10 0.25C12.6234 0.25 14.75 2.37665 14.75 5H13.25C13.25 3.20507 11.7949 1.75 10 1.75V0.25Z"
                                        className="fill-red-100 group-hover:fill-light-100 transition"
                                    />
                                    <path
                                        d="M17 14L19.2929 11.7071C19.6834 11.3166 19.6834 10.6834 19.2929 10.2929L17 8"
                                        className="stroke-red-100 group-hover:stroke-light-100 transition"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M19 11L7 11"
                                        className="stroke-red-100 group-hover:stroke-light-100 transition"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="text-red-100 group-hover:text-light-100 transition">
                                    Keluar
                                </span>
                            </button>
                        </div>
                    )}
                {isAuthenticated ? (
                    userSummary ? (
                        <UserInfo
                            data={{
                                revenue: userSummary.data.revenue,
                                deposit: userSummary.data.deposit,
                                withdraw: userSummary.data.withdraw,
                            }}
                        />
                    ) : (
                        <UserInfoSkeleton />
                    )
                ) : null}

                <div className="flex flex-col w-full gap-4">
                    <div className="user-data-header">
                        <a
                            onClick={() => setColumnActive('produk')}
                            className={`${
                                columnActive === 'produk' && 'active'
                            }`}
                        >
                            Produk
                        </a>
                        <a
                            onClick={() => setColumnActive('transaksi')}
                            className={`${
                                columnActive === 'transaksi' && 'active'
                            }`}
                        >
                            Transaksi
                        </a>
                    </div>
                    {columnActive === 'produk' ? (
                        productsData ? (
                            <ProductGallery data={productsData} />
                        ) : (
                            <div>Loading...</div>
                        )
                    ) : (
                        isAuthenticated ? <TransactionHistory data={transactionsData} /> : <span className='w-full text-center pt-12'>Kamu harus login untuk melihat data transaksi anggota</span> 
                    )}
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id }: any = params;

    const urls: string[] = [
        `api/user/${id}?scope=public`,
        `api/products?filters[seller_id]=${id}`,
        `api/transactions?filters[student_id]=${id}`,
    ];

    let requests = urls.map((url) =>
        fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/${url}`)
    );

    let [userData, productsData, transactionsData] = await Promise.all(
        requests
    );
    const isFound = userData.status === 200;
    userData = await userData.json();
    productsData = await productsData.json();
    transactionsData = await transactionsData.json();

    return {
        props: {
            userData,
            productsData,
            transactionsData,
        },
        notFound: !isFound,
    };
};

ProfilePage.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default ProfilePage;
