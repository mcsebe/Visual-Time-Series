import { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { arimaSchema } from "../../../schemas/arimaSchema";
import useArima from "../../../hook/useArima"
import { ArimaRequest } from "../../../types/arima"


const initialFormValues = {
  data: [1,2,3,4,5,6,7,8,9,10],
  params: {
    exog: null,
    order: [0, 0, 0],
    trend: null,
    enforce_stationarity: true,
    enforce_invertibility: true,
    concentrate_scale: false,
    trend_offset: 1,
    dates: null,
    freq: null,
    validate_specification: true
  },
  number_test: 2,
  number_predict: 1
};

export function PredictionParams() {

  const { sendArima, response, loading, error } = useArima()


  useEffect(() => {
    if (response) {
      console.log('ARIMA Response:', response);
    }
  }, [response]);

  const submitHandler = async ( values: ArimaRequest) => {
    await sendArima(values)
  };

  return (
    <div>
      <h2 className="form__title">Formik Yup Validation Form</h2>
      <Formik
        initialValues={initialFormValues}
        onSubmit={submitHandler}
        validationSchema={arimaSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="form">
          <div className="form__group">
            <label htmlFor="params.order" className="form__label">
            Order (p,d,q)
            </label>
            <Field
              type="params.order"
              id="params.order"
              name="params.order"
              className="form__input"
            />
            <ErrorMessage name="params.order" className="error" component="small" />
          </div>

          <div className="form__group">
            <label className="block text-sm font-medium text-gray-700">Trend</label>
            <Field as="select" name="params.trend" id="arams.trend" className="form__select">
              <option value="">None</option>
              <option value="c">Constant</option>
              <option value="t">Linear</option>
              <option value="ct">Constant and Linear</option>
            </Field>{" "}
            <ErrorMessage name="arams.trend" className="error" component="small" />
          </div>

          <div className="form__group">
            <label htmlFor="number_test" className="form__label"> Number of Test Samples </label>
            <Field
              type="number"
              id="number_test"
              name="number_test"
              className="form__input"
            />
            <ErrorMessage name="number_test" className="error" component="small" />
          </div>

          <div className="form__group">
            <label htmlFor="number_predict" className="form__label">Number of Predictions </label>
            <Field
              type="number"
              id="number_predict"
              name="number_predict"
              className="form__input"
            />
            <ErrorMessage name="number_predict" className="error" component="small" />
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};