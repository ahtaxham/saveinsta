// To parse this data:
//
//   import { Convert, UserPostJSONData } from "./file";
//
//   const userPostJSONData = Convert.toUserPostJSONData(json);

export interface UserPostJSONData {
  data: Data;
  status: string;
  message: null;
}

export interface Data {
  total_media_count: number;
  items: Item[];
  page_info: PageInfo;
}

export interface Item {
  node: ItemNode;
}

export interface ItemNode {
  __typename: Typename;
  id: string;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  media_overlay_info: null;
  sensitivity_friction_info: null;
  dimensions: Dimensions;
  display_url: string;
  display_resources: Resource[];
  is_video: boolean;
  media_preview: null | string;
  tracking_token: string;
  edge_media_to_tagged_user: PurpleEdgeMediaToTaggedUser;
  accessibility_caption?: null;
  edge_media_to_caption: EdgeMediaToCaption;
  shortcode: string;
  edge_media_to_comment: EdgeMediaToComment;
  edge_media_to_sponsor_user: EdgeMediaToSponsorUser;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewLike;
  owner: Owner;
  location: Location | null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  thumbnail_src: string;
  thumbnail_resources: Resource[];
  edge_sidecar_to_children?: EdgeSidecarToChildren;
  dash_info?: DashInfo;
  has_audio?: boolean;
  video_url?: string;
  video_view_count?: number;
  product_type?: string;
}

export enum Typename {
  GraphImage = 'GraphImage',
  GraphSidecar = 'GraphSidecar',
  GraphVideo = 'GraphVideo',
}

export interface DashInfo {
  is_dash_eligible: boolean;
  video_dash_manifest: null;
  number_of_qualities: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Resource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeMediaPreviewLike {
  count: number;
  edges: any[];
}

export interface EdgeMediaToCaption {
  edges: EdgeMediaToCaptionEdge[];
}

export interface EdgeMediaToCaptionEdge {
  node: PurpleNode;
}

export interface PurpleNode {
  text: string;
}

export interface EdgeMediaToComment {
  count: number;
  page_info: PageInfo;
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor: string;
}

export interface EdgeMediaToSponsorUser {
  edges: any[];
}

export interface PurpleEdgeMediaToTaggedUser {
  edges: EdgeMediaToTaggedUserEdge[];
}

export interface EdgeMediaToTaggedUserEdge {
  node: FluffyNode;
}

export interface FluffyNode {
  user: User;
  x: number;
  y: number;
}

export interface User {
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}

export interface EdgeSidecarToChildren {
  edges: EdgeSidecarToChildrenEdge[];
}

export interface EdgeSidecarToChildrenEdge {
  node: TentacledNode;
}

export interface TentacledNode {
  __typename: Typename;
  id: string;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  media_overlay_info: null;
  sensitivity_friction_info: null;
  dimensions: Dimensions;
  display_url: string;
  display_resources: Resource[];
  is_video: boolean;
  media_preview: null | string;
  tracking_token: string;
  edge_media_to_tagged_user: FluffyEdgeMediaToTaggedUser;
  accessibility_caption?: null;
  dash_info?: DashInfo;
  has_audio?: boolean;
  video_url?: string;
  video_view_count?: number;
}

export interface FluffyEdgeMediaToTaggedUser {
  edges: EdgeMediaToTaggedUserEdge[];
}

export interface Location {
  id: string;
  has_public_page: boolean;
  name: string;
  slug: string;
}

export interface Owner {
  id: string;
  username: Username;
}

export enum Username {
  Instagram = 'instagram',
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUserPostJSONData(json: string): UserPostJSONData {
    return JSON.parse(json);
  }

  public static userPostJSONDataToJson(value: UserPostJSONData): string {
    return JSON.stringify(value);
  }
}
