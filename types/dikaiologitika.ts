export interface DikaiologitikaFile {
  type: string;
  id: number;
  user_id: number;
  file_path: string;
  file_name: string;
  date: string;
  description: string;
}

export interface User {
  first_name: string;
  last_name: string;
  AM: string;
  id: number;
  role: string;
}

export interface DikaiologitikaFilesResponse {
  data: {
    files: DikaiologitikaFile[];
    user: User;
  };
  message: {
    detail: string;
  };
}

export interface Dikaiologitika {
  type: string;
  description: string;
}

export interface UploadResponseMessage {
  detail: string;
}

export interface UpdateDeleteResponse {
  detail?: string;
  error?: string;
}

export interface UploadResponse {
  data?: DikaiologitikaFile;
  error?: string;
  message?: UploadResponseMessage;
}

export interface DikaiologitikaTypesResponse {
  data: Dikaiologitika[];
  message: {
    detail: string;
  };
}
