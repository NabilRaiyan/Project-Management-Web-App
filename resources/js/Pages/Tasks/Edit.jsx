import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

// updating task
export default function Create({auth, task, projects, users}){
    // inirtia form variable
    const {data, setData, post, reset, errors} = useForm({
        image: task.image_path || "",
        name: task.name || "",
        status: task.status || "",
        description: task.description || "",
        due_date: task.due_date || "",
        priority: task.priority || "",
        project_id: task.project_id || "",
        assigned_user_id: task.assigned_user_id || "",
        _method: 'PUT',
    })

    // onSubmit function to submit the form 
    const onSubmit = (e)=>{
        e.preventDefault();
        post(route("task.update", task.id))
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task {task.name}</h2>
            </div>
            }
        >
        <Head title="Edit Task " />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto">
                    <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        {/* project id select */}
                        <div className="mt-6 mb-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_project_id" value="Project Id"></InputLabel>
                            <SelectInput id="task_project_id" type="text" name="project_id"
                            value={data.project_id} className="mt-1 block w-full text-gray-700" onChange={e => setData('project_id', e.target.value)}>
                                <option value="">Select Project</option>
                                {
                                    projects.data.map(project => (
                                        <option value={project.id} key={project.id}>{project.name}</option>
                                    ))
                                }

                            </SelectInput>
                            <InputError message={errors.status} className="mt-3 text-xl"></InputError>
                        </div>


                        {/* task image */}
                        <div>
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_image_path" value="Task Image"></InputLabel>
                            <TextInput id="task_image_path" type="file" name="image" 
                            className="mt-1 block w-full text-white" onChange={e => setData('image_path', e.target.files[0])}></TextInput>
                            <InputError message={errors.image} className="mt-3 text-xl"></InputError>
                        </div>
                        {/* task name */}
                        <div className="mt-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_name" value="Task Name"></InputLabel>
                            <TextInput id="task_name" type="text" name="name" isFocused={true}
                            value={data.name} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('name', e.target.value)}></TextInput>
                            <InputError message={errors.name} className="mt-3 text-xl"></InputError>
                        </div>

                        {/* task description */}
                        <div className="mt-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_description" value="Task Description"></InputLabel>
                            <TextAreaInput id="task_description" type="text" name="description"
                            value={data.description} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('description', e.target.value)}></TextAreaInput>
                            <InputError message={errors.description} className="mt-3 text-xl"></InputError>
                        </div>

                        {/* task status */}
                        <div className="mt-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_status" value="Task Status"></InputLabel>
                            <SelectInput id="task_status" type="text" name="status"
                            value={data.status} className="mt-1 block w-full text-gray-700" onChange={e => setData('status', e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>

                            </SelectInput>
                            <InputError message={errors.status} className="mt-3 text-xl"></InputError>
                        </div>

                        {/* task due_date */}
                        <div className="mt-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_due_date" value="Task Due Date"></InputLabel>
                            <TextInput id="task_due_date" type="date" name="due_date"
                            value={data.due_date} className="mt-1 block w-full text-gray-800" onChange={e => setData('due_date', e.target.value)}></TextInput>
                            <InputError message={errors.due_date} className="mt-3 text-xl"></InputError>
                        </div>

                        {/* task priority */}
                        <div className="mt-6 mb-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_priority" value="Task Priority"></InputLabel>
                            <SelectInput id="task_priority" type="text" name="priority"
                            value={data.priority} className="mt-1 block w-full text-gray-700" onChange={e => setData('priority', e.target.value)}>
                                <option value="">Select Task Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>

                            </SelectInput>
                            <InputError message={errors.priority} className="mt-3 text-xl"></InputError>
                        </div>

                        {/* assigned user */}
                        <div className="mt-6 mb-6">
                            <InputLabel className="text-white mb-4 text-xl" htmlFor="task_assigned_user" value="Select User To Assign for The Task"></InputLabel>
                            <SelectInput id="task_assigned_user" type="text" name="assigned_user_id"
                            className="mt-1 block w-full text-gray-700" 
                            value={data.assigned_user_id}
                            onChange={(e) => setData('assigned_user_id', parseInt(e.target.value))}
                            >
                                <option value="">Select Assigned User</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))
                                }

                            </SelectInput>
                            <InputError message={errors.assigned_user_id} className="mt-3 text-xl"></InputError>

                        </div>
                        {/* buttons */}
                        <div className="mt-8 text-right">
                            <Link href={route("task.index")} className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                Cancel
                            </Link>
                            <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all
                            hover:bg-emerald-600">
                                Submit
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}