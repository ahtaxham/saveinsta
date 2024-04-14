export interface StoriesJSONData {
  userData: UserData;
  storyData: StoryData;
}

export interface StoryData {
  data: StoryDataData;
  status: string;
  message: null;
}

export interface StoryDataData {
  stories: Story[];
  owner: Owner;
}

export interface Owner {
  username: string;
  full_name: null;
  is_private: null;
  strong_id__: null;
  is_verified: null;
  profile_pic_url: string;
  id: null;
}

export interface Story {
  image_versions2: ImageVersions2;
  original_height: number;
  original_width: number;
  pk: string;
  taken_at: number;
  video_versions?: VideoVersion[];
  has_audio?: boolean;
}

export interface ImageVersions2 {
  candidates: Candidate[];
}

export interface Candidate {
  url: string;
  width: number;
  height: number;
}

export interface VideoVersion {
  url: string;
  width: number;
  height: number;
  type: number;
}

export interface UserData {
  data: UserDataData;
  status: string;
  message: null;
}

export interface UserDataData {
  id: string;
  username: string;
  full_name: string;
  followers: number;
  followings: number;
  biography: string;
  external_url: string;
  bio_links: BioLink[];
  is_business_account: boolean;
  is_professional_account: boolean;
  is_private: boolean;
  is_verified: boolean;
  is_verified_by_mv4b: boolean;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  pronouns: any[];
  post_count: number;
  eimu_id: string;
}

export interface BioLink {
  title: string;
  lynx_url: string;
  url: string;
  link_type: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toJSONData(json: string): StoriesJSONData {
    return JSON.parse(json);
  }

  public static jSONDataToJson(value: StoriesJSONData): string {
    return JSON.stringify(value);
  }
}
