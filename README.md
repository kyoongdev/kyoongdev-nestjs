# Nestjs Swagger & Utils Helper

본 라이브러리는 **@nestjs/swagger**의 사용 간소화 및 기타 유틸성 기능을 제공하는 라이브러리입니다.

프로젝트 세팅 시 필요한 기능을 제공합니다.

## Swagger

** `스웨거 세팅방법` **

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
