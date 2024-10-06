import {Event} from "@/types/Event";
import {User} from "@/types/User";
import {Link} from "@inertiajs/react";

interface Props {
    auth: {
        user: User;
    };
    data: Event;
}

export const RenderEventItem = ({ auth, data }: Props) => {
    return (
        <div className={"flex flex-col gap-2 p-3 rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900"}>
            <span>Title: {data.title}</span>
            <span>Description: {data.description}</span>
            <span>Date: {new Date(data.start).toLocaleDateString()}</span>
            {auth.user.type !== 'user' && (
                <>
                    {!route().current('event.view') ? (
                            <Link
                                href={route('event.view', { id: Number(data.id) })}
                                className={"text-gray-300 dark:text-gray-600 cursor-pointer w-max"}
                            >
                                Click for details
                            </Link>
                    ) : (
                        <>
                            {data.users.length > 0 ? (
                                auth.user.type === 'admin' ? (
                                    <div className={"pl-2 grid"}>
                                        {data.users.map((user, idx) => (
                                            <span key={`event_${data.id}_user_list_${idx}`}>- {user.name}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className={"border-t border-gray-100 dark:border-gray-700"}>{data.users.length} has joined this event.</span>
                                )
                            ) : (
                                <span className={"border-t border-gray-100 dark:border-gray-700"}>No users joined this event.</span>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};