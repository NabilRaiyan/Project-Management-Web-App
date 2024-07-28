import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TaskTable from "../Tasks/TaskTable";


export default function Show({auth, user, tasks, queryParams}){
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {`User "${user.name}"`}
            </h2>
            }
        >
        {/* Single User details show */}
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto py-6 px-5 text-xl">
                        <img src={user.image_path} alt="user image" className="w-full h-64 object-cover"></img>
                    </div>
                    <div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">User ID</label>
                                <p className="mt-2 px-3">{user.id}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">User Name</label>
                                <p className="mt-2 px-3">{user.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">User Status</label>
                                <p className="mt-2 px-3 py-3">
                                <span className={
                                            "px-3 py-2 rounded text-white " + USER_STATUS_CLASS_MAP[user.status]
                                        }>{USER_STATUS_TEXT_MAP[user.status]}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created Date</label>
                                <p className="mt-2 px-3">{user.created_at}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Due Date</label>
                                <p className="mt-2 px-3">{user.due_date}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created By</label>
                                <p className="mt-2 px-3">{user.createdBy.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Updated By</label>
                                <p className="mt-2 px-3">{user.updatedBy.name}</p>
                            </div>
                        </div>
                        <div>
                            <label className="px-6 font-bold text-lg">User Description</label>
                            <p className="mt-1 px-6 py-2 mb-3">{user.description}</p>
                        </div>
                </div>
                
            </div>
        </div>

        {/* Task table show  */}
        <div className="pb-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-5 px-6">
                        <TaskTable tasks={tasks} queryParams={queryParams}></TaskTable>
                </div>
                
            </div>
        </div>

        </AuthenticatedLayout>
    )
}