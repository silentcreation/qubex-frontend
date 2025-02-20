"use client";

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleReturnHome = () => {
        router.push('/');
    };

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={handleReturnHome}>
                Return to Home Page
            </button>
        </div>
    );
}