import React from 'react';
import { currency } from '@lib/currencyFormatter';
import moment from 'moment';
import 'moment/locale/id';

const TransactionHistory: React.FC<any> = ({ data }) => {
    return (
        <div className="recent-activity-box recent-activity-box overflow-scroll">
            <ul className="recent-transactions">
                <li key="header" className="py-2 ">
                    <span className="font-semibold text-sm w-1/5">Aksi</span>
                    <span className="font-semibold text-sm w-1/5">Total Harga</span>
                    <span className="font-semibold text-sm w-1/5">Setor</span>
                    <span className="font-semibold text-sm w-1/5">Tarik</span>
                    <span className="font-semibold text-sm w-1/5">Waktu</span>
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
                            <div className="flex items-center gap-2 w-1/5">
                                <span
                                    className={`${
                                        isBuy ? 'text-blue-500 bg-blue-0' :
                                        isDeposit ? 'text-green-100 bg-green-0' : 'text-red-100 bg-red-0'
                                    } rounded-full px-2 py-1 text-xs select-none font-semibold text-center justify-center w-fit`}
                                >
                                    {isBuy ? 'Beli' : isDeposit ? 'Setor' : 'Tarik'}
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
                            <span className='text-gray-300 text-sm w-1/5'>{transaction.total_price ? currency.format(Number(transaction.total_price)) : currency.format(0)}</span>
                            <span className='text-gray-300 text-sm w-1/5'>{transaction.deposit ? currency.format(Number(transaction.deposit)) : currency.format(0)}</span>
                            <span className='text-gray-300 text-sm w-1/5'>{transaction.withdraw ? currency.format(Number(transaction.withdraw)) : currency.format(0)}</span>
                            <span className="text-gray-200 text-sm w-1/5">
                                {time}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TransactionHistory;
