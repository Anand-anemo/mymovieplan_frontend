import { MovieShows } from "./MovieShows.model";

export interface Shows {
    showid?: number;
    name: string;
    startTime: string;
    movieShows: MovieShows[];
}