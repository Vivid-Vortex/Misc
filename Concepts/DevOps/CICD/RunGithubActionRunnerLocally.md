# It is fully possible. GitHub officially supports self-hosted runners on Windows laptops.

How it works

You install a small agent (the GitHub Actions runner) on your laptop. It connects outbound to GitHub (no inbound firewall rules needed) and polls for jobs. When a workflow runs, GitHub sends the job to your runner instead of a cloud
VM.

Setup steps

1. Go to your GitHub repository
   
- Settings → Actions → Runners → New self-hosted runner
- Select: Windows, x64

2. GitHub gives you a script — it looks like this:
   
# Create a folder

mkdir actions-runner; cd actions-runner

# Download the runner

Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.x.x/actions-runner-win-x64-2.x.x.zip -OutFile actions-runner-win-x64.zip

# Extract

Add-Type -AssemblyName System.IO.Compression.FileSystem

[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/actions-runner-win-x64.zip", "$PWD")

# Configure (GitHub gives you the exact token)

./config.cmd --url https://github.com/YOUR_ORG/YOUR_REPO --token YOUR_TOKEN

# Run it

./run.cmd

3. Update your workflow
   
runs-on: self-hosted   # instead of ubuntu-latest

5. Keep it running
   
- You can install it as a Windows service so it starts automatically:
  
./svc.cmd install

./svc.cmd start

What happens then

- Your laptop's runner picks up the GitHub Actions job
- The job can reach http://localhost:8082 (your Artifactory Docker container)
- twine upload publishes directly to your local JFrog instance

Practical limitations to know

┌────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│        Concern         │                                                                 Reality                                                                 │
├────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Laptop must be on      │ Yes — if it's off/asleep, the job queues and waits                                                                                      │
├────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Docker must be running │ Yes — start Docker Desktop before triggering the workflow                                                                               │
├────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Security               │ The runner only runs workflows from your own repo (private repos are safer; public repos need extra caution with pull_request triggers) │
├────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Network                │ No port forwarding needed — runner connects outbound to GitHub                                                                          │
└────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Realistic verdict for your POC

This works fine for personal testing. You trigger the workflow manually (workflow_dispatch), your laptop is on, Docker is running — the job completes and publishes to local Artifactory. It is not suitable for team CI where others
might trigger builds, because it depends on your machine being available.
