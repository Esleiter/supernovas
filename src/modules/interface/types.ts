export interface ResponseIA {
    client:           Client;
    duration:         string;
    budget:           string;
    scope:            string[];
    requiredProfiles: RequiredProfile[];
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

export interface RequiredProfile {
    profileTitle: string;
    skills:       string[];
}



export interface ConsultansInterface {
    personal_data:   PersonalData;
    interests:       string[];
    education:       Education[];
    id:              number;
    work_experience: WorkExperience[];
    relations:       Relation[];
    skills:          string[];
}

export interface Education {
    degree:      string;
    start_date:  Date;
    institution: string;
    end_date:    Date;
}

export interface PersonalData {
    location:     string;
    phone:        string;
    email:        string;
    profileImage: string;
    name:         string;
}

export interface Relation {
    relation_type:        string;
    id:                   number;
    relation_description: string;
}

export interface WorkExperience {
    company:     string;
    position:    string;
    description: string;
    start_date:  Date;
    end_date:    string;
}
