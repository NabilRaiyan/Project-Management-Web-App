import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TaskTable from "../Tasks/TaskTable";


export default function Show({auth, task, tasks, queryParams}){
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {`Task "${task.name}"`}
            </h2>
            }
        >
        {/* Single Task details show */}
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto py-6 px-5 text-xl">
                        <img src={task.image_path} alt="task image" className="w-full h-64 object-cover"></img>
                    </div>
                    <div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Task ID</label>
                                <p className="mt-2 px-3">{task.id}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Task Name</label>
                                <p className="mt-2 px-3">{task.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Task Status</label>
                                <p className="mt-2 px-3 py-3">
                                <span className={
                                            "px-3 py-2 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]
                                        }>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created Date</label>
                                <p className="mt-2 px-3">{task.created_at}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Due Date</label>
                                <p className="mt-2 px-3">{task.due_date}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created By</label>
                                <p className="mt-2 px-3">{task.createdBy.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Updated By</label>
                                <p className="mt-2 px-3">{task.updatedBy.name}</p>
                            </div>
                        </div>
                        <div>
                            <label className="px-6 font-bold text-lg">Task Description</label>
                            <p className="mt-1 px-6 py-2 mb-3">{task.description}</p>
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