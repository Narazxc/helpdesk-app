export interface Role {
  id: number;
  roleCode: string;
  roleName: string;
  description: string;
  permissionNames: string[];
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string | null;
  updatedBy: string | null;
}

// {
// "id": 1,
// "roleCode": "ROL_20251003_1b779b4e",
// "roleName": "Admin",
// "description": "testing.",
// "permissionNames": [ ],
// "createdAt": "2025-10-03T10:53:09.03118",
// "updatedAt": "2025-10-03T10:53:09.03118",
// "status": true,
// "createdBy": null,
// "updatedBy": null
// },

export interface CreateRole {
  roleName: string;
  description: string;
  permissionCodes: string[];
}
