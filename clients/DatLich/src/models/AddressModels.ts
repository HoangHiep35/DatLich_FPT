export interface AddressModels {
    access: string[][];
    address: Address;
    categories: string[][];
    distance: number;
    id: string;
    position: Position;
    resultType: string;
    title: string;
}

export interface Address {
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    houseNumber: string;
    label: string;
    postalCode: string;
    state: string;
    stateCode: string;
    street: string;
}

export interface Position {
    lat: number;
    lng: number;
}
export interface MapView {
    east: number;
    north: number;
    south: number;
    west: number;
}