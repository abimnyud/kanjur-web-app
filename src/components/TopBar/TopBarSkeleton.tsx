import React from 'react';

const TopBarSkeleton: React.FC = () => {
    return (
        <div className="bg-light-200 lg:bg-none bg-opacity-90 backdrop-blur justify-between items-center lg:backdrop-blur-none w-screen lg:w-full flex flex-row  gap-8 lg:gap-0 relative top-0 py-4 lg:pt-10 px-4 lg:px-0 z-40">
            <div className="flex gap-8 items-center">
                <div className="lg:flex flex-col hidden">
                    <span className="bg-gray-0 animate-pulse my-1 h-3 w-32 rounded-full" />
                    <span className="bg-gray-0 animate-pulse my-1 h-6 w-64 rounded-full" />
                </div>
                <span className="lg:flex hidden bg-gray-0 animate-pulse my-1 py-5 w-[0.1rem] rounded-full" />
                <div className="flex flex-col">
                    <span className="bg-gray-0 animate-pulse my-1 h-3 w-16 rounded-full" />
                    <span className="bg-gray-0 animate-pulse my-1 h-6 w-32 rounded-full" />
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <span className="bg-gray-0 animate-pulse h-9 lg:h-10 w-[4.2rem] lg:w-24 rounded-full" />
                <span className="bg-gray-0 animate-pulse h-9 lg:h-10 w-[4.2rem] lg:w-24 rounded-full" />
            </div>
        </div>
    );
};

export default TopBarSkeleton;
