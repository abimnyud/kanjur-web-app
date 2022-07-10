import React from 'react';
import Link from 'next/link';

const ProfilePopUp: React.FC<any> = ({ logout, userData }: any) => {
    return (
        <ul className="profile-pop-up">
            <li className="bg-blue-100">
                <Link href={`/user/${userData.student_id}`}>
                    <a className="flex flex-row gap-6 max-w-[20rem] items-center px-6 py-5 ">
                        <div className="flex justify-center items-center w-1/6">
                            <svg
                                className="h-5 fill-light-100 transition"
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
                            className={`flex flex-col shrink-0 w-5/6 text-light-100 transition text-sm font-semibold ${
                                userData.name.length < 20 && 'whitespace-nowrap'
                            }`}
                        >
                            {userData.name}
                        </p>
                    </a>
                </Link>
            </li>
            <li
                className="hover:bg-red-0 group-one px-6 py-3"
                onClick={() => logout()}
            >
                <a className="flex gap-2 justify-between items-center">
                    <p className="group-one-hover:text-red-100 text-sm transition">
                        Keluar
                    </p>
                    <svg
                        className="h-5"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.25 15C13.25 14.5858 13.5858 14.25 14 14.25C14.4142 14.25 14.75 14.5858 14.75 15H13.25ZM14.75 7C14.75 7.41421 14.4142 7.75 14 7.75C13.5858 7.75 13.25 7.41421 13.25 7H14.75ZM10 1.75H5V0.25H10V1.75ZM1.75 5V17H0.25V5H1.75ZM5 20.25H10V21.75H5V20.25ZM13.25 17V15H14.75V17H13.25ZM13.25 7V5H14.75V7H13.25ZM10 20.25C11.7949 20.25 13.25 18.7949 13.25 17H14.75C14.75 19.6234 12.6234 21.75 10 21.75V20.25ZM1.75 17C1.75 18.7949 3.20507 20.25 5 20.25V21.75C2.37665 21.75 0.25 19.6234 0.25 17H1.75ZM5 1.75C3.20507 1.75 1.75 3.20507 1.75 5H0.25C0.25 2.37665 2.37665 0.25 5 0.25V1.75ZM10 0.25C12.6234 0.25 14.75 2.37665 14.75 5H13.25C13.25 3.20507 11.7949 1.75 10 1.75V0.25Z"
                            className="fill-gray-100 group-one-hover:fill-red-100 transition"
                        />
                        <path
                            d="M17 14L19.2929 11.7071C19.6834 11.3166 19.6834 10.6834 19.2929 10.2929L17 8"
                            className="stroke-gray-100 group-one-hover:stroke-red-100 transition"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M19 11L7 11"
                            className="stroke-gray-100 group-one-hover:stroke-red-100 transition"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </a>
            </li>
        </ul>
    );
};

export default ProfilePopUp;
