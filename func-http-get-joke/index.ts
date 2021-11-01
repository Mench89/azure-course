import { AzureFunction, Context, HttpRequest } from "@azure/functions"

export const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    context.log("HTTP trigger function processed a request.")

    const joke = {
        text: "Why did the programmer quit his job? Because he didn't get arrays.",
    }
    const jokeResponse = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: joke,
    }
    context.res = jokeResponse
}
