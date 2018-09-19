export class UserPermission{
    constructor(update_permission='',view_permission='',id_user='',id_calendar=''){
            this.update_permission=update_permission;
            this.view_permission=view_permission;
            this.id_user=id_user;
            this.id_calendar=id_calendar;
    }
   
        update_permission: string;
        view_permission: string;
        id_user:string;
        id_calendar: string
    }