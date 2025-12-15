"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    CheckIcon,
    CopyIcon,
    GithubIcon,
    SendIcon,
    UserIcon,
} from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shadcn/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/shadcn/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/shadcn/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/tooltip";

import { Input } from "@/components/ui/input";

import { EMAIL, GITHUB_LINK } from "@/lib/link-constants";
import { WindowProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { sendContactEmail } from "./action";

function ContactInformation() {
    const [isEmailCopied, setIsEmailCopied] = useState(false);

    const copyToClipboard = async (
        event: MouseEvent<HTMLButtonElement>,
        url?: string | undefined
    ) => {
        event.preventDefault();
        await navigator.clipboard.writeText(EMAIL);

        if (url) window.open(url, "_blank");

        setIsEmailCopied(true);
        setTimeout(() => {
            setIsEmailCopied(false);
        }, 3000);
    };

    return (
        <div className="mx-auto w-full max-w-lg rounded bg-[#1e1e1e] p-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-gray-400">
                        <UserIcon className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Get in Touch
                    </h2>
                </div>
                {/* TODO: Which color looks... better? everywhere? */}
                {/* <p className="mt-2 mb-6 text-sm text-gray-400"> */}
                {/*     I&apos;m always open to discussing new projects, creative */}
                {/*     ideas, or opportunities to collaborate. */}
                {/* </p> */}
                <p className="mt-2 mb-6 text-sm text-accent/70">
                    {/* <p className="mt-2 mb-6 text-sm text-gray-400"> */}
                    I&apos;m always open to discussing new projects, creative
                    ideas, or opportunities to collaborate.
                </p>
            </div>
            <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 rounded bg-[#252526] p-4 transition-all hover:bg-[#1e1e1e]">
                    <span className="text-gray-500">const</span>
                    <span className="font-semibold text-[#d5626a]">name</span>
                    <span className="text-gray-500">=</span>
                    <span className="font-medium text-[#c49262]">
                        &apos;Adam M.&apos;
                    </span>
                </div>
                <div className="flex items-center gap-3 rounded bg-[#252526] p-4 transition-all hover:bg-[#1e1e1e]">
                    <span className="text-gray-500">const</span>
                    <span className="font-semibold text-[#d5626a]">email</span>
                    <span className="text-gray-500">=</span>
                    <span className="font-medium text-[#c49262]">
                        &apos;{EMAIL}&apos;
                    </span>
                    <Tooltip open={isEmailCopied || undefined}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onMouseUp={copyToClipboard}
                                className={cn(
                                    "ml-auto size-8 text-accent/80 transition-all hover:bg-accent/10 hover:text-white",
                                    isEmailCopied &&
                                        "bg-green-600 text-white hover:bg-green-600"
                                )}
                            >
                                {isEmailCopied ? (
                                    <CheckIcon className="size-4" />
                                ) : (
                                    <CopyIcon className="size-4" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isEmailCopied ? "Email Copied!" : "Copy Email"}
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="flex items-center gap-3 rounded bg-[#252526] p-4 transition-all hover:bg-[#1e1e1e]">
                    <span className="text-gray-500">const</span>
                    <span className="font-semibold text-[#d5626a]">github</span>
                    <span className="text-gray-500">=</span>
                    <Link
                        href={GITHUB_LINK}
                        target="_blank"
                        className="flex items-center gap-2 font-medium text-[#c49262] underline-offset-4 transition-colors hover:text-[#d4a572] hover:underline"
                    >
                        <GithubIcon className="h-4 w-4" />
                        &apos;{GITHUB_LINK}&apos;
                    </Link>
                </div>
            </div>
        </div>
    );
}

const formSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(500, "Description must be at most 500 characters."),
    email: z.email("Please enter a valid email address."),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits.")
        .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number."),
});

function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            description: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        const result = await sendContactEmail(data);

        setIsSubmitting(false);

        if (result && result.success) {
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                form.reset();
            }, 3000);
        } else {
            if (result) {
                // Handle error - you might want to add error state
                console.error(result.message);
            } else {
                console.error(
                    "Error with submitting email, result is undefined"
                );
            }
        }
    }

    return (
        <div className="mx-auto w-full max-w-lg rounded bg-[#1e1e1e] p-4">
            <div>
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-800/50 text-gray-400">
                        <SendIcon className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Send a Message
                    </h2>
                </div>
                <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-form-name">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-form-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        className="border-accent/10 text-white transition-all placeholder:text-accent/40 focus-visible:border-accent/30 focus-visible:ring-0"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-form-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-form-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="john@example.com"
                                        autoComplete="email"
                                        className="border-accent/10 text-white transition-all placeholder:text-accent/40 focus-visible:border-accent/30 focus-visible:ring-0"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-form-phone">
                                        Phone
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-form-phone"
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+971 50 123 4567"
                                        autoComplete="tel"
                                        className="border-accent/10 text-white transition-all placeholder:text-accent/40 focus-visible:border-accent/30 focus-visible:ring-0"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-form-description">
                                        Message
                                    </FieldLabel>
                                    <InputGroup className="border-accent/10 ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-accent/30">
                                        <InputGroupTextarea
                                            {...field}
                                            id="contact-form-description"
                                            placeholder="Tell me about your project, question, or just say hello..."
                                            rows={6}
                                            className="min-h-32 text-white transition-all placeholder:text-accent/40"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText
                                                className={cn(
                                                    "text-xs font-medium tabular-nums transition-colors",
                                                    field.value.length > 500
                                                        ? "text-red-400"
                                                        : field.value.length >
                                                            400
                                                          ? "text-yellow-500"
                                                          : "text-gray-500"
                                                )}
                                            >
                                                {field.value.length}/500
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription className="text-sm text-gray-400">
                                        Please provide as much detail as
                                        possible so I can better understand how
                                        to help.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </div>
            <div className="mt-6">
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => form.reset()}
                        disabled={isSubmitting}
                        className="hover:bg-accent/10 hover:text-white"
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="contact-form"
                        disabled={isSubmitting}
                        className={cn(
                            "group px-8 transition-all",
                            submitSuccess
                                ? "bg-green-600 hover:bg-green-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        )}
                    >
                        <span className="flex items-center gap-2 font-semibold">
                            {isSubmitting ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Sending...
                                </>
                            ) : submitSuccess ? (
                                <>
                                    <CheckIcon className="h-4 w-4" />
                                    Sent!
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <SendIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </span>
                    </Button>
                </Field>
            </div>
        </div>
    );
}

export function ContactWindow({ windowId }: WindowProps) {
    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-white">
            <div className="flex flex-[1_1_0] flex-col space-y-6 overflow-x-hidden overflow-y-auto p-6">
                <ContactInformation />
                <ContactForm />
            </div>
        </div>
    );
}
