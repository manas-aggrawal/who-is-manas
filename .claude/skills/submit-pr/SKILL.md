---
name: submit-pr
description: Submit the current working-tree changes to GitHub as a pull request. Branches off the default branch if needed, commits, pushes, and opens a PR with gh. Use when the user asks to "submit a PR", "open a PR", "push these changes", or invokes /submit-pr.
---

# Submit PR

Take the current uncommitted (and/or unpushed) changes and turn them into a GitHub pull request. The user invoking this skill IS the authorization to commit, push, and open the PR — do not ask "should I proceed?" for the happy path. Only stop to ask if something is genuinely ambiguous or risky (see Guardrails).

## Steps

1. **Inspect state.** Run `git status --short` and `git diff --stat` (plus `git diff` / `git diff --staged` as needed) to understand what changed. If there are **no changes** (nothing modified, staged, or unpushed), tell the user there's nothing to submit and stop.

2. **Determine base branch.** It's the remote default:
   `git remote show origin | sed -n 's/.*HEAD branch: //p'` (usually `master` in this repo).

3. **Pick the working branch.**
   - If currently on the **default branch**, create a new feature branch — never commit directly to the default. Name it `<type>/<short-kebab-summary>` where `<type>` is `feat`, `fix`, `chore`, `docs`, etc. based on the change (e.g. `feat/portfolio-redesign`, `chore/update-resume`). Create it with `git checkout -b <name>`.
   - If already on a non-default branch, reuse it.

4. **Stage & commit.** Stage the relevant files (`git add -A` unless the user scoped it narrower). Write a concise, conventional commit message: a `<type>: <summary>` subject line (≤72 chars) plus a short body of bullet points describing what changed and why. Do not add any Claude/AI attribution or `Co-Authored-By` lines unless the user asks.

5. **Push.** `git push -u origin <branch>`. If push is rejected because the branch diverged, pull with rebase (`git pull --rebase`) and retry; surface conflicts to the user rather than force-pushing.

6. **Open the PR.** Use `gh pr create --base <default> --head <branch>` with:
   - `--title`: the commit subject (or a cleaner human title).
   - `--body`: a markdown summary — a one-line description, a `## Changes` bullet list, and a `## Testing` note (e.g. `npm run build` / lint status) if you ran any checks. Prefer a heredoc for the body.
   - If a PR already exists for the branch, `gh pr create` will report it — surface that URL instead of erroring.

7. **Report.** Print the PR URL and a one-line summary of what was submitted.

## Guardrails

- **Confirm first** if: the diff contains apparent secrets/credentials, large unrelated/binary changes you didn't expect, or the changes look unrelated to recent work. Show what you found and let the user decide.
- Never `git push --force` to the default branch. Avoid force-push generally; only use `--force-with-lease` on a feature branch after an explicit rebase the user is aware of.
- Do not amend or rewrite already-pushed commits unless asked.
- Verify `gh auth status` succeeds before step 6; if not authenticated, tell the user to run `gh auth login` (suggest `! gh auth login` so it runs in-session).

## Notes

- This repo's remote is `origin` (`who-is-manas`) and the default branch is `master`.
- If the build is quick, running `npm run build` before committing is a good sanity check to mention in the PR body — but don't block the PR on an unrelated pre-existing failure; report it instead.
