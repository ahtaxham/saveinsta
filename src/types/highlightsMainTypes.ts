// To parse this data:
//
//   import { Convert, HightLightsMainJSONData } from "./file";
//
//   const hightLightsMainJSONData = Convert.toHightLightsMainJSONData(json);

export interface HightLightsMainJSONData {
  data: Data;
  status: string;
  message: null;
}

export interface Data {
  title: string;
  media_count: number;
  cover_media: string;
  created_at: number;
  items: Item[];
  owner: Owner;
}

export interface Item {
  image_hd: string;
  video_hd: string;
}

export interface Owner {
  pk: number;
  pk_id: string;
  username: string;
  full_name: string;
  is_private: boolean;
  interop_messaging_user_fbid: number;
  is_verified: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHightLightsMainJSONData(json: string): HightLightsMainJSONData {
    return JSON.parse(json);
  }

  public static hightLightsMainJSONDataToJson(value: HightLightsMainJSONData): string {
    return JSON.stringify(value);
  }
}
