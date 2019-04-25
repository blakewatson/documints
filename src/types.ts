type Uuid = number;

interface Documint {
    access: string[];
    description: string;
    expirationDate: string;
    icon: string;
    id: Uuid;
    lastViewed: string;
    name: string;
    tags: string[];
}

export {
    Uuid,
    Documint
}