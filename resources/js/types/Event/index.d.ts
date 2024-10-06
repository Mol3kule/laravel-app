export type Event = {
    id: number;
    title: string;
    description: string;
    start: number;
    users: {
        name: string;
    }[]
}