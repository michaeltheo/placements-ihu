import { User } from "@/types/user";
import { Message, SubmissionTime } from "@/types";
export interface DikaiologitikaFile {
  type: string;
  id: number;
  user_id: number;
  file_path: string;
  file_name: string;
  date: string;
  description: string;
  submission_time: string;
}

export interface DikaiologitikaFilesResponse {
  data: {
    files: DikaiologitikaFile[];
    user: User;
  };
  message: Message;
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
  message?: Message;
}

export type DikaiologitikaType = {
  type: string;
  description: string;
  submission_time: SubmissionTime;
};

export interface InternshipProgram {
  [key: string]: DikaiologitikaType[];
}

export interface State {
  dikaiologitikaTypes: InternshipProgram;
}
