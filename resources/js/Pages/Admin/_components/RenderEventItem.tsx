import {Event} from "@/types/Event";
import {User} from "@/types/User";

interface Props {
    auth: {
        user: User;
    };
    data: Event;
}

export const RenderEventItem = ({ auth, data }: Props) => {
    return (
        <div className={"flex flex-col gap-2 p-3 rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900"}>
            <span>{data.title}</span>
            <span>{data.description}</span>
            <span>{new Date(data.start).toLocaleDateString()}</span>
            {auth.user.type !== 'user' && (
                <span className={"text-gray-300 dark:text-gray-600 cursor-pointer w-max"}>Click for details</span>
            )}
        </div>
    );
};