export interface Permission {
  id: number;
  permissionName: string;
  permissionCode: string;
  //   permissionType: string;
  permissionType: "T" | "U" | "W";
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string | null;
  updatedBy: string | null;
}

// {
// "id": 1,
// "permissionName": "Create Ticket",
// "permissionCode": "PER_20250910_7d280d03",
// "permissionType": "T",
// "createdAt": "2025-09-10T09:11:40",
// "updatedAt": "2025-09-10T09:11:40",
// "status": true,
// "createdBy": "Sreymom",
// "updatedBy": null
// },

// {
// "id": 2,
// "permissionName": "Edit Ticket",
// "permissionCode": "PER_20250910_7d2915d4",
// "permissionType": "T",
// "createdAt": "2025-09-10T09:11:40",
// "updatedAt": "2025-09-10T09:11:40",
// "status": true,
// "createdBy": "Sreymom",
// "updatedBy": null
// },
