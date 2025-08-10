import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export type Company = {
    id: number;
    name: string;
    address: string;
    telephone: string;
    email: string;

    owner_name: string;
    owner_mobile: string;
    owner_email: string;

    contact_name: string;
    contact_mobile: string;
    contact_email: string;
    created_at: string;
    updated_at: string;
    deactivated: boolean;
};
