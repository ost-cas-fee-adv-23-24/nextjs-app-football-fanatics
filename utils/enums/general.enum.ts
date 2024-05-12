export enum EMediaTypes {
  IMAGE = 'image/jpeg',
  PNG = 'image/png',
}

export enum EEnvironments {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum EApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EEndpointsBackend {
  POSTS = 'posts',
  USER = 'users',
  USERS = 'users/avatar',
  USER_FOLLOWERS = 'users/*identifier*/followers',
  USER_FOLLOWEES = 'users/*identifier*/followees',
  USER_UPDATE_AVATAR = 'users/avatar',
  LIKE_POST = 'posts/*identifier*/likes',
  REPLY_POST = 'posts/*identifier*/replies',
}

export enum EUserCardGroup {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers',
}

export enum EResponseMumbleStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}
