import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type Props = {
  children: string;
  lang?: string;
};

const LANG_LABELS: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  jsx: "JSX",
  sql: "SQL",
  bash: "Bash",
  json: "JSON",
  jsonc: "JSON",
  text: "Plain text",
};

const LANG_COLORS: Record<string, string> = {
  ts: "#3178c6",
  tsx: "#3178c6",
  js: "#f7df1e",
  jsx: "#f7df1e",
  sql: "#e88c35",
  bash: "#4eaa25",
  json: "#cbcb41",
  jsonc: "#cbcb41",
  text: "#6b7280",
};

export async function CodeBlock({ children, lang = "text" }: Props) {
  const code = children.trim();

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  const label = LANG_LABELS[lang] ?? lang;
  const dot = LANG_COLORS[lang] ?? "#6b7280";

  return (
    <div className="rounded-xl border border-foreground/10 overflow-hidden text-xs min-w-0 w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-foreground/10">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full shrink-0"
            style={{ backgroundColor: dot }}
          />
          <span className="text-muted-foreground font-mono">{label}</span>
        </div>
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto bg-card [&>pre]:p-4 [&>pre]:leading-relaxed [&_.shiki]:bg-transparent! [&_.shiki_span]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
