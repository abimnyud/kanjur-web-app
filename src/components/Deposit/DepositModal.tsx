import { FC, useState } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import DepositLoading from '@components/Deposit/DepositLoading';
import DepositSuccess from '@components/Deposit/DepositSuccess';
import Router from 'next/router';

const DepositModal: FC<any> = ({ setIsOpen }) => {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const isomorphicEffect = useIsomorphicEffect();

    const handleChange = (e: any) => {
        e.preventDefault();
        setAmount(Number(e.target.value));
    };

    const handleDeposit = async (): Promise<void> => {
        setLoading(true);
        let res = await fetch(`/api/deposit?amount=${Number(amount)}`, {
            method: 'POST',
        });
        if (res.status === 401) Router.reload();

        res = await res.json();

        if (res.status) setStatus(true);
        setLoading(false);
    };

    isomorphicEffect(() => {
        if (amount < 500) {
            setError(true);
        } else {
            setError(false);
        }
    }, [amount]);

    return (
        <div
            onClick={() => setIsOpen(false)}
            className="flex fixed z-50 inset-0 h-screen justify-center items-center bg-dark-500 bg-opacity-50"
        >
            {!status ? (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col justify-between w-4/5 md:w-2/5 xl:w-1/5 h-64 p-4 rounded-lg  bg-light-100 "
                >
                    <div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-0">
                            <span className="font-semibold text-gray-200">
                                Setor Tunai
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 pt-6">
                            <div className="relative">
                                <span className="absolute left-4 py-3 text-2xl font-semibold text-gray-200">
                                    Rp
                                </span>
                                <input
                                    type="text"
                                    name="deposit-amount"
                                    id="deposit-amount"
                                    value={amount}
                                    maxLength={11}
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="0"
                                    className={`pl-14 outline outline-2 ${
                                        error
                                            ? 'outline-red-100'
                                            : 'outline-blue-100'
                                    } rounded-lg w-full p-4 text-lg font-semibold`}
                                />
                            </div>
                            {error && (
                                <span className="text-xs lg:text-sm text-red-100">
                                    *Minimal setor Rp500,00
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4 w-full justify-around">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn-light-blue w-full"
                        >
                            Batal
                        </button>
                        <button
                            onClick={() => {
                                error ? null : handleDeposit();
                            }}
                            className={`btn-dark-blue ${
                                error
                                    ? 'cursor-not-allowed bg-blue-50 hover:bg-blue-50'
                                    : ''
                            } w-full`}
                        >
                            Setor
                        </button>
                    </div>
                </div>
            ) : !loading ? (
                <DepositSuccess setIsOpen={setIsOpen} />
            ) : (
                <DepositLoading />
            )}
        </div>
    );
};

export default DepositModal;
