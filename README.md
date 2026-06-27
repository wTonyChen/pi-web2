# pi-web2

[中文](./README.zh-CN.md)

A local web UI for the [Pi Coding Agent](https://github.com/badlogic/pi-mono). It reads Pi's session files from your machine, providing session management, live conversations, model configuration, skill management, and project file preview — all in your browser.

## Quick Start

**This package is not available on NPM Registry, please clone this repo.**

```bash
git clone https://github.com/wtonychen/pi-web2
cd pi-web2
npm install
npm run start
```

**Plus, it's available on [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) (if that's OK to you)**

Open `http://localhost:30141` after starting. The CLI will attempt to auto-open the browser once the server is ready.

**Options:**

```bash
pi-web2 --port 8080              # Custom port
pi-web2 --hostname 127.0.0.1     # Local-only access
pi-web2 -p 8080 -H 127.0.0.1     # Combined

PORT=8080 pi-web2                # Env var also works
```

## Features

- **Pick up where you left off**: Open the web UI and find past Pi conversations organized by project — no need to dig through terminal history or remember session paths.
- **Branch out with confidence**: Fork from any past message to try a different direction, or create an independent session without cluttering the original one.
- **Browse while chatting**: Explore project files in the sidebar, preview source code, documents, images, audio, and PDFs on the right — files auto-refresh on change, perfect for reviewing agent edits as they happen.
- **Stay in the loop**: Context usage, token cost, compaction status, and system prompt are all visible at a glance in the top bar — no more long sessions feeling like a black box.
- **Fewer tool switches**: Models, API keys, model testing, and skill toggles are all manageable from the web UI — configure your agent without jumping between tools.

## What's Different from Upstream

A fork of [@agegr/pi-web](https://github.com/agegr/pi-web) focused on detail polish and mobile experience (mostly for personal use).

### Better Mobile View
Mobile-first web experience that works well on phones and tablets.

### Middle-Click Shortcuts
Middle-click files in the file tree to quickly insert them; middle-click preview tabs to close them.

### Agent Quick-Action Links
Agents can send `#view`, `#fill`, `#jumpto`, `#speak`, and `#javascript` links for frictionless interaction. Install a SKILL and the agent generates them automatically:

- **`#view`** — Preview a file directly in the UI
- **`#fill`** — Fill the textbox with content
- **`#jumpto`** — Trigger a private protocol URI
- **`#speak`** — Read text aloud via local TTS
- **`#javascript`** — Run a JS snippet in the browser and pipe output back to the textbox

### Other Details

- Download project files from the file tree
- Local voice dictation input support
- Relaxed file preview size limits
- Built-in ligature-only font (Fira Code ligature glyphs, toggleable via env var)
- Minimap scrollbar optimized for long conversations
- Dedicated newline button for touch devices
- One-click scroll-to-bottom + lock-to-bottom
- Clear input button
- Quick message quoting
- Local TTS for messages
- Preview toolbar with download and open-in-new-window option
-  Few performance and interaction polish

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ALLOW_FULL_FS_ACCESS=true` | Allow full filesystem access (default `false`) |
| `ENABLE_SYM_LIGATURE_FONT=true` | Enable ligature-only font (default `false`) |

## Notes

- **Data directory**: Session files are read from `~/.pi/agent/sessions` by default. Override with the `PI_CODING_AGENT_DIR` environment variable.
- **Session files**: Path format is `~/.pi/agent/sessions/<encoded-cwd>/<timestamp>_<uuid>.jsonl`.
- **Model config**: The Models panel reads/writes `models.json` in the Pi directory. Model lists and defaults are parsed from Pi's config.
- **File access**: File browsing is scoped to the currently selected project directory and any cwds that appear in sessions.
- **Fork vs. in-session branch**: Fork creates a new `.jsonl` file; "Edit" branches within the same session file.

## Development

```bash
npm install
npm run dev
```

Local dev server at `http://localhost:30141`.

Common checks:

```bash
node_modules/.bin/tsc --noEmit
npm run lint
```

Don't run `next build` / `npm run build` during development — it writes to `.next/` and can interfere with the running dev server. Build only for releases.

## Project Structure

```
app/
  api/
    agent/          # Create/drive AgentSession, SSE event stream
    auth/           # OAuth and API key management
    cwd/validate/   # Custom cwd validation
    default-cwd/    # Get Pi's default cwd
    files/          # File listing, reading, preview, file watcher
    home/           # Current user home directory
    models/         # Available models, default model, thinking levels
    models-config/  # Read/write models.json, test models
    sessions/       # Session reading, rename, delete, context, HTML export
    skills/         # SKILL listing, search, install, enable/disable
components/
  AppShell.tsx        # Layout, URL state, top panels, file tabs
  SessionSidebar.tsx  # Project picker, session tree, file tree
  ChatWindow.tsx      # Messages, SSE, drag-n-drop images, minimap
  ChatInput.tsx       # Input bar, model/tools/thinking/compact/slash commands
  MessageView.tsx     # Messages, thinking, tool calls/result rendering
  ModelsConfig.tsx    # Model and auth config panel
  SkillsConfig.tsx    # Skill management panel
  FileExplorer.tsx    # File tree
  FileViewer.tsx      # Source, diff, image, audio, PDF, DOCX preview
lib/
  rpc-manager.ts      # AgentSessionWrapper lifecycle and global registry
  session-reader.ts   # Parse .jsonl session files and branch context
  normalize.ts        # Normalize toolCall field names
  file-access.ts      # File read security boundary
  file-paths.ts       # File path encoding and relative path utilities
  markdown.ts         # Markdown/Mermaid/KaTeX plugin config
  pi-types.ts         # Pi-related types
hooks/
  useAgentSession.ts  # Session load, send command, SSE state machine
  useAudio.ts         # Completion sound effects
  useDragDrop.ts      # Image drag-n-drop
  useTheme.ts         # Theme switching
bin/
  pi-web.js           # NPM CLI entrypoint
```
