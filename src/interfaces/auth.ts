export default interface auth {
    id: string;
    created: Date;
    updated: Date;
    name: string;
    suspended: false;
    superuser: false;
    workspaceId: string;
}