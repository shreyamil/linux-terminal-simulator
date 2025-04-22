const commandInput = document.getElementById("commandInput");
const outputDiv = document.getElementById("output");

let directories = ["/"]; // Starting directory
let files = {}; // Store files as key-value pairs (filename: content)
let currentDirectory = "/"; // Current working directory

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const command = commandInput.value.trim();
    appendOutput(`$ ${command}`);
    handleCommand(command);
    commandInput.value = "";
  }
});

function appendOutput(text) {
  const line = document.createElement("div");
  line.className = "output-line";
  line.textContent = text;
  outputDiv.appendChild(line);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function handleCommand(input) {
  const [cmd, ...args] = input.split(" ");
  const arg = args.join(" ");

  switch (cmd) {
    case "mkdir":
      // Create a directory
      if (arg) {
        if (directories.includes(arg)) {
          appendOutput(`mkdir: cannot create directory '${arg}': File exists`);
        } else {
          directories.push(arg);
          appendOutput(`Directory '${arg}' created.`);
        }
      } else {
        appendOutput("mkdir: missing operand");
      }
      break;

    case "rmdir":
      // Remove a directory
      if (arg) {
        if (!directories.includes(arg)) {
          appendOutput(`rmdir: failed to remove '${arg}': No such directory`);
        } else {
          directories = directories.filter((d) => d !== arg);
          appendOutput(`Directory '${arg}' removed.`);
        }
      } else {
        appendOutput("rmdir: missing operand");
      }
      break;

    case "ls":
      // List directories and files in the current directory
      const items = directories.filter((d) => d.startsWith(currentDirectory)).concat(Object.keys(files));
      appendOutput(items.length === 0 ? "No files or directories found." : items.join("  "));
      break;

    case "cd":
      // Change the current directory
      if (arg === "..") {
        if (currentDirectory !== "/") {
          currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf("/"));
        }
      } else if (directories.includes(arg)) {
        currentDirectory = arg;
      } else {
        appendOutput(`cd: no such directory: ${arg}`);
      }
      break;

    case "pwd":
      // Show current working directory
      appendOutput(currentDirectory);
      break;

    case "touch":
      // Create a new file
      if (arg) {
        if (files[arg]) {
          appendOutput(`touch: cannot create '${arg}': File already exists`);
        } else {
          files[arg] = ""; // File with empty content
          appendOutput(`File '${arg}' created.`);
        }
      } else {
        appendOutput("touch: missing operand");
      }
      break;

    case "rm":
      // Remove a file
      if (arg) {
        if (!files[arg]) {
          appendOutput(`rm: cannot remove '${arg}': No such file`);
        } else {
          delete files[arg];
          appendOutput(`File '${arg}' removed.`);
        }
      } else {
        appendOutput("rm: missing operand");
      }
      break;

    case "cat":
      // Display the content of a file
      if (arg) {
        if (files[arg]) {
          appendOutput(files[arg]);
        } else {
          appendOutput(`cat: ${arg}: No such file`);
        }
      } else {
        appendOutput("cat: missing operand");
      }
      break;

    case "echo":
      // Echo a string to the terminal
      appendOutput(arg);
      break;

    case "chmod":
      // Change file permissions (simplified version)
      if (arg && args[1]) {
        appendOutput(`chmod: permissions for '${arg}' changed to ${args[0]}`);
      } else {
        appendOutput("chmod: missing operand");
      }
      break;

    case "chown":
      // Change file ownership (simplified version)
      if (arg && args[1]) {
        appendOutput(`chown: ownership of '${arg}' changed to ${args[0]}`);
      } else {
        appendOutput("chown: missing operand");
      }
      break;

    case "ps":
      // List current processes (dummy processes)
      appendOutput("PID   TTY    TIME     CMD\n1234  pts/0  00:00:01 bash\n5678  pts/1  00:00:00 node");
      break;

    case "top":
      // Show top processes (dummy data)
      appendOutput("PID USER   PR  NI    VIRT    RES    SHR S %CPU %MEM    TIME+  COMMAND\n1234 root   20   0  123456  23456   1234 S  5.0  0.5  0:00.10 bash");
      break;

    case "kill":
      // Kill a process (simulate killing a process)
      if (arg) {
        appendOutput(`Process ${arg} terminated.`);
      } else {
        appendOutput("kill: missing operand");
      }
      break;

    case "ping":
      // Simulate ping command
      if (arg) {
        appendOutput(`PING ${arg} (192.168.1.1) 56(84) bytes of data.`);
      } else {
        appendOutput("ping: missing host");
      }
      break;

    case "ifconfig":
      // Show network configuration (simulated)
      appendOutput("eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n    inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255");
      break;

    case "wget":
      // Simulate file downloading (simplified)
      if (arg) {
        appendOutput(`wget: downloading '${arg}'...`);
      } else {
        appendOutput("wget: missing URL");
      }
      break;

    case "clear":
      outputDiv.innerHTML = "";
      break;

    case "help":
      appendOutput(
        "Available commands: mkdir, rmdir, ls, cd, pwd, touch, rm, cat, echo, chmod, chown, ps, top, kill, ping, ifconfig, wget, clear, help"
      );
      break;

    default:
      appendOutput(`${cmd}: command not found`);
  }
}
