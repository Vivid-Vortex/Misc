# GitHub Self-Hosted Runner on a Windows Laptop

It is entirely possible to run GitHub Actions on your own Windows laptop. GitHub officially supports **self-hosted runners** on Windows, Linux, and macOS.

## How It Works

A self-hosted runner is a lightweight agent installed on your machine.

The runner:

* Connects **outbound** to GitHub (no inbound firewall rules required)
* Continuously polls GitHub for jobs
* Receives workflow jobs assigned to it
* Executes those jobs directly on your laptop instead of a GitHub-hosted VM

This is particularly useful when workflows need access to:

* Local Docker containers
* Internal services
* On-premise infrastructure
* Development environments not accessible from GitHub-hosted runners

---

## Setup Steps

### 1. Register a Self-Hosted Runner

Navigate to:

```text
Repository → Settings → Actions → Runners → New self-hosted runner
```

Select:

```text
Operating System: Windows
Architecture: x64
```

GitHub will generate customized setup commands for your repository.

---

### 2. Install the Runner

Create a folder for the runner:

```powershell
mkdir actions-runner
cd actions-runner
```

Download the runner package:

```powershell
Invoke-WebRequest `
  -Uri https://github.com/actions/runner/releases/download/v2.x.x/actions-runner-win-x64-2.x.x.zip `
  -OutFile actions-runner-win-x64.zip
```

Extract the archive:

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem

[System.IO.Compression.ZipFile]::ExtractToDirectory(
    "$PWD/actions-runner-win-x64.zip",
    "$PWD"
)
```

Configure the runner using the token provided by GitHub:

```powershell
.\config.cmd `
  --url https://github.com/YOUR_ORG/YOUR_REPO `
  --token YOUR_TOKEN
```

Start the runner:

```powershell
.\run.cmd
```

---

### 3. Update Your Workflow

Replace the GitHub-hosted runner with your self-hosted runner:

```yaml
jobs:
  build:
    runs-on: self-hosted

    steps:
      - uses: actions/checkout@v4

      - name: Build
        run: echo "Running on my laptop"
```

---

### 4. Install as a Windows Service (Recommended)

To ensure the runner starts automatically after reboot:

```powershell
.\svc.cmd install
.\svc.cmd start
```

Verify the service status:

```powershell
Get-Service actions.runner*
```

---

## What Happens During Execution?

Assume you have:

* Docker Desktop running
* A local Artifactory container listening on `http://localhost:8082`
* A GitHub workflow configured with `runs-on: self-hosted`

Workflow execution flow:

```text
GitHub Workflow Triggered
          │
          ▼
Self-Hosted Runner Polls GitHub
          │
          ▼
GitHub Assigns Job
          │
          ▼
Runner Executes on Laptop
          │
          ▼
Workflow Accesses localhost Services
          │
          ▼
twine upload → Local Artifactory
```

Since the workflow is running directly on your laptop:

```text
localhost = your laptop
```

Therefore, services like:

```text
http://localhost:8082
http://localhost:5000
http://localhost:9200
```

are accessible to the workflow.

---

## Example: Publishing to Local Artifactory

```yaml
name: Publish Package

on:
  workflow_dispatch:

jobs:
  publish:
    runs-on: self-hosted

    steps:
      - uses: actions/checkout@v4

      - name: Build Package
        run: python -m build

      - name: Upload to Local Artifactory
        run: |
          twine upload \
            --repository-url http://localhost:8082/artifactory/api/pypi/pypi-local \
            dist/*
```

---

## Practical Limitations

| Concern                    | Reality                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Laptop must be on**      | Yes. If the machine is powered off or sleeping, jobs remain queued until it becomes available. |
| **Docker must be running** | Yes, if your workflow depends on local containers.                                             |
| **Internet connectivity**  | Required so the runner can communicate with GitHub.                                            |
| **Security**               | Be careful with workflows that execute untrusted code, especially in public repositories.      |
| **Machine availability**   | Other team members cannot rely on your laptop being online.                                    |
| **Performance**            | Large builds may consume CPU, memory, and disk resources on your personal machine.             |
| **Maintenance**            | You are responsible for updating the runner software and maintaining the environment.          |

---

## Security Recommendations

### For Private Repositories

Generally safe for personal projects and internal testing.

### For Public Repositories

Avoid automatically running workflows from:

```yaml
pull_request
pull_request_target
```

unless you fully understand the security implications.

A malicious contributor could potentially execute arbitrary commands on your machine through a workflow.

Consider:

```yaml
workflow_dispatch
```

or protected branches for safer operation.

---

## Advantages of Self-Hosted Runners

✅ Access to local services and Docker containers

✅ No GitHub-hosted runner minute limits

✅ Faster builds if dependencies are already cached

✅ Full control over installed tools and software

✅ Can access internal corporate resources (VPN, intranet, databases)

✅ Ideal for local POCs and experimentation

---

## When NOT to Use It

Self-hosted runners are usually a poor choice when:

* Multiple developers depend on the same CI infrastructure
* High availability is required
* Builds need to run 24×7
* You want a fully managed CI/CD solution

In such cases, GitHub-hosted runners or dedicated self-hosted build servers are typically better options.

---

# Realistic Verdict for Your POC

For a personal proof of concept, this approach works very well:

1. Keep your laptop powered on.
2. Start Docker Desktop.
3. Ensure Artifactory is running locally.
4. Trigger the workflow manually using `workflow_dispatch`.
5. The self-hosted runner executes the workflow and publishes directly to your local Artifactory instance.

This is an excellent setup for learning, testing, and experimentation. However, it should not be treated as a production-grade CI/CD solution because it depends entirely on the availability of your personal machine.
