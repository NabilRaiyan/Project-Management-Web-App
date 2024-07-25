// video watched until 3:34 min

import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

// creating index class


export default function Index({auth, projects, queryParams = null, success}){
    // searchFieldChange Function
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) =>{
        if (value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams);
    };

    // onKeyPress Function
    const onKeyPress = (name, e) => {
        if (e.key != "Enter") return;

        searchFieldChanged(name, e.target.value);
    }

    // sortChange function
    const sortChange = (name)=> {
        if (name === queryParams.sort_field){
            if (queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('project.index'), queryParams);
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
                <Link href={route('project.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New Project</Link>
            </div>
            }
        >
        <Head title="Projects" />
        

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Successfully created project message */}
                { success &&
                    <div className="bg-emerald-500 py-2 px-4 mb-5 text-white rounded">
                        {success}
                    </div>
                }
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <TableHeading sortChange={sortChange} name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >ID</TableHeading>
                                <th className="px-1 py-3">Image</th>
                                <TableHeading sortChange={sortChange} name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Name</TableHeading>

                                <TableHeading sortChange={sortChange} name="status" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Status</TableHeading>

                                <TableHeading sortChange={sortChange} name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Created At</TableHeading>

                                <TableHeading sortChange={sortChange} name="due_date" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Due Date</TableHeading>

                                <th className="px-1 py-3">Created By</th>
                                <th className="px-1 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <thead className="text-ts text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-5"></th>
                                <th className="px-3 py-5"></th>
                                <th className="px-1 py-5">
                                    <TextInput defaultValue={queryParams.name} className="w-80" placeholder="Project Name" onBlur={e => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)} />
                                </th>
                                <th className="px-1 py-5">
                                    <SelectInput defaultValue={queryParams.status} className="w-50" onChange={(e) => searchFieldChanged('status', e.target.value)}> 
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>

                                    </SelectInput>
                                </th>
                                <th className="px-3 py-5 text-nowrap"></th>
                                <th className="px-3 py-5 text-nowrap"></th>
                                <th className="px-3 py-5 text-nowrap"></th>
                                <th className="px-3 py-5 text-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {projects.data.map((project) => (
                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-1 py-2 text-nowrap">{project.id}</td>
                                <td className="px-1 py-2 text-nowrap"><img src={project.image_path} style={{width:60}} alt=""/></td>
                                <td className="px-1 py-2 text-white text-nowrap">
                                    <Link href={route("project.show", project.id)} className="px-3 py-2 hover:underline" >
                                        {project.name}
                                    </Link></td>
                                <td className="px-1 py-2">
                                    <span className={
                                        "px-3 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]
                                    }>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                <td className="px-1 py-2 text-nowrap">{project.due_date}</td>
                                <td className="px-3 py-2">{project.createdBy.name}</td>
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
                    <Pagination links={projects.meta.links} />
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}