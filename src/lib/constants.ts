// ============================================================================
// GitScope — Constants
// ============================================================================

import { ExampleRepo } from "@/types";

export const EXAMPLE_REPOS: ExampleRepo[] = [
    { owner: "tiangolo", repo: "fastapi", description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production", stars: "79k", language: "Python" },
    { owner: "django", repo: "django", description: "The Web framework for perfectionists with deadlines", stars: "80k", language: "Python" },
    { owner: "pallets", repo: "flask", description: "The Python micro framework for building web applications", stars: "68k", language: "Python" },
    { owner: "encode", repo: "httpx", description: "A next generation HTTP client for Python", stars: "13k", language: "Python" },
    { owner: "pydantic", repo: "pydantic", description: "Data validation using Python type hints", stars: "21k", language: "Python" },
    { owner: "psf", repo: "requests", description: "A simple, yet elegant, HTTP library for Python", stars: "52k", language: "Python" },
    { owner: "huggingface", repo: "transformers", description: "State-of-the-art ML for Pytorch, TensorFlow, and JAX", stars: "136k", language: "Python" },
    { owner: "pytorch", repo: "pytorch", description: "Tensors and Dynamic neural networks in Python", stars: "85k", language: "Python" },
];

export const FILE_EXTENSION_COLORS: Record<string, string> = {
    ts: "#2196F3",
    tsx: "#AB47BC",
    js: "#FFEB3B",
    jsx: "#FF9800",
    py: "#26C6DA",
    rb: "#F44336",
    go: "#00BFA5",
    rs: "#FF7043",
    java: "#7E57C2",
    kt: "#EC407A",
    swift: "#FFA726",
    c: "#66BB6A",
    cpp: "#EF5350",
    h: "#29B6F6",
    cs: "#8BC34A",
    php: "#5C6BC0",
    html: "#E91E63",
    css: "#CE93D8",
    scss: "#F06292",
    json: "#FDD835",
    yaml: "#FF5252",
    yml: "#FF5252",
    md: "#4FC3F7",
    sql: "#FFCA28",
    sh: "#69F0AE",
    bash: "#69F0AE",
    dockerfile: "#00ACC1",
    toml: "#D84315",
    xml: "#42A5F5",
    svg: "#FFD54F",
    vue: "#00E676",
    svelte: "#FF1744",
    graphql: "#D500F9",
    proto: "#00B8D4",
    tf: "#651FFF",
    zig: "#F9A825",
    lock: "#90A4AE",
    env: "#AA00FF",
    txt: "#BDBDBD",
};

export const MODULE_TYPE_COLORS: Record<string, string> = {
    api: "#00e5a0",
    ui: "#06b6d4",
    database: "#f59e0b",
    config: "#34d399",
    utility: "#10b981",
    test: "#ef4444",
    build: "#f97316",
    docs: "#64748b",
    core: "#00c98a",
    middleware: "#a3e635",
    service: "#06b6d4",
    model: "#eab308",
    controller: "#14b8a6",
    view: "#00e5a0",
    other: "#6b7280",
};

export const DIAGRAM_TABS = [
    { id: "files" as const,        label: "File Tree",     icon: "FolderTree" },
    { id: "architecture" as const, label: "Architecture",  icon: "Boxes" },
    { id: "contributors" as const, label: "Contributors",  icon: "Users" },
    { id: "branches" as const,     label: "Branches",      icon: "GitBranch" },
    { id: "dependencies" as const, label: "Dependencies",  icon: "Package" },
] as const;

export const HOW_IT_WORKS_STEPS = [
    {
        title: "Paste any repo URL",
        description: "Drop in a GitHub URL or an owner/repo slug. Works with any public repo — no login needed.",
        icon: "Link",
    },
    {
        title: "GitScope maps the code",
        description: "The pipeline parses the file tree, extracts symbols, resolves imports, and builds a live dependency graph.",
        icon: "Brain",
    },
    {
        title: "Explore interactively",
        description: "Click through architecture maps, file trees, contributor networks, dependency graphs, and commit history.",
        icon: "LayoutDashboard",
    },
];