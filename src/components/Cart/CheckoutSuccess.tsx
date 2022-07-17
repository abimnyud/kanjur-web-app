import type { FC } from 'react';
import Router from 'next/router';
import moment from 'moment';
import 'moment/locale/id';

const CheckoutSuccess: FC<any> = ({ transactionData }) => {
    moment.locale('id');
    const time = moment(transactionData.created_at).format('LLL');
    return (
        <div className="flex flex-col gap-12 w-full h-full justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
                <svg
                    className="h-24 stroke-blue-100"
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
                        d="M8.5 10.5L10.5 12.5L14.5 8.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="font-medium text-xl">Pembayaran berhasil</span>
                <div className="flex flex-col items-center">
                    <div className="flex gap-2 text-gray-300">
                        <span>Nomor Transaksi:</span>
                        <span>#{transactionData.id}</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-100">
                        {time}
                    </span>
                </div>
            </div>
            <a
                onClick={() => Router.reload()}
                className="text-md text-red-300 font-medium hover:text-red-100 cursor-pointer transition"
            >
                Tutup
            </a>
        </div>
    );
};

export default CheckoutSuccess;
