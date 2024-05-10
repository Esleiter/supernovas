export interface ResponseIA {
    client:       Client;
    duration:     string;
    budget:       string;
    requirements: Requirements;
    developer:    Developer;
}

export interface Client {
    name:     string;
    industry: string;
    location: Location;
}

export interface Location {
    city:    string;
    country: string;
}

export interface Developer {
    skills: string[];
}

export interface Requirements {
    technologies:       string[];
    requiredExperience: string[];
}
