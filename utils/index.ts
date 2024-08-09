export class HttpError extends Error {
    constructor(public response: Response) {
        super(`HTTP error ${response.status}`)
    }
}

export async function myFetch<ResponseType = {}>(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options)

    if(!response.ok) {
        throw new HttpError(response)
    }

    return (await response.json()) as ResponseType
}