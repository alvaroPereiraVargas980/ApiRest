export class UserPermission{
    constructor(update_permission='',delete_permission='',view_permission='',id_user='',id_calendar=''){
            //this.id_permission=id_permission;
            this.update_permission=update_permission;
            this.delete_permission=delete_permission;
            this.view_permission=view_permission;
            this.id_user=id_user;
            this.id_calendar=id_calendar;
    }
        //id_permission: string;
        update_permission: string;
        delete_permission: string;
        view_permission: string;
        id_user:string;
        id_calendar: string
    }