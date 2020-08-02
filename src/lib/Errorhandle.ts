interface ErroHandleOption {
  message: string;
  status: number;
}

class ErroHandle extends Error {
  private status: number;

  constructor(options: ErroHandleOption) {
    super(options.message);
    this.name = 'ErroHandleLib';
    this.status = options.status || 500;
  }
}

export default ErroHandle;
