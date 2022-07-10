import React from 'react';

const ReportUnauthenticated: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <p className="text-center">
                Anda harus masuk terlebih dahulu untuk dapat melihat halaman
                ini.
            </p>
        </div>
    );
};

export default ReportUnauthenticated;
