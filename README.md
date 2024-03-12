# Nestjs Swagger & Utils Helper

본 라이브러리는 **@nestjs/swagger**의 사용 간소화 및 기타 유틸성 기능을 제공하는 라이브러리입니다.

프로젝트 세팅 시 필요한 기능을 제공합니다.

오류 발생 시 9898junjun2@gmail.com으로 연락주시면 감사하겠습니다.

## Swagger

### 스웨거 세팅방법

```typescript
const swaggerConfig = new DocumentBuilder()
  .setTitle('제목')
  .setDescription('설명')
  .setVersion('1.0.0')
  .addServer('서버 URL')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    },
    'access-token'
  )
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig, {});

SwaggerModule.setup('api-docs', app, document);
```

**`@RequestApi(swaggerOptions : SwaggerOptions)`**

스웨거 Request 옵션

- `SwaggerOptions`
  - summary?: ApiOperationOptions;
  - headers?: ApiHeaderOptions | ApiHeaderOptions[];
  - params?: ApiParamOptions | ApiParamOptions[];
  - query?: ApiQueryOptions | ApiQueryOptions[];
  - body?: ApiBodyOptions;

**`@ResponseApi(options: ApiResponseOptions & { isPaging?: boolean },code = 200 as HttpStatus)`**

스웨거 Response 옵션

- `ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost`

- `ApiResponseMetadata`

  - status?: number | 'default';
  - type?: Type<unknown> | Function | [Function] | string;
  - isArray?: boolean;
  - description?: string;

- `ApiResponseSchemaHost`
  - schema: SchemaObject & Partial<ReferenceObject>;
  - status?: number;
  - description?: string;

**`@ApiFile(fieldName = "file")`**

스웨거 및 인터셉터 파일 업로드

**`@Auth(guard: Function[], name = 'access-token')`**

스웨거 및 UseGuards 가드 사용

**`@ApiFile(fieldName = "file")`**

Multi-Form 데이터 필요 시 사용

**`@Property({ apiProperty = {}, validation, overrideExisting, typeOptions = {} }: PropertyProps)`**

DTO 스웨거 명세 및 Validation (class-transformer, class-validation)

- `Property`
  - apiProperty?: ApiPropertyOptions;
  - validation?: ValidationOptions;
  - overrideExisting?: boolean;
  - typeOptions?: TypeOptions;

## 페이징 관련

### Request Swagger 용

```ts
export class PagingDTO {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  public getSkipTake(): SkipTake {
    const take = Number(this.limit) || 20;
    const skip = (Number(this.page) - 1) * take;

    return { skip, take };
  }

  public getSqlPaging(): PagingDTO {
    return {
      ...this,
      page: (this.page ? this.page - 1 : 1) * (this.limit || 1),
    };
  }
}
```

### Response 데이터 전처리 용

```ts
export class PaginationDTO<T extends object> {
  @Property({ apiProperty: { isArray: true } })
  data: T[];

  @Property({ apiProperty: { type: PagingMetaDTO } })
  paging: PagingMetaDTO;

  constructor(data: T[], { paging, count }: PagingMetaDTOInterface) {
    this.data = data;
    this.paging = new PagingMetaDTO({ paging, count });
  }
}
```

### 미들웨어 적용

```ts
app.use(PaginationMiddleware);
```

### Paging Params Decorator

```ts
async function example(@Paging() paging: PagingDTO) {}
```

---

## Utils

### Exception

### CommonException

```typescript
export class CommonException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
```

표준화된 에러 response 필요 시 사용

ex)

```ts
const AUTH_ERROR = {
  WRONG_ACCESS_TOKEN: '잘못된 access 토큰입니다.',
};

export const AUTH_ERROR_CODE: ErrorCode<typeof AUTH_ERROR> = {
  WRONG_ACCESS_TOKEN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ACCESS_TOKEN,
  },
};

throw CommonException(AUTH_ERROR_CODE.WRONG_ACCESS_TOKEN);
```

### HttpExceptionFilter

Http 관련 Exception을 처리할 수 있는 Filter

```ts
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errRes = exception['getResponse'] ? exception.getResponse() : null;
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      errRes?.message && Array.isArray(errRes.message) && errRes.message.length > 0
        ? errRes.message
        : exception.message || 'Internal Server Error';

    console.error(exception.stack || message);

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
    request.destroy();
  }
}
```

