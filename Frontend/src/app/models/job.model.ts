export class JobModel {

    constructor(
        // tslint:disable-next-line:variable-name
        public _id: string,
        public name: string,
        public enterprise: string,
        public salary: number,
        public description: string,
        public age: string,
        public experience: number,
        public profession: string,
        public schooling: number,
        public languages: [{language: string}],
        public aptitudes: [{aptitude: string}],
        public seen: number,
        public matched: number,
        public cvs: [{id: string}],
        public matchedP: number,
        public cvId: string
        ) { }
}
