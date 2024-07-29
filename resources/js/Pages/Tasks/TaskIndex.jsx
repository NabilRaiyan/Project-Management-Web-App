

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TaskTable from "./TaskTable";


export default function Index({auth, tasks, queryParams, success}){
  
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">All Tasks</h2>
                <Link href={route('task.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New Task</Link>
            </div>
            }
        >
        <Head title="Tasks" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <TaskTable tasks={tasks} queryParams={queryParams} success={success}></TaskTable>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}