import React from 'react';
import { currency } from '@lib/currencyFormatter';
import moment from 'moment';
import 'moment/locale/id';

const TransactionHistory: React.FC<any> = ({ data }) => {
    return (
        <div className="recent-activity-box">
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
                            <div className="w-1/5">
                                <p
                                    className={`${
                                        isBuy ? 'text-blue-500 bg-blue-0' :
                                        isDeposit ? 'text-green-100 bg-green-0' : 'text-red-100 bg-red-0'
                                    } rounded-full px-2 py-1 text-xs select-none font-semibold text-center justify-center w-fit`}
                                >
                                    {isBuy ? 'Beli' : isDeposit ? 'Setor' : 'Tarik'}
                                </p>
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
