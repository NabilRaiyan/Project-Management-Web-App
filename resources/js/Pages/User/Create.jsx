import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
export default function Create({auth}){
    // inirtia form variable
    const {data, setData, post, reset, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    // onSubmit function to submit the form 
    const onSubmit = (e)=>{
        e.preventDefault();
        post(route("user.store"))
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header= {
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New User</h2>
            </div>
            }
        >
        <Head title="Create New User" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                           
                            {/* user name */}
                            <div className="mt-6">
                                <InputLabel className="text-white mb-4 text-xl" htmlFor="user_name" value="User Name"></InputLabel>
                                <TextInput id="user_name" type="text" name="name" isFocused={true}
                                value={data.name} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('name', e.target.value)}></TextInput>
                                <InputError message={errors.name} className="mt-3 text-xl"></InputError>
                            </div>

                            {/* user email */}
                            <div className="mt-6">
                                <InputLabel className="text-white mb-4 text-xl" htmlFor="user_email" value="User Email"></InputLabel>
                                <TextInput id="user_email" type="text" name="email" 
                                value={data.email} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('email', e.target.value)}></TextInput>
                                <InputError message={errors.email} className="mt-3 text-xl"></InputError>
                            </div>

                             {/* user password */}
                             <div className="mt-6">
                                <InputLabel className="text-white mb-4 text-xl" htmlFor="user_password" value="User Password"></InputLabel>
                                <TextInput id="user_password" type="password" name="email" 
                                value={data.password} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('password', e.target.value)}></TextInput>
                                <InputError message={errors.password} className="mt-3 text-xl"></InputError>
                            </div>

                             {/* user password confirmation */}
                             <div className="mt-6">
                                <InputLabel className="text-white mb-4 text-xl" htmlFor="user_password_confirmation" value="Confirm Password"></InputLabel>
                                <TextInput id="user_password_confirmation" type="password" name="email" 
                                value={data.password_confirmation} className="mt-1 block w-full text-gray-800 caret-gray-800" onChange={e => setData('password_confirmation', e.target.value)}></TextInput>
                                <InputError message={errors.password_confirmation} className="mt-3 text-xl"></InputError>
                            </div>


                            
                            {/* buttons */}
                            <div className="mt-8 text-right">
                                <Link href={route("user.index")} className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
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