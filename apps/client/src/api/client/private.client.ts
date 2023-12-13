const baseURL = "http://localhost:9001";

interface APIError {
  messages: string[];
  statusCode?: number;
}

interface MakeRequestResponse<T> {
  data?: T;
  error?: APIError;
}

const privateFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<MakeRequestResponse<T>> => {
  // Ensure options.headers is an object
  options.headers = options.headers || {};

  // Add the necessary headers, including Content-Type
  (options.headers as Record<string, string>)["Content-Type"] =
    "application/json";

  // Check if an access token is stored in localStorage
  const accessToken = localStorage.getItem("actkn");
  // If an access token is found, add it to the Authorization header
  if (accessToken) {
    (options.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${baseURL}/${endpoint}`, options);
    const responseJSON = await response.json();

    if (!response.ok) {
      // Handle error responses here
      return {
        error: responseJSON as APIError,
      };
    }

    return {
      data: responseJSON,
    };
  } catch (e) {
    const error =
      e instanceof Error
        ? {
            messages: [
              import.meta.env.MODE === "development"
                ? e.message
                : "Unknown error",
            ],
          }
        : {
            messages: ["Unknown error"],
          };

    return {
      error,
    };
  }
};

export default privateFetch;
