import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const services = [
  {
    name: "API",
    args: ["--prefix", "pocketshop/server", "run", "dev"],
  },
  {
    name: "Client",
    args: ["--prefix", "pocketshop/client", "run", "dev"],
  },
];

let stopping = false;
const children = services.map(({ name, args }) => {
  const child = spawn(npm, args, {
    cwd: root,
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  child.on("error", (error) => {
    console.error(`${name} failed to start: ${error.message}`);
    stop(1);
  });
  child.on("exit", (code) => {
    if (!stopping) {
      console.error(`${name} exited${code === null ? "" : ` with code ${code}`}`);
      stop(code || 1);
    }
  });

  return child;
});

function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exitCode = code;
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
