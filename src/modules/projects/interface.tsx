export interface ResponseProjects {
    developer:    Developer;
    duration:     string;
    requirements: Requirements;
    client:       Client;
    budget:       string;
}

export interface Client {
    name:     string;
    industry: string;
    location: Location;
}

export interface Location {
    country: string;
    city:    string;
}

export interface Developer {
    profiles: string[];
    skills:   string[];
}

export interface Requirements {
    technologies:       string[];
    requiredExperience: string[];
}
