import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";


export default function Index({auth, projects}){
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
            }
        >
        <Head title="Projects" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">All project</div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-ts text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-5">ID</th>
                                <th className="px-3 py-5">Image</th>
                                <th className="px-3 py-5">Name</th>
                                <th className="px-3 py-5">Status</th>
                                <th className="px-3 py-5">Created Date</th>
                                <th className="px-3 py-5">Due Date</th>
                                <th className="px-3 py-5">Created By</th>
                                <th className="px-3 py-5 text-right">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                        {projects.data.map(project => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2 text-nowrap">{project.id}</td>
                                <td className="px-3 py-2 text-nowrap"><img src={project.image_path} style={{width:60}} alt=""/></td>
                                <td className="px-3 py-2 text-nowrap">{project.name}</td>
                                <td className="px-3 py-2 text-nowrap">{project.status}</td>
                                <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                <td className="px-3 py-2 text-nowrap">{project.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                    </Link>
                                    <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                    </Link>
                                </td>


                            </tr>
                        ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}