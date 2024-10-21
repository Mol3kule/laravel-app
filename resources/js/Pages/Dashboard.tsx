import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {PageProps} from "@/types";
import {Event} from "@/types/Event";
import {RenderActiveEvents} from "@/Pages/Admin/_components/RenderActiveEvents";
import {RenderExpiredEvents} from "@/Pages/Admin/_components/RenderExpiredEvents";
import PrimaryButton from "@/Components/PrimaryButton";

interface Props extends PageProps {
    data: Event[];
}

export default function Dashboard({auth, data, translations}: Props) {
    const isAdmin = auth.user.type === 'admin';
    const hasAccess = isAdmin || auth.user.type === 'employer';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {translations?.dashboard}
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex flex-col gap-4 p-6 text-gray-900 dark:text-gray-100">
                            {isAdmin && (
                                <Link href={route('event.create.index')} className={"w-max"}>
                                    <PrimaryButton className={"w-max"}>{translations?.create_event}</PrimaryButton>
                                </Link>
                            )}
                            <RenderActiveEvents data={data}/>
                            {hasAccess && (
                                <RenderExpiredEvents data={data}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
