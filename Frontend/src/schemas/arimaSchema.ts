import * as yup from 'yup'

export const arimaSchema = yup.object().shape({
  data: yup.array().of(yup.number()).required('*'),
  params: yup.object().shape({
    exog: yup.mixed().nullable(),
    order: yup.array().of(yup.number()).length(3),
    trend: yup.string().oneOf(['n', 'c', 't', 'ct']).nullable(),
    enforce_stationarity: yup.boolean(),
    enforce_invertibility: yup.boolean(),
    concentrate_scale: yup.boolean(),
    trend_offset: yup.number(),
    dates: yup.mixed().nullable(),
    freq: yup.string().nullable(),
    validate_specification: yup.boolean()
  }),
  number_test: yup.number().required('*'),
  number_predict: yup.number().required('*')
})