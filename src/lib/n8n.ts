/**
 * Trigger the n8n workflow and wait for the response
 * n8n returns the generated image directly in the response
 */
export async function triggerN8nWorkflow(data: {
    job_id: string;
    personImage: string;
    objectImage: string;
    prompt?: string;
}): Promise<{
    success: boolean;
    error?: string;
    imageBase64?: string;
    mimeType?: string;
}> {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        return { success: false, error: 'N8N_WEBHOOK_URL not configured' };
    }

    try {
        // Create form data with binary images
        const formData = new FormData();

        // Convert base64 to blob for person image
        const personBlob = base64ToBlob(data.personImage, 'image/png');
        formData.append('Persona', personBlob, 'persona.png');

        // Convert base64 to blob for object image
        const objectBlob = base64ToBlob(data.objectImage, 'image/png');
        formData.append('Objeto', objectBlob, 'objeto.png');

        // Add job_id and optional prompt
        formData.append('job_id', data.job_id);
        if (data.prompt) {
            formData.append('prompt', data.prompt);
        }

        console.log(`[n8n] Sending request for job ${data.job_id}...`);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error(`[n8n] Error response: ${response.status}`);
            return {
                success: false,
                error: `n8n returned status ${response.status}`,
            };
        }

        // n8n returns the image as binary data
        const contentType = response.headers.get('content-type') || 'image/png';
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageBase64 = buffer.toString('base64');

        console.log(`[n8n] Received image for job ${data.job_id}, size: ${buffer.length} bytes`);

        return {
            success: true,
            imageBase64,
            mimeType: contentType.split(';')[0], // Remove charset if present
        };
    } catch (error) {
        console.error('[n8n] Error triggering workflow:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Convert base64 string to Blob
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
    // Remove data URL prefix if present
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}
