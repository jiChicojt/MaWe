export class CVModel {

    constructor(
        // tslint:disable-next-line:variable-name
        public _id: string,
        public personalInfo: {
            name: string,
            lastname: string,
            birthdate: string,
            profession: string,
            experience: number,
            email: string,
            phone: number,
            country: string,
            city: string,
            address: string,
            languages: [{language: ''}],
            aptitudes: [{aptitude: ''}]
        },
        public education: [{
            school: '',
            degree: '',
            description: '',
            startDate: '',
            endDate: ''
        }],
        public  laboral: [{
            title: '',
            boss: '',
            enterprise: '',
            phone: '',
            description: '',
            startDate: '',
            endDate: ''
        }]
    ) { }
}
