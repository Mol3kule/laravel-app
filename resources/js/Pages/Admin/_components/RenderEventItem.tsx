import {Event} from "@/types/Event";
import {User} from "@/types/User";
import {Link, useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {FormEventHandler} from "react";

interface Props {
    auth: {
        user: User;
    };
    data: Event;
}

export const RenderEventItem = ({ auth, data }: Props) => {
    const { data: formData, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const onFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('password.confirm'), {
        //     onFinish: () => reset('password'),
        // });
    }

    const isInPage = route().current('event.view');
    const isAdmin = auth.user.type === 'admin';

    const isExpired = new Date(data.start).getTime() < Date.now();

    return (
        <div className={"flex flex-col gap-2 p-3 rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 relative"}>
            <span>Title: {data.title}</span>
            <span>Description: {data.description}</span>
            <span>Date: {new Date(data.start).toLocaleDateString()} {isExpired && '| Expired'}</span>
            {auth.user.type !== 'user' && (
                <>
                    {!isInPage ? (
                            <Link
                                href={route('event.view', { id: Number(data.id) })}
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
                                            <span key={`event_${data.id}_user_list_${idx}`}>- {user.name}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className={"border-t border-gray-100 dark:border-gray-700"}>{data.users.length} have joined this event.</span>
                                )
                            ) : (
                                <span className={"border-t border-gray-100 dark:border-gray-700"}>No users have joined this event.</span>
                            )}
                            {isAdmin && !isExpired && (
                                <form onSubmit={onFormSubmit}>
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </form>
                            )}
                        </>
                    )}
                </>
            )}
            {isAdmin && isInPage && (
                <DangerButton className={"w-max absolute top-3 right-3"}>Delete</DangerButton>
            )}
        </div>
    );
};