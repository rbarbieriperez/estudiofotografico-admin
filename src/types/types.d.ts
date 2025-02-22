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
    event_category_group_id: number;
    total_images: number;
    eventPreviewImage: string;
    numberOfDaysSinceCreation: number;
}

/**
 * Event created from front
 */
export type TEventRaw = {
    event_id?: number;
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
    event_category_group_id: number;
    images: TImage[]
}

export type TImage = {
    description: string;
    price: number;
    isEventPreview: boolean;
    file: File;
    originalFileName: string;
    isWatermarked?: boolean;
    event_id?: number;
    picture_id?: number;
    webContentLink?: string;
    isNewImage?: Boolean;
}

export type TImageResponse = {
    event_id: number;
    picture_id: number;
    description: string;
    price: number;
    webContentLink: string;
    isWatermarked: boolean;
}


export type TFile = {
    name: string;
    size: string;
    mimeType: string;
    webContentLink: string;
    totalImages: string;
};