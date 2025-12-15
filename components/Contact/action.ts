"use server";

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

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
    phone: string;
    description: string;
}) {
    if (!process.env.SES_SENDER_EMAIL) {
        console.error("No sender email provided");
        return;
    }

    try {
        const command = new SendEmailCommand({
            Source: process.env.SES_SENDER_EMAIL, // This must be a verified email in SES
            ReplyToAddresses: [data.email], // User can reply directly to the form submitter
            Destination: {
                ToAddresses: [process.env.SES_SENDER_EMAIL],
            },
            Message: {
                Subject: {
                    Data: `New Contact Form Submission from ${data.name}`,
                    Charset: "UTF-8",
                },
                Body: {
                    Html: {
                        Data: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                    .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                                    .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                                    .field { margin-bottom: 15px; }
                                    .label { font-weight: bold; color: #1f2937; }
                                    .value { color: #4b5563; margin-top: 5px; }
                                    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <h2>New Contact Form Submission</h2>
                                    </div>
                                    <div class="content">
                                        <div class="field">
                                            <div class="label">Name:</div>
                                            <div class="value">${data.name}</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Email:</div>
                                            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Phone:</div>
                                            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Message:</div>
                                            <div class="value">${data.description.replace(/\n/g, "<br>")}</div>
                                        </div>
                                        <div class="footer">
                                            <p>This email was sent from your website contact form.</p>
                                        </div>
                                    </div>
                                </div>
                            </body>
                            </html>
                        `,
                        Charset: "UTF-8",
                    },
                    Text: {
                        Data: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

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
