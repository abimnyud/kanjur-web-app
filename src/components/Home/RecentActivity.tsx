import React from 'react';
import Link from 'next/link';
import ResponseData from '@/types/ResponseData';
import moment from 'moment';
import 'moment/locale/id';

interface Props {
    data: ResponseData;
}

const RecentActivity: React.FC<Props> = ({ data }: Props) => {
    return (
        <div className="recent-activity-box">
            <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-semibold">Aktivitas Terbaru</p>
                <Link href={`/dashboard`}>
                    <a className="text-sm text-blue-500 after:content-['→'] after:ml-2 after:relative after:top-[0.08rem]">
                        Lihat semua
                    </a>
                </Link>
            </div>
            <ul className="recent-transactions">
                <li key="header" className="py-2 ">
                    <div className="font-semibold text-sm w-1/3">
                        Nomor Identitas
                    </div>
                    <div className="font-semibold text-sm w-1/3">Aksi</div>
                    <p className="font-semibold text-sm w-1/3">Waktu</p>
                </li>
                {data.data.map((transaction: any) => {
                    const isDeposit = Number(transaction.deposit) !== 0;
                    const isBuy = Number(transaction.total_price) !== 0;

                    moment.locale('id');
                    const time = moment(transaction.created_at).fromNow();
                    return (
                        <li
                            key={`transaction-${transaction.id}`}
                            className="py-4"
                        >
                            <Link
                                href={`/user/${transaction.student.student_id}`}
                            >
                                <a className="text-sm w-1/3 hover:text-blue-500 transition">
                                    {transaction.student.student_id}
                                </a>
                            </Link>
                            <div className="w-1/3">
                                <p
                                    className={`${
                                        isBuy ? 'text-blue-500 bg-blue-0' 
                                        : isDeposit ? 'text-green-100 bg-green-0' : 'text-red-100 bg-red-0'
                                    } rounded-full px-2 py-1 text-xs select-none font-semibold text-center justify-center w-fit`}
                                >
                                    {isBuy? 'Beli' : isDeposit ? 'Setor' : 'Tarik'}
                                </p>
                            </div>
                            <p className="text-gray-200 text-sm w-1/3">
                                {time}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RecentActivity;
