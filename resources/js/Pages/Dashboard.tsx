import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Event} from "@/types/Event";
import {RenderActiveEvents} from "@/Pages/Admin/_components/RenderActiveEvents";
import {RenderExpiredEvents} from "@/Pages/Admin/_components/RenderExpiredEvents";

interface Props extends PageProps {
    data: Event[];
}

export default function Dashboard({ auth, data }: Props) {
    const hasAccess = auth.user.type === 'admin' || auth.user.type === 'employer';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex flex-col gap-4 p-6 text-gray-900 dark:text-gray-100">
                            <RenderActiveEvents data={data} />
                            {hasAccess && (
                                <RenderExpiredEvents data={data} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
