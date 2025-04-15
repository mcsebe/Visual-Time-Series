export interface ArimaRequest {
    data: number[];
    params: Params;
    number_test: number;
    number_predict: number;
  }
  

  interface Params {
    exog: number[] | number[][] | null;
    order: [number, number, number];
    trend:'n' | 'c' | 't' | 'ct' | null;
    enforce_stationarity: boolean;
    enforce_invertibility: boolean;
    concentrate_scale: boolean;
    trend_offset: number;
    dates: string[] | Date[] | null;
    freq: string | null;
    validate_specification: boolean;
  }