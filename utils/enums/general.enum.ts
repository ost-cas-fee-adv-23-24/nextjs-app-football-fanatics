export enum EMediaTypes {
  IMAGE = 'image/jpeg',
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
  USER_UPDATE_AVATAR = 'users/avatar',
  LIKE_POST = 'posts/*identifier*/likes',
  REPLY_POST = 'posts/*identifier*/replies',
}
