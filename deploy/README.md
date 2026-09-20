# Deployment shape

The experiment runs as an isolated, resource-bounded systemd service on `127.0.0.1:8791`. Nginx strips `/experiments/jev-threat-triage/` before proxying to that internal port.

The service uses an isolated Node.js 24 LTS runtime at `/opt/avcel-jev/runtime/current`; it does not replace the host's system Node.js or change the existing Avcel form service.

Persistent evaluations live in `/var/lib/avcel-jev/evaluations`. The credential is supplied only through the root-readable `/etc/avcel-jev/avcel-jev.env` environment file and is never copied into a release.

The application serializes Jev calls, permits five waiting requests, rate-limits each client to three evaluations per ten minutes, and retains at most 250 evaluation records.

Releases are immutable directories below `/opt/avcel-jev/releases`. `/opt/avcel-jev/current` is the active symlink.

Rollback consists of repointing `current` to the preceding release, restoring the backed-up service and Nginx files if either changed, then running:

```sh
sudo systemctl daemon-reload
sudo systemctl restart avcel-jev.service
sudo nginx -t
sudo systemctl reload nginx
```
