import { logError } from './error.logger.js';

// function safeJsonValue(value) {
//   if (Array.isArray(value)) {
//     return value.map(safeJsonValue)
//   }
//   if (value && typeof value === 'object') {
//     return Object.fromEntries(
//       Object.entries(value).map(([k, v]) => [k, safeJsonValue(v)])
//     )
//   }
//   if (typeof value === 'bigint') {
//     return value.toString()
//   }
//   return value
// }

// function safeJsonValue(value) {
//   if (Array.isArray(value)) {
//     return value.map(safeJsonValue)
//   }
//   if (value && typeof value === 'object') {
//     return Object.fromEntries(
//       Object.entries(value).map(([k, v]) => [k, safeJsonValue(v)])
//     )
//   }
//   if (typeof value === 'bigint') {
//     return value.toString()
//   }
//   return value
// }

export const responseHandler = (req, res, next) => {
  res.success = (success) => res.json({ resultType: 'SUCCESS', error: null, success });

  res.error = ({ errorCode = 'UNHANDLED_ERROR', reason = null, data = null }) =>
    res.json({
      resultType: 'FAIL',
      error: { errorCode, reason, data },
      success: null,
    });

  next();
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    console.error('이미 응답이 전송된 요청에 대해 에러 핸들러가 호출되었습니다.');
    return next(err);
  }
  logError(err);
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || 'UNHANDLED_ERROR',
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
};

export const setNoCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
};