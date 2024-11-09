import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import {PageProps} from "@/types";
import {User, UserType} from "@/types/User";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import CustomDropdown from "@/Components/CustomDropdown";
import {FormEventHandler} from "react";
import {toast} from "react-toastify";

interface Props extends PageProps {
    data: User;
}

const RenderUserForm = ({data, translations}: Props) => {
    const {patch, data: formData, setData} = useForm({
        name: data.name,
        type: data.type
    });

    const userTypes: UserType[] = ['user', 'employer', 'admin'];

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admin.users_control_panel.update', {id: Number(data.id)}), {
            onError: (errors) => {
                Object.keys(errors).map((key) => {
                    toast(errors[key], {type: "error"});
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {translations?.users_control_panel}
                </h2>
            }
        >
            <Head title="Users Control Panel"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                                <InputLabel>User id: {data.id}</InputLabel>
                                <div>
                                    <InputLabel htmlFor={'name'}>Name</InputLabel>
                                    <TextInput name={'name'} placeholder={'Enter a name'} className={"border-none"}
                                               value={formData.name}
                                               onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>
                                <div className={"flex flex-col gap-1"}>
                                    <CustomDropdown
                                        options={userTypes}
                                        selected={formData.type}
                                        onSelect={(type) => setData('type', type)}
                                    />
                                </div>
                                <PrimaryButton className={"w-max"}>Update user</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default RenderUserForm;