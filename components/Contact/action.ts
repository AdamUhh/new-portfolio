"use server";

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { formSchema } from "./validate";

const sesClient = new SESClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function sendContactEmail(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    description: string;
}) {
    // Validate on server side
    const validation = formSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors,
        };
    }

    if (!process.env.SES_SENDER_EMAIL) {
        console.error("No sender email provided");
        return {
            success: false,
            message: "Email configuration error",
        };
    }

    try {
        const command = new SendEmailCommand({
            Source: process.env.SES_SENDER_EMAIL,
            ReplyToAddresses: [data.email],
            Destination: {
                ToAddresses: [process.env.SES_SENDER_EMAIL],
            },
            Message: {
                Subject: {
                    Data: `New Contact: ${data.name}`,
                    Charset: "UTF-8",
                },
                Body: {
                    Html: {
                        Data: `
                            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h2>New Contact Form Submission</h2>
                                <p><strong>Name:</strong> ${data.name}</p>
                                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
                                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
                                <p><strong>Message:</strong></p>
                                <p>${data.description.replace(/\n/g, "<br>")}</p>
                            </div>
                        `,
                        Charset: "UTF-8",
                    },
                    Text: {
                        Data: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.company ? `Company: ${data.company}` : ""}

Message:
${data.description}
                        `,
                        Charset: "UTF-8",
                    },
                },
            },
        });

        await sesClient.send(command);

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            message: "Failed to send email. Please try again later.",
        };
    }
}
