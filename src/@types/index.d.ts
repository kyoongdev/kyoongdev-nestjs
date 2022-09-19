export declare global {
  interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }

  namespace Express {
    interface Request {
      user: any;
      skip: number | undefined;
      take: number | undefined;
    }
  }
}
