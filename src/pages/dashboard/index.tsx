import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { LayoutPage } from '@/types/LayoutPage';
import MainLayout from '@components/Layout/MainLayout';
import { useAuth } from '@contexts/AuthContext';
import Dashboard from '@components/Dashboard/Dashboard';
import DashboardUnauthenticated from '@components/Dashboard/DashboardUnauthenticated';
import MyHead from '@components/Shared/MyHead';

const DashboardPage: LayoutPage<any> = ({ transactionsData }) => {
    const { isAuthenticated }: any = useAuth();

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
                {isAuthenticated ? (
                    <Dashboard transactionsData={transactionsData} />
                ) : (
                    <DashboardUnauthenticated />
                )}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    let res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/transactions?scope=full&limit=10`
    ).then((r) => r.json());

    return {
        props: {
            transactionsData: res,
        },
    };
};

DashboardPage.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;
