export class DataPermission{
    constructor(update_permission='',view_permission='',owner='',id_permission=''){
            this.id_permission=id_permission;
            this.update_permission=update_permission;
            this.view_permission=view_permission;
            this.owner=owner; 
    }
        id_permission: string;
        update_permission: string;
        view_permission: string;
          owner:string;
    }