export type ApiSuccess<TData> = {
	success: true
	data: TData
}

export type ApiFailure<TError> = {
	success: false
	error: TError
}

export type ApiResult<TData, TError> = ApiSuccess<TData> | ApiFailure<TError>

export function success<TData>(data: TData): ApiSuccess<TData> {
	return { success: true, data }
}

export function failure<TError>(error: TError): ApiFailure<TError> {
	return { success: false, error }
}

export function isSuccess<TData, TError>(result: ApiResult<TData, TError>): result is ApiSuccess<TData> {
	return result.success
}

export function isFailure<TData, TError>(result: ApiResult<TData, TError>): result is ApiFailure<TError> {
	return !result.success
}
