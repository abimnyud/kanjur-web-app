import type { ReactNode } from 'react';
import { useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'next/router';
import { useCart } from '@contexts/CartContext';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import SideBar from '@components/Shared/SideBar';
import TopBar from '@components/TopBar/TopBar';
import SellButton from '@components/Shared/SellButton';
import CartButton from '@components/Cart/CartButton';
import Cart from '@components/Cart/Cart';
import DepositModal from '@components/Deposit/DepositModal';
import WithdrawModal from '@components/Withdraw/WithdrawModal';
import ProductModal from '@components/Product/ProductModal';

const MainLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { isAuthenticated, user, logout, loading }: any = useAuth();
    const { cartData, remove, loading: cartLoading }: any = useCart();
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [balance, setBalance] = useState(undefined);
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const isomorphicEffect = useIsomorphicEffect();

    const [isCartOpen, setIsCartOpen] = useState(false);

    const getBalance = async () => {
        setIsBalanceLoading(true);
        let res: any = await fetch('/api/balance');
        res = await res.json();

        setBalance(res.data.balance);
        setIsBalanceLoading(false);
    };

    isomorphicEffect(() => {
        if (isAuthenticated) getBalance();
    }, [isAuthenticated]);

    return (
        <div className="flex flex-col md:flex-row h-screen relative">
            <SideBar userData={user} />
            <div className="fixed lg:ml-64 w-full lg:pr-[19rem] z-50">
                <TopBar
                    isAuthenticated={isAuthenticated}
                    userData={user}
                    logout={logout}
                    loading={loading}
                    setIsDepositModalOpen={setIsDepositModalOpen}
                    setIsWithdrawModalOpen={setIsWithdrawModalOpen}
                    balance={balance}
                    isBalanceLoading={isBalanceLoading}
                />
            </div>
            <main>
                <div className="flex grow justify-center items-center z-0">
                    {children}
                </div>
            </main>
            {isAuthenticated && (
                <>
                    <div className="fixed z-40 bottom-24 right-4 lg:bottom-12 lg:right-12 flex flex-row gap-4">
                        {router.pathname !== '/dashboard' ||
                        router.query.id === `${user.student_id}` ? (
                            <SellButton
                                setIsProductModalOpen={setIsProductModalOpen}
                            />
                        ) : null}
                        <CartButton
                            count={cartData.length}
                            setIsCartOpen={setIsCartOpen}
                        />
                    </div>
                    {isCartOpen && (
                        <Cart
                            setIsCartOpen={setIsCartOpen}
                            cartData={cartData}
                            remove={remove}
                            loading={cartLoading}
                            count={cartData.length}
                            getBalance={getBalance}
                        />
                    )}
                    {isDepositModalOpen && (
                        <DepositModal setIsOpen={setIsDepositModalOpen} />
                    )}
                    {isWithdrawModalOpen && (
                        <WithdrawModal setIsOpen={setIsWithdrawModalOpen} />
                    )}
                    {isProductModalOpen && (
                        <ProductModal setIsOpen={setIsProductModalOpen} />
                    )}
                </>
            )}
        </div>
    );
};

export default MainLayout;
