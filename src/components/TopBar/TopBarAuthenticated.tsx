import React, { useState, useRef, useEffect } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import { useRouter } from 'next/router';
import ProfilePopUp from '@components/Profile/ProfilePopUp';
import Balance from '@components/TopBar/Balance';

const TopBarAuthenticated: React.FC<any> = ({
    userData,
    logout,
    setIsDepositModalOpen,
    setIsWithdrawModalOpen,
    balance,
    isBalanceLoading,
}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profilePopUpRef = useRef<any>();
    const isomorphicEffect = useIsomorphicEffect();
    const router = useRouter();

    isomorphicEffect(() => {
        const handler = (e: any) => {
            if (!profilePopUpRef.current?.contains(e.target))
                setIsProfileOpen(false);
        };

        document.addEventListener('mousedown', handler, { passive: true });

        return () => {
            document.removeEventListener('mousedown', () => handler);
        };
    }, []);

    return (
        <div className="bg-light-200 bg-opacity-90 backdrop-blur w-screen lg:w-full flex lg:flex-row justify-between lg:items-center gap-8 lg:gap-0 relative top-0 py-4 lg:pt-10 px-4 lg:px-0 left-0 z-40">
            <div className="flex gap-8 items-center">
                {!router.pathname.startsWith('/user/') && (
                    <>
                        <div className="hidden xl:flex flex-col">
                            <p>Selamat datang kembali,</p>
                            <p className="text-2xl font-bold">
                                {userData.name}!
                            </p>
                        </div>
                        <div className="hidden xl:block h-12 border-l border-l-gray-100 rounded-full" />
                    </>
                )}
                <div>
                    <Balance data={balance} isLoading={isBalanceLoading} />
                </div>
            </div>
            <div className="flex gap-4 justify-end items-center text-sm md:text-base">
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-row gap-4">
                        <a
                            onClick={() => setIsDepositModalOpen(true)}
                            className={`top-bar-button bg-green-0 group text-green-100 hover:bg-green-100 hover:text-light-100`}
                        >
                            Setor
                        </a>
                        <a
                            onClick={() => setIsWithdrawModalOpen(true)}
                            className={`top-bar-button bg-red-0 text-red-100 hover:bg-red-100 hover:text-light-100`}
                        >
                            Tarik
                        </a>
                    </div>
                    <div className="hidden lg:block h-8 border-l border-l-gray-100 rounded-full m-2" />
                    <div
                        className={`hidden lg:flex flex-row h-fit gap-2 items-center rounded-full py-1 pl-1 pr-4 relative group transition cursor-pointer ${
                            isProfileOpen
                                ? 'bg-blue-100'
                                : 'bg-blue-0 hover:bg-blue-100'
                        }`}
                        ref={profilePopUpRef}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div
                            className={`rounded-full h-8 aspect-square flex justify-center items-center transition ${
                                isProfileOpen
                                    ? 'bg-light-100'
                                    : 'bg-blue-100 group-hover:bg-light-100'
                            }`}
                        >
                            <svg
                                className={`h-4 transition ${
                                    isProfileOpen
                                        ? 'fill-blue-100'
                                        : 'fill-blue-0  group-hover:fill-blue-100'
                                }`}
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    r="4"
                                    transform="matrix(-1 0 0 1 8 5)"
                                />
                                <path d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z" />
                            </svg>
                        </div>
                        <p
                            className={` font-bold transition select-none ${
                                isProfileOpen
                                    ? 'text-light-100'
                                    : 'text-blue-100 group-hover:text-light-100'
                            }`}
                        >
                            {userData.student_id}
                        </p>
                        {isProfileOpen && (
                            <ProfilePopUp logout={logout} userData={userData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBarAuthenticated;
