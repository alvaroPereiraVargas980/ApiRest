export class userCalendarPermission{
    constructor(id_calendar='',description='',owner=''){
           
            this.id_calendar=id_calendar;
            this.description=description;
            this.owner=owner;
           
    }
        id_calendar: string;
        description: string;
        owner: string;
    }