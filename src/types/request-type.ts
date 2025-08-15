export interface RequestType {
  id: number;
  requestTypeCode: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface UpdateRequestType {
  id: string;
  newRequestTypeData: CreateRequestType;
}

// Add this interface to your file
export interface CreateRequestType {
  // code: string;
  name: string;
  description: string;
  // status: boolean;
  // createdBy?: string | null;
}
