import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/id';
import { currency } from '@lib/currencyFormatter';

const Report: React.FC<any> = ({ transactionsData }) => {
    const { meta } = transactionsData;
    let page: number = meta.page;

    const [data, setData] = useState(transactionsData.data);
    const [loading, setLoading] = useState(false);

    const getMoreTransaction = async (): Promise<void> => {
        setLoading(true);
        let res: any = await fetch(
            `/api/transactions?page=${++page}&scope=full&limit=10`
        );
        res = await res.json();

        if (res.status) {
            if (res.data.length > 0) {
                setData([...data, ...res.data]);
            }
        }
        setLoading(false);
    };
    return (
        <div className="flex flex-col">
            {meta.total === 0 ? (
                <span className="text-sm w-full text-center pt-16">
                    Belum ada transaksi.
                </span>
            ) : (
                <>
                    <div className="recent-activity-box overflow-scroll">
                        <ul className="recent-transactions">
                            <li key="header" className="py-2 ">
                                <div className="font-semibold text-sm w-1/5">
                                    Nomor Identitas
                                </div>
                                <div className="font-semibold text-sm w-1/5">
                                    Aksi
                                </div>
                                <div className="font-semibold text-sm w-1/5">
                                    Setor
                                </div>
                                <div className="font-semibold text-sm w-1/5">
                                    Tarik
                                </div>
                                <p className="font-semibold text-sm w-1/5">
                                    Waktu
                                </p>
                            </li>
                            {data.map((transaction: any, id: number) => {
                                const isDeposit =
                                    Number(transaction.deposit) !== 0;
                                const isBuy =
                                    Number(transaction.total_price) !== 0;

                                moment.locale('id');
                                const time = moment(transaction.created_at).fromNow();
                                return (
                                    <li
                                        key={`transaction-${id}`}
                                        className="py-4"
                                    >
                                        <Link
                                            href={`/user/${transaction.student.student_id}`}
                                        >
                                            <a className="text-sm w-1/5 hover:text-blue-500 transition">
                                                {transaction.student.student_id}
                                            </a>
                                        </Link>
                                        <div className="flex items-center gap-2 w-1/5">
                                            <span
                                                className={`${
                                                    isBuy
                                                        ? 'text-blue-500 bg-blue-0'
                                                        : isDeposit
                                                        ? 'text-green-100 bg-green-0'
                                                        : 'text-red-100 bg-red-0'
                                                } rounded-full px-2 py-1 text-xs select-none font-semibold text-center justify-center w-fit`}
                                            >
                                                {isBuy
                                                    ? 'Beli'
                                                    : isDeposit
                                                    ? 'Setor'
                                                    : 'Tarik'}
                                            </span>
                                            {transaction.flag && (
                                                <svg
                                                    className="h-5"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                                        className="fill-yellow-0"
                                                    />
                                                    <path
                                                        d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                                                        className="fill-yellow-500"
                                                    />
                                                    <path
                                                        d="M10 11C9.73478 11 9.48043 10.8946 9.29289 10.7071C9.10536 10.5196 9 10.2652 9 10V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11Z"
                                                        className="fill-yellow-500"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-gray-200 text-sm w-1/5">
                                            {currency.format(
                                                transaction.deposit
                                            )}
                                        </span>
                                        <span className="text-gray-200 text-sm w-1/5">
                                            {currency.format(
                                                transaction.withdraw
                                            )}
                                        </span>
                                        <span className="text-gray-200 text-sm w-1/5">
                                            {time}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="py-8 w-full flex justify-center">
                        {data.length < meta.total ? (
                            <button
                                className={`btn-light-blue py-4 ${
                                    loading ? 'px-28' : 'px-12'
                                }`}
                                onClick={() => getMoreTransaction()}
                            >
                                {loading ? (
                                    <svg
                                        role="status"
                                        className="w-6 animate-spin text-light-100 fill-blue-100"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                ) : (
                                    <span>Muat lebih banyak</span>
                                )}
                            </button>
                        ) : (
                            <span className="text-sm">
                                Kamu telah sampai di bawah!
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Report;
