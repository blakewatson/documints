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

interface NewTags {
    docId: Uuid,
    tags: string[]
}

interface AccessMap {
    [personName: string]: undefined | boolean
}

export {
    Uuid,
    Documint,
    NewTags,
    AccessMap
}