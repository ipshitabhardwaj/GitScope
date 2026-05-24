"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Link as LinkIcon,
  Brain,
  LayoutDashboard,
  Star,
  ExternalLink,
  Users,
  GitPullRequest,
  Search,
  Network,
  Loader2,
  Terminal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import BrandLogo from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GitHubTokenModal, { setOneTimeGitHubToken } from "@/components/dashboard/github-token-modal";
import { EXAMPLE_REPOS, HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { fadeSlideUp, staggerContainer, transitions } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Link:          <LinkIcon className="w-6 h-6" />,
  Brain:         <Brain className="w-6 h-6" />,
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
};

const USE_CASES = [
  {
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-[#00e5a0]/10 text-[#00e5a0]",
    title: "Joining a new codebase",
    description:
      "Starting at a new job or contributing to open source? See the entire architecture in seconds instead of spending hours reading file trees.",
  },
  {
    icon: <GitPullRequest className="w-6 h-6" />,
    iconBg: "bg-cyan-400/10 text-cyan-400",
    title: "Code review",
    description:
      "Understand what a PR actually touches and how those files connect to the rest of the codebase before reviewing a single line.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    iconBg: "bg-amber-400/10 text-amber-400",
    title: "Finding the right file",
    description:
      "Navigate large repos by seeing which files are most connected. Hub nodes are the ones that matter most.",
  },
  {
    icon: <Network className="w-6 h-6" />,
    iconBg: "bg-emerald-400/10 text-emerald-400",
    title: "Understanding dependencies",
    description:
      "See exactly which files import which, where circular dependencies exist, and which modules are most coupled.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [input, setInput]               = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [githubTokenOpen, setGithubTokenOpen] = useState(false);
  const [pendingRepo, setPendingRepo]   = useState<{ owner: string; repo: string } | null>(null);
  const [accessHint, setAccessHint]     = useState<string | null>(null);

  const checkAccess = useCallback(async (owner: string, repo: string, token?: string) => {
    const params = new URLSearchParams({ owner, repo });
    const res = await fetch(`/api/github/repo/access?${params}`, {
      headers: token ? { "x-github-token": token } : undefined,
    });
    return res;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const value = input.trim();
      if (!value) return;

      let owner = "";
      let repo  = "";

      const urlMatch = value.match(
        /(?:github\.com|gitscope\.dev)\/([^/]+)\/([^/\s?#]+)/
      );
      if (urlMatch) {
        owner = urlMatch[1];
        repo  = urlMatch[2];
      } else {
        const slugMatch = value.match(/^([^/\s]+)\/([^/\s]+)$/);
        if (slugMatch) {
          owner = slugMatch[1];
          repo  = slugMatch[2];
        }
      }

      if (owner && repo) {
        setIsNavigating(true);
        setAccessHint(null);

        try {
          const publicCheck = await checkAccess(owner, repo);
          if (publicCheck.ok) {
            router.push(`/${owner}/${repo}`);
            return;
          }

          setPendingRepo({ owner, repo });
          setGithubTokenOpen(true);
          setAccessHint("This repository appears private or restricted. Add a GitHub PAT to continue.");
        } catch {
          setAccessHint("Network error while checking repo access. Please try again.");
        } finally {
          setIsNavigating(false);
        }
      }
    },
    [checkAccess, input, router]
  );

  return (
    <div className="landing-schematic landing-scroll-shell h-screen overflow-y-auto overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#00e5a0]/10 bg-[#090d0e]/80 backdrop-blur-xl px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="text-xl font-bold">
              Git<span className="gradient-text">Scope</span>
            </span>
          </div>
          <a
            href="https://github.com/ipshitabhardwaj/GitScope"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[#00e5a0]/20 bg-[#00e5a0]/[0.04] text-slate-300 hover:text-white hover:border-[#00e5a0]/40 hover:bg-[#00e5a0]/[0.08] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </nav>

      <div className="landing-graph-overlay" aria-hidden="true" />

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-20">
        {/* Ambient orbs — green/cyan */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00e5a0]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/[0.06] rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto mb-12 hero-glow"
        >
          {/* Eyebrow pill */}
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/10 px-3 py-1 ui-eyebrow text-[#00e5a0]/90">
            <Terminal className="w-3 h-3" />
            Developer-first repository intelligence
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Understand</span> Any
            <br />
            GitHub Repository
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Paste a repo URL and instantly get an interactive dependency graph,
            architecture diagram, contributor network, and commit history —
            all in one place.
          </p>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="surface-neo mesh-grid flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto p-3"
          >
            <div className="relative flex-1">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="owner/repo  or  github.com/owner/repo"
                className="h-14 text-base sm:text-lg pl-5 pr-4 bg-white/[0.02] border-[#00e5a0]/15 focus:border-[#00e5a0]/50 focus:ring-2 focus:ring-[#00e5a0]/20 rounded-xl font-mono"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isNavigating}
              className="h-14 px-8 text-lg rounded-xl bg-[#00e5a0] text-[#020a07] font-semibold hover:bg-[#00c98a] border-0 shadow-lg shadow-[#00e5a0]/20 transition-all"
            >
              {isNavigating ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5 mr-2" />
              )}
              Analyze
            </Button>
          </form>

          {accessHint && (
            <p className="mt-3 text-sm text-amber-200/90">{accessHint}</p>
          )}
        </motion.div>

        {/* Example Repos */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-5xl mx-auto mb-20"
        >
          <p className="text-center ui-body text-muted-foreground mb-6">
            Or explore a popular repository
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXAMPLE_REPOS.map((repo) => (
              <motion.button
                key={`${repo.owner}/${repo.repo}`}
                variants={fadeSlideUp}
                whileHover={{ y: -3 }}
                transition={transitions.base}
                onClick={() => {
                  setIsNavigating(true);
                  router.push(`/${repo.owner}/${repo.repo}`);
                }}
                className="surface-neo-soft interactive-lift p-4 text-left group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground group-hover:text-[#00e5a0] transition-colors font-mono text-sm">
                    {repo.repo}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#00e5a0]/20 text-muted-foreground"
                  >
                    <Star className="w-3 h-3 mr-1 text-amber-400" />
                    {repo.stars}
                  </Badge>
                </div>
                <p className="ui-micro text-muted-foreground mb-2 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="ui-micro text-muted-foreground/60">
                    {repo.owner}
                  </span>
                  <span className="text-muted-foreground/30">·</span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 bg-[#00e5a0]/10 text-[#00e5a0] border-0"
                  >
                    {repo.language}
                  </Badge>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* When to use GitScope */}
        <motion.section
          variants={fadeSlideUp}
          initial="hidden"
          animate="show"
          transition={{ ...transitions.soft, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            When to use <span className="gradient-text">GitScope</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {USE_CASES.map((item) => (
              <div
                key={item.title}
                className="surface-neo-soft interactive-lift p-6 rounded-2xl"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBg}`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          variants={fadeSlideUp}
          initial="hidden"
          animate="show"
          transition={{ ...transitions.soft, delay: 0.25 }}
          className="w-full max-w-4xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="surface-neo-soft interactive-lift p-6 text-center relative"
              >
                <div className="absolute -top-3 left-6 bg-[#00e5a0] text-[#020a07] text-xs font-bold px-2.5 py-1 rounded-full font-mono">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4 text-[#00e5a0]">
                  {iconMap[step.icon]}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-[#00e5a0]/10 py-8 text-center text-sm text-muted-foreground w-full">
          <span>© 2026 GitScope · Built by </span>
          <a
            href="https://github.com/ipshitabhardwaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e5a0] hover:text-[#00c98a] transition-colors"
          >
            Ipshita Bhardwaj
          </a>
          <span className="mx-3 text-border">·</span>
          <a
            href="https://github.com/ipshitabhardwaj/GitScope"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Open Source
          </a>
        </footer>
      </main>

      <GitHubTokenModal
        open={githubTokenOpen}
        onOpenChange={setGithubTokenOpen}
        onSave={async (token) => {
          if (!pendingRepo) return;
          if (!token) {
            setAccessHint("A GitHub token is required for private repositories.");
            return;
          }

          try {
            const res = await checkAccess(pendingRepo.owner, pendingRepo.repo, token);
            if (res.ok) {
              setOneTimeGitHubToken(token);
              setAccessHint(null);
              router.push(`/${pendingRepo.owner}/${pendingRepo.repo}`);
              return;
            }

            if (res.status === 401 || res.status === 403 || res.status === 404) {
              setAccessHint("Token is incorrect or missing required scopes (repo/read:org) for this private repository.");
              return;
            }

            setAccessHint("Unable to verify token right now. Please try again.");
          } catch {
            setAccessHint("Network error while validating token. Please try again.");
          }
        }}
      />
    </div>
  );
}