import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ auth, myPendingTask, totalPendingTask }) {
    useEffect(() => {
        console.log('Auth:', auth);
        console.log('My Pending Task:', myPendingTask);
        console.log('Total Pending Task:', totalPendingTask);
    }, [auth, myPendingTask, totalPendingTask]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-amber-500 text-xl font-semibold'>Pending Tasks</h3>
                            <span className='mr-2'>{myPendingTask}</span> / <span className='mr-2'>{totalPendingTask}</span>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-amber-500 text-xl font-semibold'>Pending Tasks</h3>
                            <span className='mr-2'>{myPendingTask}</span> / <span className='mr-2'>{totalPendingTask}</span>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-amber-500 text-xl font-semibold'>Pending Tasks</h3>
                            <span className='mr-2'>{myPendingTask}</span> / <span className='mr-2'>{totalPendingTask}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
