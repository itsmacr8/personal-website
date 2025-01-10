import { DatabaseRecord } from '../../types/DatabaseRecord.interface';

interface MovieDetails {
  imdbID: string;
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
  recommenderName: string;
  recommenderContact: string;
}

interface SearchMovies {
  movies: DatabaseRecord[];
  totalFoundMovies: number;
}

export type { MovieDetails, SearchMovies };
