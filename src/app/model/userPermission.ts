export class UserPermission{
    constructor(permission_id='',updatePermission='',deletePermission='',viewPermission='',user_id=''){
            this.permission_id=permission_id;
            this.updatePermission=updatePermission;
            this.deletePermission=deletePermission;
            this.viewPermission=viewPermission;
            this.user_id=user_id;
    }
        permission_id: string;
        updatePermission: string;
        deletePermission: string;
        viewPermission: string;
        user_id:string;
    }