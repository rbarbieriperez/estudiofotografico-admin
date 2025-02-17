

export type TUserLoginData = {
    id: number,
    username: string,
    surname: string,
    active: number,
    email: string,
    lastLogin: string
};

export type TDriveData = {
    limit: number;
    usage: number;
    availableSpace: number;
};

// Event received from the API
export type TEvent = {
    event_id: number;
    name: string;
    date: string;
    country: string;
    department: string;
    city: string;
    description: string;
    event_user: string;
    event_password: string;
    creation_date: string;
    event_type_id: number;
    event_category_id: number;
    totalImages: number;
    eventPreviewImage: string;
    numberOfDaysSinceCreation: number;
}

/**
 * Event created from front
 */
export type TEventRaw = {
    name: string;
    date: string;
    country: string;
    department: string;
    city: string;
    description: string;
    event_user: string;
    event_password: string;
    event_type_id: number;
    event_category_id: number;
    images: TImage[]
}

export type TImage = {
    description: string;
    price: number;
    isImagePreview: boolean;
    base64: string;
}