import {Config} from 'ziggy-js';
import {User} from "@/types/User";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    translations?: Record<string, string>;
};
