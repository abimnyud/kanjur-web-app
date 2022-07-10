import React from 'react';
import NavLink from '@components/Shared/NavLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIsMobile } from '@contexts/MobileContext';

const SideBar: React.FC<any> = ({ userData }) => {
    const router = useRouter();
    const isMobile = useIsMobile();

    return (
        <div className="lg:bg-light-100 z-20 fixed bottom-0 w-screen lg:w-fit lg:h-screen flex flex-col lg:py-8 shadow-xl lg:shadow-none">
            <div className="flex bg-light-100 lg:bg-none flex-row lg:flex-col lg:mx-2 justify-evenly rounded-t-3xl lg:rounded-none overflow-hidden">
                <Link href="/">
                    <a
                        className={`nav-link group ${
                            router.pathname === '/' ? 'active' : ''
                        }`}
                    >
                        {router.pathname === '/' ? (
                            <svg
                                className={`nav-icon active`}
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0 15.1665C0 15.5702 0.242738 15.9343 0.615385 16.0896L9.24989 19.6873V8.82965L4.20914 6.69101L0 4.9372V15.1665ZM1.02517 3.73935L4.49364 5.18455L13.2775 1.36547L10.7692 0.32035C10.2769 0.115222 9.72308 0.115222 9.23077 0.32035L1.02517 3.73935ZM15.1985 2.16589L6.40027 5.99122L9.99468 7.51623L18.7773 3.65705L15.1985 2.16589ZM20 4.75822L10.7499 8.8228V19.6874L19.3846 16.0896C19.7573 15.9343 20 15.5702 20 15.1665V4.75822Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className={`nav-icon fill-gray-100 group-hover:fill-blue-100`}
                                viewBox="0 0 22 22"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 5.16667L0.711538 4.47436C0.432053 4.59081 0.25 4.86389 0.25 5.16667H1ZM11 21L10.7115 21.6923C10.8962 21.7692 11.1038 21.7692 11.2885 21.6923L11 21ZM21 5.16667H21.75C21.75 4.86389 21.5679 4.59081 21.2885 4.47436L21 5.16667ZM6 7.25L5.71154 7.94231L6 7.25ZM10.2308 1.32051L9.94231 0.628205L10.2308 1.32051ZM1.61538 17.0897L1.32692 17.7821L1.61538 17.0897ZM1.75 16.1667V5.16667H0.25V16.1667H1.75ZM10.25 9.33333V21H11.75V9.33333H10.25ZM11.2885 20.3077L1.90385 16.3974L1.32692 17.7821L10.7115 21.6923L11.2885 20.3077ZM11.2885 21.6923L20.6731 17.7821L20.0962 16.3974L10.7115 20.3077L11.2885 21.6923ZM21.75 16.1667V5.16667H20.25V16.1667H21.75ZM20.7115 4.47436L10.7115 8.64103L11.2885 10.0256L21.2885 5.85897L20.7115 4.47436ZM9.94231 0.628205L0.711538 4.47436L1.28846 5.85897L10.5192 2.01282L9.94231 0.628205ZM0.711538 5.85897L5.71154 7.94231L6.28846 6.55769L1.28846 4.47436L0.711538 5.85897ZM5.71154 7.94231L10.7115 10.0256L11.2885 8.64103L6.28846 6.55769L5.71154 7.94231ZM21.2885 4.47436L16.2885 2.39103L15.7115 3.77564L20.7115 5.85897L21.2885 4.47436ZM16.2885 2.39103L12.0577 0.628205L11.4808 2.01282L15.7115 3.77564L16.2885 2.39103ZM6.28846 7.94231L16.2885 3.77564L15.7115 2.39103L5.71154 6.55769L6.28846 7.94231ZM10.5192 2.01282C10.8269 1.88462 11.1731 1.88462 11.4808 2.01282L12.0577 0.628205C11.3808 0.346153 10.6192 0.346154 9.94231 0.628205L10.5192 2.01282ZM20.6731 17.7821C21.3252 17.5103 21.75 16.8731 21.75 16.1667H20.25C20.25 16.2676 20.1893 16.3586 20.0962 16.3974L20.6731 17.7821ZM0.25 16.1667C0.25 16.8731 0.674791 17.5103 1.32692 17.7821L1.90385 16.3974C1.81068 16.3586 1.75 16.2676 1.75 16.1667H0.25Z" />
                            </svg>
                        )}

                        <p>Produk</p>
                    </a>
                </Link>
                <NavLink href="/dashboard" activeClassName="active">
                    <a className="nav-link group">
                        {router.pathname === '/dashboard' ? (
                            <svg
                                className="nav-icon fill-blue-100"
                                viewBox="0 0 22 22"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6V16C21.75 19.1756 19.1756 21.75 16 21.75H6C2.82436 21.75 0.25 19.1756 0.25 16V6ZM6.25 16C6.25 16.4142 6.58579 16.75 7 16.75C7.41421 16.75 7.75 16.4142 7.75 16V13C7.75 12.5858 7.41421 12.25 7 12.25C6.58579 12.25 6.25 12.5858 6.25 13V16ZM11 16.75C10.5858 16.75 10.25 16.4142 10.25 16V6C10.25 5.58579 10.5858 5.25 11 5.25C11.4142 5.25 11.75 5.58579 11.75 6V16C11.75 16.4142 11.4142 16.75 11 16.75ZM14.25 16C14.25 16.4142 14.5858 16.75 15 16.75C15.4142 16.75 15.75 16.4142 15.75 16V9C15.75 8.58579 15.4142 8.25 15 8.25C14.5858 8.25 14.25 8.58579 14.25 9V16Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="nav-icon stroke-gray-100 group-hover:stroke-blue-100"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="1"
                                    y="1"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M7 16L7 13"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 16L11 6"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 16L15 9"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        <p>Laporan</p>
                    </a>
                </NavLink>
                {userData && isMobile && (
                    <NavLink
                        href={`/user/${userData.student_id}`}
                        activeClassName="active"
                    >
                        <a className="nav-link group">
                            {router.query.id === `${userData.student_id}` ? (
                                <svg
                                    className="nav-icon fill-blue-100"
                                    viewBox="0 0 16 19"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        r="4"
                                        transform="matrix(-1 0 0 1 8 5)"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175V13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175V13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="nav-icon stroke-gray-100 group-hover:stroke-blue-100"
                                    viewBox="0 0 16 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        r="4"
                                        transform="matrix(-1 0 0 1 8 5)"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175V13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175V13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            )}
                            <p>Profil</p>
                        </a>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default SideBar;
