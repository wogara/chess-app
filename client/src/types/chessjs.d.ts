declare module 'chess.js' {
    export class Chess {
        constructor(fen?: string);
        ascii(): string;
        clear(): void;
        fen(): string;
        game_over(): boolean;
        get(square: string): { type: string; color: string } | null;
        history(options?: { verbose: boolean }): Move[];
        in_check(): boolean;
        in_checkmate(): boolean;
        in_draw(): boolean;
        in_stalemate(): boolean;
        in_threefold_repetition(): boolean;
        insufficient_material(): boolean;
        load(fen: string): boolean;
        load_pgn(pgn: string): void;
        move(move: string | { from: string; to: string; promotion?: string }): { color: string; from: string; to: string; flags: string; piece: string; san: string; captured?: string; promotion?: string } | null;
        moves(options?: { square: string; verbose: boolean }): string[] | { color: string; from: string; to: string; flags: string; piece: string; san: string; captured?: string; promotion?: string }[];
        pgn(options?: { max_width?: number; newline_char?: string }): string;
        put(piece: { type: string; color: string }, square: string): boolean;
        remove(square: string): { type: string; color: string } | null;
        reset(): void;
        square_color(square: string): 'light' | 'dark' | null;
        turn(): 'w' | 'b';
        undo(): { color: string; from: string; to: string; flags: string; piece: string; san: string; captured?: string; promotion?: string } | null;
        validate_fen(fen: string): { valid: boolean; error_number: number; error: string };
    }
}
