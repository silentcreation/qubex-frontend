'use client';

import React, { useState } from 'react';
import { useT } from '@/hooks/useT';

const Swap: React.FC = () => {
    const t = useT();

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">{t('qx.title')}</h1>
            <p>QX Explorer comes here</p>
        </div>
    );
};

export default Swap;
