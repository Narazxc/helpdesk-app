export interface Ticket {
  title: string;
  description: string;
  requestTypeCode: string;
  categoryTypeCode: string;
  assetTypeCode: string;
  priority: string;
  attachments: string[];
}

export interface CreateTicket {
  title: string;
  description: string;
  requestTypeCode: string;
  categoryTypeCode: string;
  assetTypeCode: string;
  priority: string;
  attachments: string[];
}
