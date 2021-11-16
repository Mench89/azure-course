import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface ImageInfo {
    id: string
    uri: string
}

export const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    inputImageDocument: ImageInfo
): Promise<void> {
    context.log("HTTP trigger get image from id.")

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: inputImageDocument,
    }
}
