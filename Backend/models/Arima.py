from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

def Arima_Model(data, number_test, number_predict):
    # Split data
    number_train = len(data) - number_test
    data_train, data_test = data[:number_train], data[number_train:]
    # Definition of the model using train data
    model = ARIMA(data_train, 
                  exog=None, 
                  order=(0, 0, 0), 
                  seasonal_order=(0, 0, 0, 0), 
                  trend=None, 
                  enforce_stationarity=True, 
                  enforce_invertibility=True, 
                  concentrate_scale=False, 
                  trend_offset=1, dates=None, 
                  freq=None, 
                  missing='none', 
                  validate_specification=True)
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
                  exog=None, 
                  order=(0, 0, 0), 
                  seasonal_order=(0, 0, 0, 0), 
                  trend=None, 
                  enforce_stationarity=True, 
                  enforce_invertibility=True, 
                  concentrate_scale=False, 
                  trend_offset=1, dates=None, 
                  freq=None, 
                  missing='none', 
                  validate_specification=True)
    # Fitting the model
    fitted_model_full = model_full.fit()
    # Predicting all data
    pred_all = fitted_model_full.predict(start=0, end=len(data)-1)
    # Error metrics for all
    mae_all = mean_absolute_error(data, pred_all)
    rmse_all = np.sqrt(mean_squared_error(data, pred_all))
    mape_all = np.mean(np.abs((data - pred_all) / data)) * 100

    # Predicting next data
    pred_next = fitted_model.forecast(steps=number_predict)[0]

    return {
        'prediction_test': pred_test,
        'prediction_all': pred_all,
        'prediction_next': pred_next,
        'errors_train_model': {
            'MAE': mae_test,
            'RMSE': rmse_test,
            'MAPE': mape_test
        },
        'errors_full_model': {
            'MAE': mae_all,
            'RMSE': rmse_all,
            'MAPE': mape_all
        }
    }