### Firebase

파이어베이스 기반 푸시 알림 설정

### FirebaseMessaging

```ts
@Injectable()
export class FirebaseMessaging {
  private app: admin.app.App;

  constructor(private readonly configService: ConfigService) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(this.configService.get('FIRE_BASE_ACCOUNT') as string),
    });
  }

  async sendMessage({ token, notification }: SendMessageProps): Promise<SendMessageResponse> {
    try {
      await this.app.messaging().send({
        token,
        notification,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendMessages(messages: SendMessagesProps): Promise<SendMessagesResponse> {
    const result: SendMessagesResponse = { success: [], failure: [] };
    for await (const message of messages) {
      const messageResult = await this.sendMessage({
        token: message.token,
        notification: message.notification as Notification,
      });

      if (messageResult) {
        result.success.push(message);
      } else {
        result.failure.push(message);
      }
    }

    return result;
  }
}
```

env에 "FIRE_BASE_ACCOUNT"를 통해 인증 정보가 있는 파일의 경로를 입력해주세요.

### JWT

jwt 토큰을 생성, 검증할 수 있습니다.

### JwtProvider

```ts
@Injectable()
export class JwtProvider {
  private readonly accessTokenExpiresIn: string = '2h' as const;
  private readonly refreshTokenExpiresIn: string = '14d' as const;

  constructor(private readonly configService: ConfigService) {
    if (configService.get('ACCESS_TOKEN_EXPIRES_IN')) {
      this.accessTokenExpiresIn = configService.get('ACCESS_TOKEN_EXPIRES_IN') as string;
    }
    if (configService.get('REFRESH_TOKEN_EXPIRES_IN')) {
      this.accessTokenExpiresIn = configService.get('REFRESH_TOKEN_EXPIRES_IN') as string;
    }
  }

  signJwt<T extends object>(value: T, options?: SignOptions): string {
    try {
      if (typeof value !== 'string' && typeof value !== 'object' && !Buffer.isBuffer(value)) {
        throw { status: 400, message: 'BadRequest Payload' };
      }

      return jwt.sign(value, this.configService.get<string>('JWT_KEY') as string, options ?? {});
    } catch (error) {
      throw new JsonWebTokenError('sign Failed');
    }
  }

  verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any {
    try {
      return jwt.verify(token, this.configService.get<string>('JWT_KEY') as string, options ?? {}) as T;
    } catch (error) {
      throw new JsonWebTokenError('sign Failed');
    }
  }

  async createTokens<T extends object>(value: T, options?: SignOptions) {
    const key = nanoid();

    const accessToken = this.signJwt<T>({ ...value, key }, { ...options, expiresIn: this.accessTokenExpiresIn });
    const refreshToken = this.signJwt<T>({ ...value, key }, { ...options, expiresIn: this.refreshTokenExpiresIn });

    return { accessToken, refreshToken };
  }
}
```

env에 ACCESS_TOKEN_EXPIRES_IN 혹은 REFRESH_TOKEN_EXPIRES_IN을 설정 시 설정된 값으로 만료 기한이 설정됩니다.

## Location

네이버, 카카오, 구글 지도 기반 API를 사용할 수 있는 Module입니다.

- 각 서비스의 API 명세가 변경될 경우 작동하지 않을 수 있습니다.

### SocialLocationModule

```ts
@Module({
  providers: [SocialLocationService],
  exports: [SocialLocationService],
})
export class SocialLocationModule {
  static forRoot(config: LocationProps = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LOCATION_CONFIG,
        useValue: config,
      },
    ];
    return {
      module: SocialLocationModule,
      providers,
      exports: providers,
    };
  }
}
```

`LocatoinProps`

```ts
export interface NaverLocationConfig {
  clientId: string;
  clientSecret: string;
}

export interface LocationProps {
  kakaoRestKey?: string;
  googleRestKey?: string;
  naver?: NaverLocationConfig;
}
```

### SocialLocationService

`getNaverLocation(params: NaverGeocodeQuery,config?: NaverLocationConfig): Promise<NaverGeocodeResponse>`

네이버 좌표 기반 검색

