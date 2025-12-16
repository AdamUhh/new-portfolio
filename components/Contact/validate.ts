import { z } from "zod";

const spammyPattern = /(https?:\/\/|www\.|<[^>]+>|(.)\2{5,})/i;

export const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters.")
        .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters.")
        .refine((v) => !spammyPattern.test(v), "Name looks invalid."),

    email: z.email("Please enter a valid email address.").trim(),

    company: z
        .string()
        .trim()
        .refine(
            (v) => v === "" || v.length >= 2,
            "Company name must be at least 2 characters."
        )
        .refine(
            (v) => v === "" || /^[a-zA-Z0-9\s.'\-&]+$/.test(v),
            "Company name contains invalid characters."
        )
        .refine(
            (v) => v === "" || /[a-zA-Z0-9]/.test(v),
            "Company name must contain letters or numbers."
        )
        .refine(
            (v) => v === "" || !spammyPattern.test(v),
            "Company name looks invalid."
        ),

    phone: z
        .string()
        .trim()
        .refine(
            (v) => v === "" || /^[0-9+\-\s()]+$/.test(v),
            "Phone number contains invalid characters."
        )
        .refine((v) => {
            if (v === "") return true;
            const digits = v.replace(/\D/g, "");
            return digits.length >= 10 && digits.length <= 15;
        }, "Phone number must be between 10 and 15 digits.")
        .refine((v) => {
            if (v === "") return true;
            const digits = v.replace(/\D/g, "");
            return !/(.)\1{6,}/.test(digits);
        }, "Phone number looks invalid."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters.")
        .max(500, "Description must be at most 500 characters.")
        .refine(
            (v) =>
                !/(https?:\/\/|www\.|\.com\b|\.net\b|\.io\b|\.org\b)/i.test(v),
            "Message must not contain links."
        )
        .refine((v) => {
            const words = v.toLowerCase().split(/\s+/);
            const counts = words.reduce<Record<string, number>>((acc, w) => {
                acc[w] = (acc[w] ?? 0) + 1;
                return acc;
            }, {});
            const mostRepeated = Math.max(...Object.values(counts));
            return mostRepeated < words.length * 0.4;
        }, "Message appears repetitive.")
        .refine(
            (v) => !/(.)\1{6,}/.test(v),
            "Message contains repeated characters."
        )
        .refine((v) => {
            const letters = v.match(/[a-zA-Z]/g)?.length ?? 0;
            return letters / v.length > 0.6;
        }, "Message must contain meaningful text."),
});
