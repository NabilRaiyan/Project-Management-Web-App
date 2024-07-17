import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({auth}){
    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
            </div>
            }
        >
        <Head title="Create New Project" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto">
                        kdjfnnflkjnvklf
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}