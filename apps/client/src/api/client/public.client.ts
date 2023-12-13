const baseURL = "http://localhost:9001";

interface APIError {
  messages: string[];
  statusCode?: number;
}

interface MakeRequestResponse<T> {
  data?: T;
  error?: APIError;
}

const publicFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<MakeRequestResponse<T>> => {
  // Ensure options.headers is an object
  options.headers = options.headers || {};

  // Add the necessary headers, including Authorization with Bearer token
  (options.headers as Record<string, string>)["Content-Type"] =
    "application/json";

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

export default publicFetch;
