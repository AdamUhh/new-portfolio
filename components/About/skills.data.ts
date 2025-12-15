export const skillList = {
    Level_1: "Novice",
    Level_2: "Advanced Beginner",
    Level_3: "Competent",
    Level_4: "Proficient",
    Level_5: "Expert",
} as const;

export interface Skill {
    name: string;
    experience: (typeof skillList)[keyof typeof skillList];
}

interface SkillDict<T extends Skill[]> {
    [key: string]: T;
}

export const skillDict: SkillDict<Skill[]> = {
    languages: [
        { name: "Autohotkey", experience: skillList.Level_2 },
        { name: "CSharp", experience: skillList.Level_1 },
        { name: "CSS3", experience: skillList.Level_4 },
        { name: "Go", experience: skillList.Level_1 },
        { name: "HTML5", experience: skillList.Level_4 },
        { name: "Rust", experience: skillList.Level_1 },
        { name: "TypeScript", experience: skillList.Level_4 },
    ],

    frontend: [
        { name: "Astro", experience: skillList.Level_2 },
        { name: "NextJS", experience: skillList.Level_4 },
        { name: "React", experience: skillList.Level_4 },
        { name: "Redux", experience: skillList.Level_3 },
        { name: "SvelteKit", experience: skillList.Level_2 },
    ],

    backend: [
        { name: "Docker", experience: skillList.Level_1 },
        { name: "DrizzleOrm", experience: skillList.Level_3 },
        { name: "Express", experience: skillList.Level_2 },
        { name: "GraphQL", experience: skillList.Level_2 },
        { name: "Node.js", experience: skillList.Level_3 },
        { name: "Prisma", experience: skillList.Level_2 },
    ],

    databases: [
        { name: "MongoDB", experience: skillList.Level_2 },
        { name: "MySQL", experience: skillList.Level_2 },
        { name: "PostgreSQL", experience: skillList.Level_3 },
        { name: "SQLite", experience: skillList.Level_2 },
        { name: "Turso", experience: skillList.Level_2 },
    ],

    "desktop-frameworks": [
        { name: "Electron", experience: skillList.Level_3 },
        { name: "Wails", experience: skillList.Level_1 },
    ],

    platforms: [
        { name: "AWS", experience: skillList.Level_2 },
        { name: "Firebase", experience: skillList.Level_1 },
        { name: "Shopify", experience: skillList.Level_3 },
        { name: "Supabase", experience: skillList.Level_1 },
        { name: "Webflow", experience: skillList.Level_3 },
        { name: "Xano", experience: skillList.Level_2 },
    ],

    design: [
        { name: "Blender", experience: skillList.Level_1 },
        { name: "Figma", experience: skillList.Level_3 },
        { name: "Photoshop", experience: skillList.Level_3 },
    ],

    "game-development": [
        { name: "Godot", experience: skillList.Level_2 },
        { name: "Unity", experience: skillList.Level_2 },
        { name: "Unreal Engine 4", experience: skillList.Level_1 },
    ],
};
