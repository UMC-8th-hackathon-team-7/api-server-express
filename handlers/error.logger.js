export const logError = (err) => {
  // console.error(`
  //   ===== ERROR LOG =====
  //   NAME: ${err.name}
  //   REASON: ${JSON.stringify(err.reason, null, 2)}
  //   MESSAGE: ${JSON.stringify(err.message, null, 2)}
  //   STACK: ${err.stack}
  //   =====================
  // `);
  console.error(err);
  const errorDetails = Object.getOwnPropertyNames(err).reduce((acc, key) => {
    acc[key] = err[key];
    return acc;
  }, {});
  console.error("통합 에러 로그", {
    action: "handler:logError",
    errorDetails,
  });
};
