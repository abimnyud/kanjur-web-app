import type { GetServerSideProps } from 'next';
import type { ReactNode } from 'react';
import type { LayoutPage } from '@/types/LayoutPage';
import { useIsMobile } from '@contexts/MobileContext';
import dynamic from 'next/dynamic';
import MainLayout from '@components/Layout/MainLayout';
import ProductGallery from '@components/Product/ProductGallery';
import ResponseData from '@/types/ResponseData';
import MyHead from '@components/Shared/MyHead';
const RecentActivity = dynamic(
    () => import('@components/Home/RecentActivity'),
    { ssr: false }
);

interface Props {
    productsData: ResponseData;
    transactionsData: ResponseData;
}

const Home: LayoutPage<Props> = ({ productsData, transactionsData }) => {
    const isMobile = useIsMobile();
    const { meta: transactionsDataMeta } = transactionsData;

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
            <div className="flex flex-row w-full gap-12 h-full pt-16 lg:pt-0 pb-52 lg:pb-16">
                {/* <h1 className="heading">Home</h1> */}
                <div
                    className={`w-full ${
                        transactionsDataMeta.total !== 0 ? 'xl:w-4/6' : ''
                    } flex flex-col items-center gap-16`}
                >
                    {productsData && <ProductGallery data={productsData} />}
                </div>

                {!isMobile && transactionsDataMeta.total !== 0 && (
                    <div className="h-fit hidden xl:block xl:w-2/6">
                        <RecentActivity data={transactionsData} />
                    </div>
                )}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const urls: string[] = ['api/products', 'api/transactions'];

    let requests = urls.map((url) => fetch(`${process.env.VERCEL_URL}/${url}`));

    let [productsData, transactionsData] = await Promise.all(requests);
    productsData = await productsData.json();
    transactionsData = await transactionsData.json();

    return {
        props: {
            productsData,
            transactionsData,
        },
    };
};

Home.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;