`getKakaoLocationByAddress({address,analyze_type = 'similar',page = 1,limit = 20,kakaoRestKey,}: KakaoAddressProps): Promise<{ data: KakaoAddressResponse[]; count: number } | null>`

카카오 주소 기반 검색

`getKakaoLocationByKeyword({keyword,latitude,longitude,radius = 200,page = 1,limit = 20,kakaoRestKey,category_group_code,}: KakaoKeywordProps): Promise<{ data: Array<KakaoKeywordResponse>; count: KakaoMeta } | null>`

카카오 키워드 기반 검색

`getKakaoLocationByGeocode({latitude,longitude,page = 1,limit = 20,kakaoRestKey}: KakaoGeocodeProps): Promise<{ data: KakaoGeocodeResponse; count: number } | null> `

카카오 주소 기반 검색

`getGoogleLocationByGeocode({ googleRestKey, latitude, longitude }: GoogleGeocodeProps) `

구글 좌표 기반 검색

`getDistance({ target, current }: DistanceProps): number`

각 좌표 사이 직선 거리

## QrCode

QrCode를 생성할 수 있는 Provider입니다.

### QrCode

`createQRCodeData(props: QrCode): Promise<QRCodeData | undefined>`

QrCode 1개 생성

`createQrCodesData(props: Array<QrCode>): Promise<QrCodesResponse>`

QrCode 여러 개 생성

## Social

소셜 로그인 관련 통합 모듈입니다. (Naver, Kakao, Google, Apple 포함)

### SocialLoginModule

```ts
export interface NaverConfig {
  clientId: string;
  clientSecret: string | undefined;
  redirectUrl: string | undefined;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string | undefined;
  redirectUri: string | undefined;
}

export interface KakaoConfig {
  restKey: string;
  secretKey: string | undefined;
  redirectUrl: string | undefined;
  adminKey: string | undefined;
}

export interface SocialConfig {
  kakao?: KakaoConfig;
  google?: GoogleConfig;
  naver?: NaverConfig;
  apple?: AppleConfig;
}

export interface AppleConfig {
  appleConfig: AppleAuthConfig; // apple-auth의 config
  path: string;
}


SocialLoginModule.forRoot(config: SocialConfig = {})
```

### NaverLogin

`getRest(res: Response, code: string, redirectUrl?: string)`

redirectUrl로 redirect

`static async getUser(token: string): Promise<NaverUser | undefined>`

토큰을 통해 네이버 유저 검색

`getToken(code: string): Promise<NaverToken | undefined>`

로그인 성공 후 코드를 통해 토큰 생성

`getRestCallback(code: string): Promise<NaverGetRestCallback | undefined>`

로그인 성공 후 네이버 유저 정보 반황

### KakaoLogin

`getRest(res: Response, redirectUrl?: string)`

redirectUrl로 redirect

`static async getUser(token: string): Promise<KakaoGetUser | undefined>`

토큰을 통해 카카오 유저 검색

`getToken(code: string, redirectUrl?: string): Promise<string | undefined>`

로그인 성공 후 코드를 통해 토큰 생성

`getRestCallback(code: string): Promise<KakaoGetRestCallback | undefined>`

로그인 성공 후 카카오 유저 정보 반환

### GoogleLogin

`public getRest(res: Response, redirectUrl?: string)`

redirectUrl로 redirect

`getToken(code: string): Promise<string | undefined>`

로그인 성공 후 코드를 통해 토큰 생성

`static async getAppUser(token: string): Promise<GoogleUser | undefined>`

토큰을 통해 구글 유저 검색 (앱 사용 시)

`static async getWebUser(token: string)`

토큰을 통해 구글 유저 검색 (웹 사용 시)

`getRestCallback(code: string): Promise<GoogleGetRestCallback | undefined>`

로그인 성공 후 구글 유저 정보 반환

### Apple Login

애플 로그인은 HTTPS 설정이 완료되어야 사용 가능합니다.

`private setAppleAuth()`

애플 인증 정보 설정하기

`public getRest(res: Response)`

redirectUrl로 redirect (애플은 redirect url의 HTTP method가 POST이어야 합니다.)

`static async getUser(id_token: string): Promise<AppleUser | undefined>`

id_token을 통해 애플 유저 반환

`getRestCallback(code: string): Promise<AppleUser | undefined>`

로그인 성공 후 애플 유저 반환
