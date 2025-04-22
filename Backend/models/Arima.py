from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

def Arima_Model(data, params, number_test, number_predict):
    # Split data
    number_train = len(data) - number_test
    data_train, data_test = data[:number_train], data[number_train:]
    # Definition of the model using train data
    model = ARIMA(data_train, 
                  exog = params.get('exog', None),
                  order = params.get('order', (0, 0, 0)),
                  trend = params.get('trend', None),
                  enforce_stationarity = params.get('enforce_stationarity', True),
                  enforce_invertibility = params.get('enforce_invertibility', True),
                  concentrate_scale = params.get('concentrate_scale', False),
                  trend_offset = params.get('trend_offset', 1),
                  dates = params.get('dates', None),
                  freq = params.get('freq', None),
                  validate_specification = params.get('validate_specification', True),
                  )
    # Fitting the model
    fitted_model = model.fit()
    if(number_test >= 1):
        # Predicting test data
        pred_test = fitted_model.forecast(steps=len(data_test))
        # Error metrics 
        mae_test = mean_absolute_error(data_test, pred_test)
        rmse_test = np.sqrt(mean_squared_error(data_test, pred_test))
        mape_test = np.mean(np.abs((data_test - pred_test) / data_test)) * 100
    # Definition of the model using all data
    model_full = ARIMA(data, 
                  exog = params.get('exog', None),
                  order = params.get('order', [0, 0, 0]),
                  trend = params.get('trend', None),
                  enforce_stationarity = params.get('enforce_stationarity', True),
                  enforce_invertibility = params.get('enforce_invertibility', True),
                  concentrate_scale = params.get('concentrate_scale', False),
                  trend_offset = params.get('trend_offset', 1),
                  dates = params.get('dates', None),
                  freq = params.get('freq', None),
                  validate_specification = params.get('validate_specification', True),
                  )
    # Fitting the model
    fitted_model_full = model_full.fit()
    # Predicting all data
    pred_all = fitted_model_full.predict(start=0, end=len(data)-1)
    # Error metrics for all
    mae_all = mean_absolute_error(data, pred_all)
    rmse_all = np.sqrt(mean_squared_error(data, pred_all))
    mape_all = np.mean(np.abs((data - pred_all) / data)) * 100

    # Predicting next data
    pred_next = fitted_model.forecast(steps=number_predict)

    return {
        'prediction_test': pred_test.tolist(),
        'prediction_all': pred_all.tolist(),
        'prediction_next': pred_next.tolist(),
        'errors_train_model': {
            'MAE': float(mae_test),
            'RMSE': float(rmse_test),
            'MAPE': float(mape_test)
        },
        'errors_full_model': {
            'MAE': float(mae_all),
            'RMSE': float(rmse_all),
            'MAPE': float(mape_all)
        }
    }