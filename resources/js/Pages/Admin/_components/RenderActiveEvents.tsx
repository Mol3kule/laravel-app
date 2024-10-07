import {Event} from "@/types/Event";
import {RenderEventItem} from "@/Pages/Admin/_components/RenderEventItem";
import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";

interface Props {
    data: Event[];
}
export const RenderActiveEvents = ({ data }: Props) => {
    const [activeEvents, setActiveEvents] = useState<Event[]>([]);
    const auth = usePage().props.auth;

    useEffect(() => {
        const { user } = auth;

        if (!user || !data) return;

        const { active } = data.reduce((acc, event) => {
            const eventStartTime = new Date(event.start).getTime();
            const currentTime = Date.now();

            if (eventStartTime > currentTime) {
                acc.active.push(event);
            }

            return acc;
        }, { active: [] as Event[] });

        setActiveEvents(active);
    }, [auth, data]);

    return (
        <>
            <span>Active events: {activeEvents.length}</span>
            <div className={"grid gap-2"}>
                {activeEvents.map((event, idx) => (
                    <RenderEventItem
                        auth={auth}
                        data={event}
                        key={`active_event_${idx}`}
                    />
                ))}
            </div>
        </>
    )
}