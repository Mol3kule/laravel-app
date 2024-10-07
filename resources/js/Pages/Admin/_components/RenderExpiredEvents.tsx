import {Event} from "@/types/Event";
import {RenderEventItem} from "@/Pages/Admin/_components/RenderEventItem";
import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";

interface Props {
    data: Event[];
}
export const RenderExpiredEvents = ({ data }: Props) => {
    const auth = usePage().props.auth;
    const [expiredEvents, setExpiredEvents] = useState<Event[]>([]);

    useEffect(() => {
        const { user } = auth;

        if (!user || !data) return;

        const { expired } = data.reduce((acc, event) => {
            const eventStartTime = new Date(event.start).getTime();
            const currentTime = Date.now();

            if (eventStartTime < currentTime) {
                acc.expired.push(event);
            }

            return acc;
        }, { expired: [] as Event[] });

        setExpiredEvents(expired);
    }, [auth, data]);

    return (
        <>
            <span>Expired events: {expiredEvents.length}</span>
            <div className={"grid gap-2"}>
                {expiredEvents.map((event, idx) => (
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