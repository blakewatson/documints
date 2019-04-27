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

interface NewName {
    docId: Uuid;
    name: string;
}

interface NewDescription {
    docId: Uuid;
    description: string;
}

interface NewTags {
    docId: Uuid;
    tags: string[];
}

interface NewAccess {
    docId: Uuid;
    access: string[];
}

interface AccessMap {
    [personName: string]: undefined | boolean
}

export {
    Uuid,
    Documint,
    NewName,
    NewDescription,
    NewAccess,
    NewTags,
    AccessMap
}