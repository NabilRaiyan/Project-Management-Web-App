// video watched until 3:34 min

import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

// creating index class

export default function Index({auth, users, queryParams = null, success}){
    // searchFieldChange Function
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) =>{
        if (value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams);
    };

    // onKeyPress Function
    const onKeyPress = (name, e) => {
        if (e.key != "Enter") return;

        searchFieldChanged(name, e.target.value);
    }

    // delete user
    const deleteUser = (user)=>{
        if (!window.confirm("Do you want to delete this user?")){
            return;
        }else{
            router.delete(route('user.destroy', user.id))
        }
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
        router.get(route('user.index'), queryParams);
    }

    // authenticated layout
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
                <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New User</Link>
            </div>
            }
        >
        {/* user head */}
        <Head title="Users" />
        
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Successfully created user message */}
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
                                <TableHeading sortChange={sortChange} name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Name</TableHeading>
                                <TableHeading sortChange={sortChange} name="email" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Email</TableHeading>
                                <TableHeading sortChange={sortChange} name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} >Created At</TableHeading>
                                <th className="px-1 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <thead className="text-ts text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-5"></th>
                                <th className="px-3 py-5"></th>
                                <th className="px-1 py-5">
                                    <TextInput defaultValue={queryParams.name} className="w-60" placeholder="User Name" onBlur={e => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)} />
                                </th>
                                <th className="px-1 py-5">
                                    <TextInput defaultValue={queryParams.email} className="w-60" placeholder="User Email" onBlur={e => searchFieldChanged('email', e.target.value)} onKeyPress={e => onKeyPress('email', e)} />
                                </th>
                                <th className="px-3 py-5 text-nowrap"></th> 

                            </tr>
                        </thead>
                        <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-1 py-2 text-nowrap">{user.id}</td>
                                <td className="px-1 py-2 text-white text-nowrap">
                                        {user.name}
                                    </td>
                                <td className="px-1 py-2">
                                    {user.email}

                                </td>
                                <td className="px-0 py-2 text-nowrap">{user.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                    </Link>
                                    <button onClick={ (e) => deleteUser(user)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </table>
                    </div>
                    <Pagination links={users.meta.links} />
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}