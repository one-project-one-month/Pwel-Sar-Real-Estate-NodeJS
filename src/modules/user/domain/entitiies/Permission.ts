export class Permission {
  id: Number;
  action: string;
  resource: string;
  // roles?: RolePermission[];

  constructor(params: {
    id: Number;
    action: string;
    resource: string;
    // roles?: RolePermission[];
  }) {
    this.id = params.id;
    this.action = params.action;
    this.resource = params.resource;
    // this.roles = params.roles;
  }
}