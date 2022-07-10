import React, { useState } from 'react';
import TopBarAuthenticated from '@components/TopBar/TopBarAuthenticated';
import LoginModal from '@components/Shared/LoginModal';
import RegisterModal from '@components/Shared/RegisterModal';
import TopBarSkeleton from '@components/TopBar/TopBarSkeleton';

type Props = {
    isAuthenticated: boolean;
    userData: any;
    logout: any;
    isMobile: any;
    loading: boolean;
    setIsDepositModalOpen: any;
    setIsWithdrawModalOpen: any;
    balance: number;
    isBalanceLoading: boolean;
};

const TopBar: React.FC<any> = ({
    isAuthenticated,
    userData,
    logout,
    loading,
    setIsDepositModalOpen,
    setIsWithdrawModalOpen,
    balance,
    isBalanceLoading,
}: Props) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <>
            {loading ? (
                <TopBarSkeleton />
            ) : isAuthenticated ? (
                <TopBarAuthenticated
                    userData={userData}
                    logout={logout}
                    setIsDepositModalOpen={setIsDepositModalOpen}
                    setIsWithdrawModalOpen={setIsWithdrawModalOpen}
                    balance={balance}
                    isBalanceLoading={isBalanceLoading}
                />
            ) : (
                <div className="bg-light-200 bg-opacity-90 backdrop-blur w-screen lg:w-full flex flex-row justify-end gap-8 lg:gap-0 relative top-0 py-4 lg:pt-10 px-4 lg:px-0 z-40">
                    <div className="flex flex-row gap-4">
                        <a
                            onClick={() => setIsLoginModalOpen(true)}
                            className="btn-light-blue"
                        >
                            Masuk
                        </a>
                        <a
                            className="btn-dark-blue"
                            onClick={() => setIsRegisterModalOpen(true)}
                        >
                            Daftar
                        </a>
                    </div>
                </div>
            )}

            {isLoginModalOpen && (
                <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
            )}

            {isRegisterModalOpen && (
                <RegisterModal
                    setIsRegisterModalOpen={setIsRegisterModalOpen}
                />
            )}
        </>
    );
};

export default TopBar;
