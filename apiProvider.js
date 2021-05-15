import Router from "next/router";
const RETRY_COUNT = 5;

// console.log(process.env.BASE_URL);

async function api(endpoint, method, data, optHeaders) {
  const BASE_URL = process.env.BASE_URL + "/api";
  const router = Router;
  let token;

  if (typeof window !== "undefined" && window.localStorage)
    token = await localStorage.getItem("accesstoken");

  const requestUrl = `${BASE_URL}/${endpoint}`;

  console.log(requestUrl);
  const requestConfig = {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  };

  if (token) {
    // console.log("token: ", token);
    requestConfig.headers = { ...requestConfig.headers, Authorization: token };
  }

  // console.log("token00: ", token);

  try {
    const response = await fetch(requestUrl, requestConfig);
    const results = await response.json();
    if (response.status !== 200 || response.status !== 201) {
      if (
        response.status === 401 &&
        (results.message === "auth token invalid" ||
          results.message === "token not received")
      )
        return router.push({
          href: "/login",
        });

      if (response.status === 401 && results.message === "token expired") {
        // console.log("results: ", results);
        const originalRequest = { endpoint, method, data, optHeaders };

        let refreshToken;
        let tokenReqheaders;
        if (typeof window !== "undefined" && window.localStorage)
          refreshToken = await localStorage.getItem("refreshtoken");

        // console.log("refreshtoken: ", refreshToken);
        if (refreshToken) tokenReqheaders = { Authorization: refreshToken };

        const tokenResponse = await fetch(`${BASE_URL}/users/refresh`, {
          method: "POST",
          headers: tokenReqheaders,
        });
        const tokenResults = await tokenResponse.json();
        // console.log("tokenResults: ", tokenResults);
        if (tokenResults && tokenResponse.status === 200) {
          // set tokens in localStorage
          await localStorage.setItem(
            "accesstoken",
            tokenResults.accessToken.toString()
          );
          await localStorage.setItem(
            "refreshtoken",
            tokenResults.refreshToken.toString()
          );

          // repeat the original request with this token
          const originalReqResults = await api(
            originalRequest.endpoint,
            originalRequest.method,
            originalRequest.data
          );

          return originalReqResults;
        }

        return router.push({
          href: "/login",
        });
      }
    }

    return results;
  } catch (err) {
    // console.log("error on request: ");
  }
}

export default api;
