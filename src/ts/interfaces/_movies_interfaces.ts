interface Movie {
    [key:string]: string,
}

interface MovieDetails {
    Poster?: string;
    Title: string;
    Year: string;
    Type: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Ratings: [
        { Source: string; Value: string },
        { Source: string; Value: string }
    ];
    Country: string;
    Language: string;
    BoxOffice?: string;
}

export type { Movie, MovieDetails }
