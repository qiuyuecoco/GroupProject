export interface Movie {
    adult?: boolean;
    backdrop_path?: string | null;
    belongs_to_collection?: null | object;
    budget?: number;
    genres?: [];
    homepage?: string | null;
    id?: number;
    imdb_id?: string | null;
    original_language?: string;
    original_title?: string;
    overview?: string | null;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: [];
    production_countries?: [];
    release_date?: string;
    results?: number;
    revenue?: number;
    runtime?: number | null;
    spoken_languages?: [];
    status?: string;
    tagline?: string | null;
    title?: string;
    total_results?: number;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}
