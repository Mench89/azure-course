import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobServiceClient } from "@azure/storage-blob"
import { v4 as uuidv4 } from "uuid"

interface ImageInfo {
    id: string
    uri: string
}

export const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    context.log("HTTP trigger to upload image.")
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.STORAGE_CONNECTION_STRING
    )
    try {
        const imageId = uuidv4()
        const blobContainer = blobServiceClient.getContainerClient("images")
        const blockBlobClient = blobContainer.getBlockBlobClient(
            imageId + ".jpg"
        )
        await blockBlobClient.uploadData(req.body)
        const response: ImageInfo = {
            id: imageId,
            uri: blockBlobClient.url,
        }
        context.bindings.outputImageDocument = response
        context.bindings.outputMessage = response
        context.res = {
            status: 201,
            headers: { "Content-Type": "application/json" },
            body: response,
        }
    } catch (error) {
        context.log.error("Internal server error when storing image")
        context.res = {
            status: 500,
        }
    }
}
