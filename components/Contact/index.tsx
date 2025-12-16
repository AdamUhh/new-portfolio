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
import { formSchema } from "./validate";

/* ---------------------------------- */
/* Contact Information Card            */
/* ---------------------------------- */

function ContactInformation() {
    const [isEmailCopied, setIsEmailCopied] = useState(false);

    const copyToClipboard = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await navigator.clipboard.writeText(EMAIL);

        setIsEmailCopied(true);
        setTimeout(() => setIsEmailCopied(false), 3000);
    };

    return (
        <div className="mx-auto w-full max-w-lg rounded-lg bg-[#191919] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent/80">
                        <UserIcon className="size-5" />
                    </div>
                    <h2 className="text-3xl font-semibold">Get in Touch</h2>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                    I&apos;m always open to discussing new projects, creative
                    ideas, or opportunities to collaborate.
                </p>
            </div>

            <div className="rounded-lg bg-[#1e1e1e] p-4 font-mono text-sm ring-1 ring-white/5">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500">const</span>
                        <span className="font-semibold text-[#89B4FA]">
                            name
                        </span>
                        <span className="text-[#89DCEB]">=</span>
                        <span className="text-[#A6E3A1]">
                            &apos;Adam M.&apos;
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-gray-500">const</span>
                        <span className="font-semibold text-[#89B4FA]">
                            email
                        </span>
                        <span className="text-[#89DCEB]">=</span>
                        <span className="text-[#A6E3A1]">
                            &apos;{EMAIL}&apos;
                        </span>

                        <Tooltip open={isEmailCopied || undefined}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onMouseUp={copyToClipboard}
                                    className={cn(
                                        "ml-auto size-8 text-white/60 hover:bg-accent/10 hover:text-white",
                                        isEmailCopied &&
                                            "bg-emerald-600 text-white hover:bg-emerald-600"
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
                                {isEmailCopied ? "Email copied" : "Copy email"}
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-gray-500">const</span>
                        <span className="font-semibold text-[#89B4FA]">
                            github
                        </span>
                        <span className="text-[#89DCEB]">=</span>
                        <Link
                            href={GITHUB_LINK}
                            target="_blank"
                            className="flex items-center gap-2 text-[#A6E3A1] underline-offset-4 hover:text-accent hover:underline"
                        >
                            <GithubIcon className="size-4" />
                            &apos;{GITHUB_LINK}&apos;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
            description: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        const result = await sendContactEmail(data);
        setIsSubmitting(false);

        if (result?.success) {
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                form.reset();
            }, 3000);
        }
    }

    return (
        <div className="mx-auto w-full max-w-lg rounded-lg bg-[#191919] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent/80">
                    <SendIcon className="size-5" />
                </div>
                <h2 className="text-3xl font-semibold">Send a Message</h2>
            </div>

            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    {/* Name */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Name*</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Elon"
                                    className="border-accent/10 bg-[#1c1c1c] text-white placeholder:text-gray-500 focus-visible:border-accent/30 focus-visible:ring-0 focus-visible:ring-accent/30"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    {/* Email */}
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email*</FieldLabel>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="elon@tesla.com"
                                    className="border-accent/10 bg-[#1c1c1c] text-white placeholder:text-gray-500 focus-visible:border-accent/30 focus-visible:ring-0 focus-visible:ring-accent/30"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Phone */}
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Phone</FieldLabel>
                                <Input
                                    {...field}
                                    type="tel"
                                    placeholder="+1 555 123 4567"
                                    className="border-accent/10 bg-[#1c1c1c] text-white placeholder:text-gray-500 focus-visible:border-accent/30 focus-visible:ring-0 focus-visible:ring-accent/30"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="company"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Company</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Tesla"
                                    className="border-accent/10 bg-[#1c1c1c] text-white placeholder:text-gray-500 focus-visible:border-accent/30 focus-visible:ring-0 focus-visible:ring-accent/30"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Message*</FieldLabel>
                                <InputGroup className="border-accent/10 bg-[#1c1c1c] ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-accent/30">
                                    <InputGroupTextarea
                                        {...field}
                                        rows={6}
                                        placeholder="Tell me about your project, idea, or just say hello"
                                        className="text-white placeholder:text-gray-500"
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="text-xs text-gray-500 tabular-nums">
                                            {field.value.length}/500
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <FieldDescription className="text-sm text-gray-400">
                                    Please include enough detail for context.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>

            <div className="mt-6 flex justify-between">
                <Button
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
                    variant="secondary"
                    className={cn(
                        "bg-blue-500! px-8 text-white transition-all hover:bg-blue-600!",
                        submitSuccess
                            ? "bg-emerald-600 hover:bg-emerald-600"
                            : "bg-accent hover:bg-accent/90"
                    )}
                >
                    {isSubmitting ? (
                        "Sending..."
                    ) : submitSuccess ? (
                        "Sent!"
                    ) : (
                        <span className="flex items-center gap-2">
                            Send Message
                            <SendIcon className="size-4" />
                        </span>
                    )}
                </Button>
            </div>
        </div>
    );
}

/* ---------------------------------- */
/* Window Wrapper                      */
/* ---------------------------------- */

export function ContactWindow({ windowId }: WindowProps) {
    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#252526] text-white">
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                <ContactInformation />
                <ContactForm />
            </div>
        </div>
    );
}
