// To parse this data:
//
//   import { Convert, HightLlightsJSONData } from "./file";
//
//   const hightLlightsJSONData = Convert.toHightLlightsJSONData(json);

export interface UserHightLightsJSONData {
  data: Data;
  status: string;
  message: null;
}

export interface Data {
  highlights: Highlight[];
  owner: Owner;
}

export interface Highlight {
  id: string;
  title: string;
  cover_media: CoverMedia;
}

export interface CoverMedia {
  cropped_image_version: CroppedImageVersion;
}

export interface CroppedImageVersion {
  url: string;
}

export interface Owner {
  id: string;
  profile_pic_url: string;
  username: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHightLightsJSONData(json: string): UserHightLightsJSONData {
    return JSON.parse(json);
  }

  public static hightLightsJSONDataToJson(value: UserHightLightsJSONData): string {
    return JSON.stringify(value);
  }
}
