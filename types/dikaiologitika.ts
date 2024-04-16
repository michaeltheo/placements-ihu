export type DikaiologitikaFile = {
  type: string;
  id: number;
  user_id: number;
  file_path: string;
  date: string;
};

type User = {
  first_name: string;
  last_name: string;
  AM: string;
  id: number;
  role: string;
};

export type DikaiologitikaFilesResponse = {
  data: {
    files: DikaiologitikaFile[];
    user: User;
  };
  message: {
    detail: string;
  };
};
