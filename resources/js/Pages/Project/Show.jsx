import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


export default function Show({auth, project}){
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {`Project "${project.name}"`}
            </h2>
            }
        >
        {/* Single Project details */}
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto py-6 px-5 text-xl">
                        <img src={project.image_path} alt="project image" className="w-full h-64 object-cover"></img>
                    </div>
                    <div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Project ID</label>
                                <p className="mt-2 px-3">{project.id}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Project Name</label>
                                <p className="mt-2 px-3">{project.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Project Status</label>
                                <p className="mt-2 px-3 py-3">
                                <span className={
                                            "px-3 py-2 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]
                                        }>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created Date</label>
                                <p className="mt-2 px-3">{project.created_at}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Due Date</label>
                                <p className="mt-2 px-3">{project.due_date}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Created By</label>
                                <p className="mt-2 px-3">{project.createdBy.name}</p>
                            </div>
                        </div>
                        <div className="p-3 grid gap-1 grid-cols-2">
                            <div>
                                <label className="px-3 font-bold text-lg">Updated By</label>
                                <p className="mt-2 px-3">{project.updatedBy.name}</p>
                            </div>
                        </div>
                        <div>
                            <label className="px-6 font-bold text-lg">Project Description</label>
                            <p className="mt-1 px-6 py-2 mb-3">{project.description}</p>
                        </div>
                </div>
                
            </div>
        </div>


        {/* Task table  */}
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-5 px-6">
                        Tabel goes here
                </div>
                
            </div>
        </div>

        </AuthenticatedLayout>
    )
}