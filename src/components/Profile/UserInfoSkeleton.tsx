import React from 'react';

const UserInfoSkeleton: React.FC = () => {
    return (
        <div className="flex w-full items-center justify-center flex-row gap-4">
            <div className="user-info-skeleton" />
            <div className="user-info-skeleton" />
            <div className="user-info-skeleton" />
        </div>
    );
};

export default UserInfoSkeleton;
