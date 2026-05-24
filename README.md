# GitScope

**Developer-first repository intelligence.**

Paste any GitHub URL and instantly get an interactive dependency graph, 
architecture diagram, contributor network, and commit history — all in one place.

🔗 **[Live Demo](https://git-scope-analyze.vercel.app/)**

---

## What it does

GitScope parses any public GitHub repository and gives you:

- **Dependency Graph** — See which files import which, spot circular 
  dependencies, and identify the most coupled modules
- **Architecture Diagram** — Understand the high-level structure at a glance
- **Contributor Network** — Visualize who works on what
- **Commit History** — Browse branches and recent activity
- **File Tree** — Navigate large codebases by file importance and connection

No login required. Just paste a repo URL.

---

## Built with

- **Next.js 15** — App Router, streaming, API routes
- **PostgreSQL + Drizzle ORM** — Graph data persistence
- **GitHub API** — Repo metadata, file trees, commits
- **D3 / Cytoscape / Sigma** — Graph and network visualization
- **Gemini API** — AI-powered code explanation
- **Tailwind CSS + Radix UI** — UI components

---

## Running locally

1. Clone the repo

```bash
   git clone https://github.com/ipshitabhardwaj/GitScope.git
   cd GitScope
```

2. Install dependencies

```bash
   npm install
```

3. Set up environment variables

```bash
   cp .env.example .env.local
```
Fill in:
```
GITHUB_TOKEN=your_github_pat
```
4. Run the dev server

```bash
   npm run dev
```

---

## Use cases

- **Joining a new codebase** — See the entire architecture in seconds
- **Code review** — Understand what a PR touches before reading a line
- **Finding the right file** — Hub nodes are the ones that matter most
- **Dependency auditing** — Spot circular deps and tightly coupled modules

---

## License

MIT · Built by [Ipshita Bhardwaj](https://github.com/ipshitabhardwaj)refresh 
