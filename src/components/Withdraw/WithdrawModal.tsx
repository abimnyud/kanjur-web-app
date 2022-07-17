import { FC, useState } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import WithdrawLoading from '@components/Withdraw/WithdrawLoading';
import WithdrawSuccess from '@components/Withdraw/WithdrawSuccess';
import Router from 'next/router';

const WithdrawModal: FC<any> = ({ setIsOpen }) => {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const isomorphicEffect = useIsomorphicEffect();

    const handleChange = (e: any) => {
        e.preventDefault();
        setAmount(Number(e.target.value));
    };

    const handleWithdraw = async (): Promise<void> => {
        setLoading(true);
        let res: any = await fetch(`/api/withdraw?amount=${Number(amount)}`, {
            method: 'POST',
        });
        if (res.status === 401) Router.reload();

        res = await res.json();

        if (res.status) {
            setStatus(true);
        } else {
            setErrorResponse(res.message);
        }
        setLoading(false);
    };

    const handleClose = async (): Promise<void> => {
        setIsOpen(false)
        if (status) Router.reload();
    }

    isomorphicEffect(() => {
        if (amount < 500) {
            setError(true);
        } else {
            setError(false);
        }
    }, [amount]);

    return (
        <div
            onClick={async () => handleClose()}
            className="flex fixed z-50 inset-0 h-screen justify-center items-center bg-dark-500 bg-opacity-50"
        >
            {loading ? (
                <WithdrawLoading />
            ) : !status ? (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col justify-between w-4/5 md:w-2/5 xl:w-1/5 h-64 p-4 rounded-lg  bg-light-100 "
                >
                    <div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-0">
                            <span className="font-semibold text-gray-200">
                                Tarik Tunai
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 pt-6">
                            <div className=" relative">
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
                            {error || errorResponse && (
                                <span className="text-xs lg:text-sm text-red-100">
                                    {errorResponse ? errorResponse : "*Minimal tarik Rp500,00"}
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
                            onClick={async () => {
                                error ? null : await handleWithdraw();
                            }}
                            className={`btn-dark-blue ${
                                error
                                    ? 'cursor-not-allowed bg-blue-50 hover:bg-blue-50'
                                    : ''
                            } w-full`}
                        >
                            Tarik
                        </button>
                    </div>
                </div>
            ) : (
                <WithdrawSuccess handleClose={handleClose} />
            )}
        </div>
    );
};

export default WithdrawModal;
