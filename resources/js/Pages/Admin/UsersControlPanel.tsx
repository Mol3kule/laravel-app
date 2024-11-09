import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from "@/types";
import {User} from "@/types/User";

interface Props extends PageProps {
    data: User[];
}

export default function UsersControlPanel({auth, data, translations}: Props) {
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
                        <div className="grid grid-cols-3 gap-2 p-6 text-gray-900 dark:text-gray-100">
                            {data.map((user, idx) => (
                                <Link
                                    href={route('admin.users_control_panel.edit', {id: Number(user.id)})}
                                    key={`user_control_panel_${idx}`}
                                    className={"flex flex-col gap-2 p-3 rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 cursor-pointer"}
                                >
                                    <div className={"flex justify-between capitalize"}>
                                        <span>
                                            {user.name}
                                        </span>
                                        <span className={"text-red-400"}>
                                            {user.type}
                                        </span>
                                    </div>
                                    <hr/>
                                    <div className={"flex justify-between"}>
                                        <span>
                                            {user.email}
                                        </span>
                                        <span className={"text-red-400"}>
                                            {user.id}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
