export namespace Kakao {
  export interface User {
    id: string;
    email?: string;
    nickname?: string;
    profileImage?: string;
  }
  export interface GetUserWithToken {
    status: number;
    message: string;
    data?: { token: string; user: User };
  }
  interface Profile {
    nickname?: string;
    thumbnail_image_url?: string;
    profile_image_url?: string;
    is_default_image?: boolean;
  }

  interface Account {
    profile?: Profile;
    name?: string;
    email?: string;
    birthyear?: string;
    birthday?: string;
    gender?: 'female' | 'male';
    phone_number?: string;
    [key: string]: any;
  }
  export interface GetUser {
    id: string;
    properties: Pick<profile, 'nickname'> & {
      profile_image: string;
      thumbnail_image: string;
    };
    kakaoAccount: account;
  }

  export interface GetRestCallback {
    token: string;
    user: TgetUser;
  }
}

export namespace Google {
  export interface User {
    id: string;
    email?: string;
    nickname?: string;
    profileImage?: string;
  }

  export interface GetRestCallback {
    token: string;
    user: User;
  }
}

export namespace Naver {
  export interface User {
    id: string;
    email?: string;
    gender?: string;
    age?: string;
    phoneNumber?: string;
  }

  export interface Token {
    token: string;
    tokenType: string;
  }

  export interface GetRestCallback extends Token {
    user: User;
  }
}

export namespace Apple {
  export interface User {
    id: string;
    email?: string;
  }
}
