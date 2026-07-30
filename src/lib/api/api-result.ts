export type ApiSuccess<TData> = {
	success: true
	data: TData
}

export type ApiFailure<TError> = {
	success: false
	error: TError
}

export type ApiResultType<TData, TError> = ApiSuccess<TData> | ApiFailure<TError>

export class ApiResult {
	static success<TData>(data: TData): ApiSuccess<TData> {
		return { success: true, data }
	}

	static failure<TError>(error: TError): ApiFailure<TError> {
		return { success: false, error }
	}
}

export class TypeGuard {
	static isSuccess<TData, TError>(
		result: ApiResultType<TData, TError>,
	): result is ApiSuccess<TData> {
		return result.success
	}

	static isFailure<TData, TError>(
		result: ApiResultType<TData, TError>,
	): result is ApiFailure<TError> {
		return !result.success
	}
}
