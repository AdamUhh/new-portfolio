"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, CopyIcon, Github, UserIcon } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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

import { Input } from "@/components/ui/input";

import { EMAIL, GITHUB_LINK } from "@/lib/link-constants";
import { WindowProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
                <p className="mt-2 mb-6 text-sm text-gray-400">
                    I&apos;m always open to discussing new projects, creative
                    ideas, or opportunities to collaborate.
                </p>
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
                        <Github className="h-4 w-4" />
                        &apos;{GITHUB_LINK}&apos;
                    </Link>
                </div>
            </div>

            {/* <div className="font-mono"> */}
            {/*     <span>&#123;</span> */}
            {/*     <div> */}
            {/*         <span className="pl-5 text-[#d5626a]">name:</span>{" "} */}
            {/*         <span className="text-[#c49262]">&apos;Adam M.&apos;;</span> */}
            {/*     </div> */}
            {/*     <div className="relative"> */}
            {/*         <span className="pl-5 text-[#d5626a]">email:</span>{" "} */}
            {/*         <span className="text-[#c49262]">&apos;{EMAIL}&apos;;</span> */}
            {/*         <Tooltip open={isEmailCopied || undefined}> */}
            {/*             <TooltipTrigger asChild> */}
            {/*                 <Button */}
            {/*                     variant="ghost" */}
            {/*                     onMouseUp={copyToClipboard} */}
            {/*                     className={cn( */}
            {/*                         isEmailCopied && "bg-white text-foreground" */}
            {/*                     )} */}
            {/*                 > */}
            {/*                     <CopyIcon /> */}
            {/*                 </Button> */}
            {/*             </TooltipTrigger> */}
            {/*             <TooltipContent> */}
            {/*                 {isEmailCopied ? "Email Copied" : "Copy Email"} */}
            {/*             </TooltipContent> */}
            {/*         </Tooltip> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*         <span className="pl-5 text-[#d5626a]">github:</span>{" "} */}
            {/*         <Link */}
            {/*             href={GITHUB_LINK} */}
            {/*             target="_blank" */}
            {/*             className="text-[#c49262]" */}
            {/*         > */}
            {/*             &apos;{GITHUB_LINK}&apos;; */}
            {/*         </Link> */}
            {/*     </div> */}
            {/*     <span>&#125;</span> */}
            {/* </div> */}
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
    email: z.string().email("Please enter a valid email address."),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits.")
        .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number."),
});

function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            description: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.debug("submitted", data);
    }

    return (
        <div className="mx-auto w-full max-w-lg rounded bg-[#1e1e1e] p-4">
            <div>
                <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-form-title">
                                        Bug Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-form-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
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
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="contact-form-description"
                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/100
                                                characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        Include steps to reproduce, expected
                                        behavior, and what actually happened.
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
            <div>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
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
