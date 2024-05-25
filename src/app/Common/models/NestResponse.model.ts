export interface NestResponse {
    response: Response;
    status:   number;
    options:  Options;
    message:  string;
    name:     string;
}

export interface Options {
}

export interface Response {
    message:    string;
    error:      string;
    statusCode: number;
}
