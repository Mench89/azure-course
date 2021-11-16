import { AzureFunction, Context } from "@azure/functions"
import resizeImg from "resize-img"

interface ImageInfo {
    id: string
    uri: string
}

export const serviceBusQueueTrigger: AzureFunction = async function (
    context: Context,
    mySbMsg: any,
    inputDocument: ImageInfo,
    inputBlob: Buffer
): Promise<void> {
    context.log("ServiceBus queue trigger function processed message", mySbMsg)

    // Resize image
    const resizedImage = await resizeImg(inputBlob, {
        width: 128,
        height: 128,
    })
    const thumbnailUrl = inputDocument.uri.replace("/images/", "/thumbnails/")
    context.bindings.outputBlob = resizedImage
    context.bindings.outputDocument = {
        ...inputDocument,
        thumbnail: thumbnailUrl,
    }
    context.log("Updated CosmosDB document: ", context.bindings.outputDocument)
}
