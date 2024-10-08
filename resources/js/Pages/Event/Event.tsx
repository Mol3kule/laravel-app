import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Event} from "@/types/Event";
import {RenderEventItem} from "@/Pages/Admin/_components/RenderEventItem";

interface Props extends PageProps {
    data: Event;
}

export default function EventPage({ auth, data }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {data.title}
                </h2>
            }
        >
            <Head title="Events Control Panel" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex flex-col gap-4 p-6 text-gray-900 dark:text-gray-100">
                            <RenderEventItem
                                auth={auth}
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
