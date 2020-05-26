export class StatsModel {
    constructor(
        public totalSeen: number,
        public totalMatches: number,
        public jobs: [{
            name: string,
            seen: number,
            matches: number
        }]
    ) {
    }
}
