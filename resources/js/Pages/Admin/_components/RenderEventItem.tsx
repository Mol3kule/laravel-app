import {Event} from "@/types/Event";
import {User} from "@/types/User";
import {Link, useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import {FormEvent, FormEventHandler} from "react";

interface Props {
    auth: {
        user: User;
    };
    data: Event;
}

export const RenderEventItem = ({auth, data}: Props) => {
    const {delete: destroy} = useForm();

    const isInPage = route().current('event.view');
    const isAdmin = auth.user.type === 'admin';

    const isExpired = new Date(data.start).getTime() < Date.now();

    const handleUserRemove = (e: FormEvent<HTMLFormElement>, userId: number) => {
        e.preventDefault();
        destroy(route('event.drop.user', {eventId: Number(data.id), userId: Number(userId)}));
    }

    const handleDestroy: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('event.delete', { eventId: data.id }));
    }

    return (
        <div
            className={"flex flex-col gap-2 p-3 rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 relative"}>
            <span>Title: {data.title}</span>
            <span>Description: {data.description}</span>
            <span>Date: {new Date(data.start).toLocaleDateString()} {isExpired && '| Expired'}</span>
            {auth.user.type !== 'user' && (
                <>
                    {!isInPage ? (
                        <Link
                            href={route('event.view', {id: Number(data.id)})}
                            className={"text-gray-300 dark:text-gray-600 cursor-pointer w-max"}
                        >
                            Click for details
                        </Link>
                    ) : (
                        <>
                            {data.users.length > 0 ? (
                                isAdmin ? (
                                    <div className={"pl-2 grid"}>
                                        {data.users.map((user, idx) => (
                                            <form onSubmit={(e) => handleUserRemove(e, user.id)}
                                                  key={`event_${data.id}_user_list_${idx}`}
                                                  className={"flex gap-2 items-center"}>
                                                <span>- {user.name}</span>
                                                {isAdmin && (
                                                    <DangerButton className={"bg-transparent"}>Remove
                                                        User</DangerButton>
                                                )}
                                            </form>
                                        ))}
                                    </div>
                                ) : (
                                    <span
                                        className={"border-t border-gray-100 dark:border-gray-700"}>{data.users.length} have joined this event.</span>
                                )
                            ) : (
                                <span className={"border-t border-gray-100 dark:border-gray-700"}>No users have joined this event.</span>
                            )}
                        </>
                    )}
                </>
            )}
            {isAdmin && isInPage && (
                <form onSubmit={handleDestroy}>
                    <DangerButton className={"w-max absolute top-3 right-3"}>Delete</DangerButton>
                </form>
            )}
        </div>
    );
};