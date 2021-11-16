import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface ImageInfo {
    id: string
    uri: string
}

export const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    context.log("HTTP trigger get all images.")

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: context.bindings.inputImageDocuments as ImageInfo,
    }
}
