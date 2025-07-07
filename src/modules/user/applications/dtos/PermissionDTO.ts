class PermissionDTO {
    id: number;
    action: string;
    resource: string;

    constructor(permission: any) {
        this.id = permission.id;
        this.action = permission.action;
        this.resource = permission.resource;
    }
}