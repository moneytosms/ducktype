import type { Snippet } from "@/types/snippet";

export const devopsCommandSnippets: Snippet[] = [
  // Git
  {
    id: "git-interactive-rebase",
    title: "Interactive rebase + force-push-with-lease",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "history",
    prompt: "Rewrite the last 5 commits interactively and safely force-push the result.",
    shikiLang: "bash",
    typingFocus: ["flags", "numbers", "dashes"],
    code: String.raw`git rebase -i HEAD~5
git status
git rebase --continue
git push --force-with-lease origin feature/checkout-refactor`,
  },
  {
    id: "git-cherry-pick-range",
    title: "Cherry-pick a range of commits",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "history",
    prompt: "Apply a range of commits from another branch onto the current one.",
    shikiLang: "bash",
    typingFocus: ["hashes", "caret", "flags"],
    code: String.raw`git log --oneline release/2.3 -- src/api
git cherry-pick a1b2c3d^..f9e8d7c
git cherry-pick --continue
git cherry-pick --abort`,
  },
  {
    id: "git-squash-commits",
    title: "Find and squash commits",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "history",
    prompt: "Squash the last several commits on a branch into one clean commit.",
    shikiLang: "bash",
    typingFocus: ["numbers", "flags", "quotes"],
    code: String.raw`git log --oneline -10
git reset --soft HEAD~4
git commit -m "feat: consolidate auth middleware changes"
git push --force-with-lease origin fix/auth-middleware`,
  },
  {
    id: "git-stash-workflow",
    title: "Stash workflow with pop/apply",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "workflow",
    prompt: "Stash work in progress, switch branches, then restore the stashed changes.",
    shikiLang: "bash",
    typingFocus: ["flags", "quotes", "dashes"],
    code: String.raw`git stash push -u -m "wip: dashboard filters"
git checkout main
git pull --rebase origin main
git checkout -
git stash list
git stash apply stash@{0}
git stash drop stash@{0}`,
  },
  {
    id: "git-bisect-bug",
    title: "Bisect a bug across commits",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "debugging",
    prompt: "Binary-search commit history to find which commit introduced a regression.",
    shikiLang: "bash",
    typingFocus: ["hashes", "keywords"],
    code: String.raw`git bisect start
git bisect bad HEAD
git bisect good v2.4.0
npm test -- --grep "checkout"
git bisect good
git bisect bad
git bisect reset`,
  },
  {
    id: "git-tag-push-release",
    title: "Tag and push a release",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "release",
    prompt: "Create an annotated version tag and push it to the remote to trigger a release.",
    shikiLang: "bash",
    typingFocus: ["quotes", "dots", "flags"],
    code: String.raw`git tag -a v3.1.0 -m "Release 3.1.0: billing overhaul"
git push origin v3.1.0
git push origin --tags
git log --oneline v3.0.0..v3.1.0`,
  },
  {
    id: "git-safe-revert-reset",
    title: "Reset or revert a bad commit safely",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "history",
    prompt: "Revert a bad commit on a shared branch without rewriting public history.",
    shikiLang: "bash",
    typingFocus: ["hashes", "flags"],
    code: String.raw`git log --oneline -5
git revert --no-commit a1b2c3d
git status
git commit -m "revert: broken rate limiter change"
git push origin main`,
  },
  {
    id: "git-worktree-add-remove",
    title: "Worktree add/remove for parallel branches",
    domain: "devops",
    track: "Git",
    language: "Shell",
    framework: "Git",
    category: "workflow",
    prompt: "Check out a second branch into its own directory without stashing current work.",
    shikiLang: "bash",
    typingFocus: ["paths", "flags"],
    code: String.raw`git worktree add ../app-hotfix hotfix/payment-timeout
cd ../app-hotfix
npm install
git worktree list
git worktree remove ../app-hotfix
git worktree prune`,
  },

  // Docker CLI
  {
    id: "docker-multi-arch-push",
    title: "Build, tag, and push a multi-arch image",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "build",
    prompt: "Build a multi-platform image with buildx and push it to a registry.",
    shikiLang: "bash",
    typingFocus: ["flags", "colons", "slashes"],
    code: String.raw`docker buildx create --name multiarch --use
docker buildx build --platform linux/amd64,linux/arm64 \
  -t registry.example.com/api-service:1.4.0 \
  -t registry.example.com/api-service:latest \
  --push .`,
  },
  {
    id: "docker-run-flags",
    title: "Run container with volume/env/network flags",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "run",
    prompt: "Start a container with mounted volumes, env vars, port mapping, and a custom network.",
    shikiLang: "bash",
    typingFocus: ["flags", "colons", "paths"],
    code: String.raw`docker run -d \
  --name api-service \
  --network backend-net \
  -p 8080:8080 \
  -v $(pwd)/config:/app/config:ro \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://db:5432/app \
  --restart unless-stopped \
  registry.example.com/api-service:1.4.0`,
  },
  {
    id: "docker-exec-into-container",
    title: "Exec into a running container",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "debugging",
    prompt: "Open an interactive shell inside a running container to inspect its state.",
    shikiLang: "bash",
    typingFocus: ["flags", "quotes"],
    code: String.raw`docker ps --filter "name=api-service"
docker exec -it api-service /bin/sh
docker exec api-service env
docker exec api-service cat /app/config/settings.json`,
  },
  {
    id: "docker-prune-everything",
    title: "Prune everything docker",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "cleanup",
    prompt: "Remove stopped containers, unused networks, dangling images, and build cache.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes"],
    code: String.raw`docker container prune -f
docker image prune -a -f
docker volume prune -f
docker network prune -f
docker system df
docker system prune -a --volumes -f`,
  },
  {
    id: "docker-compose-up-logs",
    title: "docker-compose up/down/logs",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "compose",
    prompt: "Bring up a compose stack in the background and tail logs for one service.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes"],
    code: String.raw`docker compose -f docker-compose.dev.yml up -d --build
docker compose ps
docker compose logs -f --tail=200 api
docker compose down --remove-orphans -v`,
  },
  {
    id: "docker-copy-inspect",
    title: "Inspect + copy files out of a container",
    domain: "devops",
    track: "Docker CLI",
    language: "Shell",
    framework: "Docker",
    category: "debugging",
    prompt: "Inspect container metadata and copy a log file out to the host.",
    shikiLang: "bash",
    typingFocus: ["colons", "paths", "quotes"],
    code: String.raw`docker inspect api-service --format '{{.State.Health.Status}}'
docker cp api-service:/app/logs/error.log ./error.log
docker inspect --format '{{json .NetworkSettings.Networks}}' api-service | jq`,
  },

  // Kubernetes CLI
  {
    id: "k8s-get-logs-exec",
    title: "Get pods, tail logs, exec into a pod",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "debugging",
    prompt: "Find a pod by label, stream its logs, then open a shell inside it.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes", "equals"],
    code: String.raw`kubectl get pods -n staging -l app=api-service
kubectl logs -f -n staging api-service-7d9f8b6c5-xk2lp --since=10m
kubectl exec -it -n staging api-service-7d9f8b6c5-xk2lp -- /bin/sh`,
  },
  {
    id: "k8s-apply-rollout",
    title: "Apply + rollout status + rollout undo",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "deploy",
    prompt: "Apply a manifest, watch the rollout, and roll back if it fails.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes", "paths"],
    code: String.raw`kubectl apply -f deploy/api-service.yaml -n staging
kubectl rollout status deployment/api-service -n staging --timeout=120s
kubectl rollout history deployment/api-service -n staging
kubectl rollout undo deployment/api-service -n staging --to-revision=3`,
  },
  {
    id: "k8s-port-forward",
    title: "Port-forward a service for local debugging",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "debugging",
    prompt: "Forward a local port to a service running inside the cluster.",
    shikiLang: "bash",
    typingFocus: ["colons", "flags", "numbers"],
    code: String.raw`kubectl get svc -n staging
kubectl port-forward -n staging svc/api-service 8080:80
kubectl port-forward -n staging pod/postgres-0 5432:5432`,
  },
  {
    id: "k8s-describe-explain",
    title: "Describe + explain a resource",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "debugging",
    prompt: "Inspect why a pod is failing and look up the schema for a field.",
    shikiLang: "bash",
    typingFocus: ["dots", "flags"],
    code: String.raw`kubectl describe pod api-service-7d9f8b6c5-xk2lp -n staging
kubectl explain deployment.spec.strategy.rollingUpdate
kubectl get events -n staging --sort-by='.lastTimestamp'`,
  },
  {
    id: "k8s-scale-deployment",
    title: "Scale a deployment up and down",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "scaling",
    prompt: "Manually scale replica count and watch pods come up.",
    shikiLang: "bash",
    typingFocus: ["flags", "numbers"],
    code: String.raw`kubectl scale deployment/api-service -n staging --replicas=6
kubectl get pods -n staging -w
kubectl autoscale deployment/api-service -n staging --min=2 --max=10 --cpu-percent=70`,
  },
  {
    id: "k8s-get-by-label",
    title: "Get all resources by label selector",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "query",
    prompt: "List every resource across kinds that matches a label selector.",
    shikiLang: "bash",
    typingFocus: ["flags", "equals", "commas"],
    code: String.raw`kubectl get all -n staging -l app=api-service,tier=backend
kubectl get pods -n staging -l 'environment in (staging, canary)'
kubectl label pods api-service-7d9f8b6c5-xk2lp -n staging debug=true --overwrite`,
  },
  {
    id: "k8s-create-secret",
    title: "Create a secret from literals",
    domain: "devops",
    track: "Kubernetes CLI",
    language: "Shell",
    framework: "kubectl",
    category: "secrets",
    prompt: "Create a Kubernetes secret directly from key-value pairs on the command line.",
    shikiLang: "bash",
    typingFocus: ["flags", "equals", "quotes"],
    code: String.raw`kubectl create secret generic db-credentials \
  --from-literal=username=svc_api \
  --from-literal=password='p@ssw0rd-rotate-me' \
  -n staging --dry-run=client -o yaml | kubectl apply -f -`,
  },

  // Linux/Shell utilities
  {
    id: "linux-find-xargs",
    title: "Find + xargs to bulk-process files",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "files",
    prompt: "Find files older than 30 days and delete them in bulk using xargs.",
    shikiLang: "bash",
    typingFocus: ["flags", "quotes", "pipes"],
    code: String.raw`find /var/log/app -name "*.log" -mtime +30 -print0 \
  | xargs -0 -I {} mv {} /var/log/app/archive/
find . -name "*.tmp" -type f -mtime +7 -print0 | xargs -0 rm -v`,
  },
  {
    id: "linux-rsync-common",
    title: "rsync with common flags",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "files",
    prompt: "Sync a directory to a remote server, preserving permissions and deleting stale files.",
    shikiLang: "bash",
    typingFocus: ["flags", "colons", "slashes"],
    code: String.raw`rsync -avz --delete --progress \
  -e "ssh -p 2222" \
  ./dist/ deploy@203.0.113.42:/var/www/app/
rsync -avzn --delete ./dist/ deploy@203.0.113.42:/var/www/app/`,
  },
  {
    id: "linux-grep-recursive",
    title: "grep -rn with excludes",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "search",
    prompt: "Recursively search source files for a pattern, excluding build directories.",
    shikiLang: "bash",
    typingFocus: ["flags", "quotes", "dashes"],
    code: String.raw`grep -rn "TODO(security)" --include="*.ts" --exclude-dir=node_modules .
grep -rln "console.log" --include="*.tsx" src/ | xargs sed -i '/console\.log/d'`,
  },
  {
    id: "linux-tar-compression",
    title: "tar create/extract with compression flags",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "files",
    prompt: "Create a compressed archive of a directory and later extract it elsewhere.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes"],
    code: String.raw`tar -czvf backup-2026-07-15.tar.gz --exclude=node_modules ./app
tar -tzvf backup-2026-07-15.tar.gz | head -20
tar -xzvf backup-2026-07-15.tar.gz -C /opt/restore`,
  },
  {
    id: "linux-chmod-chown-find",
    title: "chmod/chown recursive with find",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "permissions",
    prompt: "Fix ownership on a directory tree and set separate permissions for files vs directories.",
    shikiLang: "bash",
    typingFocus: ["flags", "numbers", "colons"],
    code: String.raw`sudo chown -R www-data:www-data /var/www/app
find /var/www/app -type d -exec chmod 755 {} \;
find /var/www/app -type f -exec chmod 644 {} \;`,
  },
  {
    id: "linux-disk-usage",
    title: "du/df disk usage one-liners",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "monitoring",
    prompt: "Check overall disk usage and find the largest directories under a path.",
    shikiLang: "bash",
    typingFocus: ["flags", "pipes"],
    code: String.raw`df -h --total
du -sh /var/log/* | sort -rh | head -10
du -h --max-depth=1 /var/lib/docker | sort -rh`,
  },
  {
    id: "linux-curl-api-test",
    title: "curl with headers, auth, and data for API testing",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "networking",
    prompt: "Send an authenticated POST request with JSON body and custom headers.",
    shikiLang: "bash",
    typingFocus: ["quotes", "flags", "json"],
    code: String.raw`curl -X POST https://api.example.com/v1/orders \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sku": "duck-1000", "quantity": 3}' \
  -w "\nstatus: %{http_code}\n" -s`,
  },
  {
    id: "linux-journalctl-filter",
    title: "journalctl filtering by unit and time",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "logs",
    prompt: "Tail systemd logs for a specific service since a given time.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes", "quotes"],
    code: String.raw`journalctl -u nginx.service --since "1 hour ago" -f
journalctl -u api-service.service --since "2026-07-15 08:00:00" --until "2026-07-15 09:00:00"
journalctl -u api-service.service -p err --no-pager`,
  },
  {
    id: "linux-systemctl-service",
    title: "systemctl enable/start/status a service",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "services",
    prompt: "Register a new systemd service, start it, and confirm it's healthy.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes"],
    code: String.raw`sudo systemctl daemon-reload
sudo systemctl enable api-service.service
sudo systemctl start api-service.service
sudo systemctl status api-service.service --no-pager
sudo systemctl restart api-service.service`,
  },
  {
    id: "linux-ss-open-ports",
    title: "ss/netstat for open ports",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "networking",
    prompt: "List listening TCP ports and find which process owns a given port.",
    shikiLang: "bash",
    typingFocus: ["flags", "pipes"],
    code: String.raw`sudo ss -tulpn | grep LISTEN
sudo ss -tulpn | grep :8080
sudo lsof -i :8080`,
  },
  {
    id: "linux-ssh-key-tunnel",
    title: "ssh with key, port, and tunnel flags",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "networking",
    prompt: "Connect to a remote host on a custom port using a key file, and open a local tunnel to a database.",
    shikiLang: "bash",
    typingFocus: ["flags", "colons", "paths"],
    code: String.raw`ssh -i ~/.ssh/deploy_key -p 2222 deploy@203.0.113.42
ssh -i ~/.ssh/deploy_key -p 2222 -L 5433:localhost:5432 -N deploy@203.0.113.42
ssh -i ~/.ssh/deploy_key -p 2222 deploy@203.0.113.42 "sudo systemctl status api-service"`,
  },
  {
    id: "linux-scp-recursive",
    title: "scp recursive copy",
    domain: "devops",
    track: "Linux/Shell",
    language: "Shell",
    category: "files",
    prompt: "Recursively copy a build directory to a remote server over a custom SSH port.",
    shikiLang: "bash",
    typingFocus: ["flags", "colons", "slashes"],
    code: String.raw`scp -r -P 2222 -i ~/.ssh/deploy_key ./dist deploy@203.0.113.42:/var/www/app/
scp -P 2222 -i ~/.ssh/deploy_key deploy@203.0.113.42:/var/log/app/error.log ./error.log`,
  },

  // Package managers / build tooling
  {
    id: "pkg-pnpm-workspace-filter",
    title: "pnpm workspace install and run filtered by package",
    domain: "devops",
    track: "Package managers",
    language: "Shell",
    framework: "pnpm",
    category: "monorepo",
    prompt: "Install dependencies for one workspace package and run its build script.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes", "colons"],
    code: String.raw`pnpm install --filter @app/api...
pnpm --filter @app/api run build
pnpm -r run lint
pnpm --filter "./packages/*" run test`,
  },
  {
    id: "pkg-npm-workspace-scripts",
    title: "npm workspace commands across all packages",
    domain: "devops",
    track: "Package managers",
    language: "Shell",
    framework: "npm",
    category: "monorepo",
    prompt: "Run an npm script across every workspace and install a dependency into one workspace.",
    shikiLang: "bash",
    typingFocus: ["flags", "dashes"],
    code: String.raw`npm install axios --workspace=apps/api
npm run build --workspaces --if-present
npm ls --workspaces --depth=0`,
  },
  {
    id: "pkg-docker-build-args",
    title: "Multi-flag docker build with build-args",
    domain: "devops",
    track: "Package managers",
    language: "Shell",
    framework: "Docker",
    category: "build",
    prompt: "Build an image passing multiple build-time arguments and a custom Dockerfile path.",
    shikiLang: "bash",
    typingFocus: ["flags", "equals", "dashes"],
    code: String.raw`docker build \
  -f docker/Dockerfile.prod \
  --build-arg NODE_ENV=production \
  --build-arg APP_VERSION=$(git rev-parse --short HEAD) \
  --build-arg REGISTRY_MIRROR=https://mirror.example.com \
  --no-cache \
  -t registry.example.com/api-service:$(git rev-parse --short HEAD) .`,
  },
  {
    id: "pkg-env-configured-command",
    title: "Export env vars for a long env-configured command",
    domain: "devops",
    track: "Package managers",
    language: "Shell",
    category: "environment",
    prompt: "Export several environment variables inline and run a database migration command.",
    shikiLang: "bash",
    typingFocus: ["equals", "quotes", "flags"],
    code: String.raw`export DATABASE_URL="postgres://svc_api:p@ssw0rd@db.internal:5432/app"
export NODE_ENV=production
export LOG_LEVEL=debug
npx prisma migrate deploy --schema=./prisma/schema.prisma
unset DATABASE_URL`,
  },
];
