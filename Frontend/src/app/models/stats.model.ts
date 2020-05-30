export class StatsModel {
    constructor(
        public totalSeen: number,
        public totalMatches: number,
        public jobs: [{
            name: string,
            seen: number,
            matches: number
        }],
        public schooling: {
            primaria: number,
            basicos: number,
            diversificado: number,
            universidad: number
        }
    ) {
    }
}
