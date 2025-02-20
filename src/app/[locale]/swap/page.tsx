'use client';

import React, { useState } from 'react';
import { useT } from '@/hooks/useT';
import Swapper from '@components/Swapper/Swapper';

const Swap: React.FC = () => {
    const t = useT();

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">{t('swap.title')}</h1>
            <Swapper />
        </div>
    );
};

export default Swap;
