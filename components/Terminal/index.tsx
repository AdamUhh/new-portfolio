"use client";

import { useEffect, useRef, useState } from "react";

import { CV_LINK, GITHUB_LINK } from "@/lib/constants-link";
import { APP_REGISTRY_NAMES } from "@/lib/constants-registry";
import { WindowProps } from "@/lib/type-window";

import { useWindowManager } from "@/context/window";

import { aboutData } from "../About/about.data";
import { experienceData } from "../About/experience.data";
import { skillDict } from "../About/skills.data";
import { projectsData } from "../Projects/data";

interface HistoryItem {
    type: "input" | "output";
    content: string;
}

export function TerminalWindow({}: WindowProps) {
    const [history, setHistory] = useState<HistoryItem[]>([
        {
            type: "output",
            content:
                'Welcome to the terminal. Type "help" for available commands.',
        },
    ]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const { openWindow } = useWindowManager();

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd: string): string | null => {
        const parts = cmd.trim().split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (cmd.trim() === "") {
            return null;
        }

        switch (command) {
            case "help":
                return "Available commands: help, clear, about, skills, experience, projects, contact, cv, github";
            case "clear":
                return "CLEAR_COMMAND";
            case "about":
                return aboutData;
            case "skill":
            case "skills":
                let output = "\n=== SKILLS ===\n\n";
                Object.entries(skillDict).forEach(([category, skills]) => {
                    output += `${category.toUpperCase().replace(/-/g, " ")}:\n`;
                    skills.forEach((skill) => {
                        output += `  • ${skill.name.padEnd(20)} [${skill.experience}]\n`;
                    });
                    output += "\n";
                });
                return output;
            case "experience":
            case "experiences":
                return experienceData;
            case "project":
            case "projects":
                if (args.length === 0) {
                    let projectsList = "=== PROJECTS ===\n\n";
                    projectsList +=
                        "Type 'projects <name>' for details on a specific project.\n\n";
                    Object.entries(projectsData).forEach(([key, data]) => {
                        projectsList += `${key}: ${data.description}\n\n`;
                    });
                    return projectsList;
                } else {
                    const projectName = args[0].toLowerCase();
                    const project = projectsData[projectName];
                    if (project) {
                        return `\n${project.rawText}\n`;
                    } else {
                        return `Project '${projectName}' not found. Type 'projects' to see available projects.`;
                    }
                }
            case "contact":
                openWindow(APP_REGISTRY_NAMES.contact);
                return null;
            case "cv":
                window.open(CV_LINK, "_blank", "noopener,noreferrer");
                return null;
            case "github":
                window.open(GITHUB_LINK, "_blank", "noopener,noreferrer");
                return null;
            default:
                return `Command not found: ${command}. Type "help" for available commands.`;
        }
    };

    const handleSubmit = () => {
        if (!input.trim()) return;

        const output = executeCommand(input);

        if (output === "CLEAR_COMMAND") {
            setHistory([]);
        } else {
            const newHistory: HistoryItem[] = [
                ...history,
                { type: "input", content: input },
            ];
            if (output !== null) {
                newHistory.push({ type: "output", content: output });
            }
            setHistory(newHistory);
        }

        setCommandHistory([...commandHistory, input]);
        setInput("");
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    const resetViewport = () => {
        const meta = document.querySelector('meta[name="viewport"]');
        if (!meta) return;

        meta.setAttribute(
            "content",
            "width=device-width, initial-scale=1, maximum-scale=1"
        );
    };

    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-white">
            <div className="flex flex-[1_1_0] overflow-x-hidden overflow-y-auto">
                <div
                    ref={terminalRef}
                    className="size-full overflow-y-auto p-4 font-mono text-base tablet:text-sm"
                    onPointerUp={() => {
                        // e.stopPropagation(); // this disables window focus
                        inputRef.current?.focus();
                    }}
                >
                    {history.map((item, idx) => (
                        <div key={idx} className="mb-1 not-tablet-xl:text-sm">
                            {item.type === "input" ? (
                                <div className="text-green-400">
                                    <span className="text-blue-400">
                                        user@terminal:~$
                                    </span>{" "}
                                    {item.content}
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap text-gray-300">
                                    {item.content}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center">
                        <span className="mr-2 text-blue-400">
                            user@terminal:~$
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onBlur={resetViewport}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent text-green-400 caret-green-400 outline-none"
                            autoFocus
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
