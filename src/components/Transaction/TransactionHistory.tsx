import React from 'react';
import moment from 'moment';
import 'moment/locale/id';

const TransactionHistory: React.FC<any> = ({ data }) => {
    return (
        <div className="recent-activity-box">
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

                    moment.locale('id');
                    const d = moment(transaction.created_at).add(7, 'hours');
                    const time = moment(d).fromNow();
                    return (
                        <li
                            key={`transaction-${transaction.id}`}
                            className="py-4"
                        >
                            <div className="w-1/3">
                                <p
                                    className={`${
                                        isDeposit
                                            ? 'text-green-100 bg-green-0'
                                            : 'text-red-100 bg-red-0'
                                    } rounded-full px-2 py-1 text-xs select-none font-semibold text-center justify-center w-fit`}
                                >
                                    {isDeposit ? 'Setor' : 'Tarik'}
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

export default TransactionHistory;
