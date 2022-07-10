import type { FC } from 'react';
import { currency } from '@lib/currencyFormatter';

const Balance: FC<any> = ({ data }) => {
    return (
        <div className="balance-top-bar">
            <span className="text-sm font-medium">Kas Kantin</span>
            {data ? (
                <div className="flex gap-2 items-center">
                    <span className="text-lg font-semibold">
                        {currency.format(Number(data))}
                    </span>
                </div>
            ) : (
                <span className="h-6 animate-pulse bg-gray-0 w-32" />
            )}
        </div>
    );
};

export default Balance;
