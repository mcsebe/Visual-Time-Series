export interface ArimaRequest {
    data: number[];
    params: ArimaParams;
    number_test: number;
    number_predict: number;
  }
  

  interface ArimaParams {
    exog: number[] | number[][] | null;
    order: [number, number, number];
    trend:'n' | 'c' | 't' | 'ct' | null;
    enforce_stationarity: boolean;
    enforce_invertibility: boolean;
    concentrate_scale: boolean;
    trend_offset: number;
    dates: string[] | number[] |Date[] | null;
    freq: string | null;
    validate_specification: boolean;
  }

export interface ArimaData{
  prediction_test: number[],
  prediction_all: number[],
  prediction_next: number[] | number,
  errors_train_model: {
      MAE: number;
      RMSE: number;
      MAPE: number;
  },
  errors_full_model: {
      MAE: number;
      RMSE: number;
      MAPE: number;
  }
}
