#!/usr/bin/env bash
#
# validate-skills.sh — content-integrity gate for this skills repo.
#
# Enforces four invariants, failing loudly and naming the offending skill:
#   (a) every skills/<dir>/SKILL.md frontmatter declares a non-empty name + description
#   (b) frontmatter name == directory name
#   (c) the README.md skill table and skills/ directories are in exact 1:1 parity
#   (d) every relative markdown link inside a SKILL.md resolves to an existing file
#
# Pure bash + awk/grep/sed/find/comm — no new runtime dependencies.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || exit 1

SKILLS_DIR="skills"
README="README.md"
FAILURES=0

fail() {
  echo "FAIL: $1" >&2
  FAILURES=$((FAILURES + 1))
}

if [ ! -d "$SKILLS_DIR" ]; then
  fail "'$SKILLS_DIR/' directory not found"
  echo "$FAILURES failure(s)."
  exit 1
fi

if [ ! -f "$README" ]; then
  fail "'$README' not found — cannot check README/skills parity"
fi

# Skill directory names, one level deep, sorted.
mapfile -t SKILL_DIRS < <(find "$SKILLS_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort)

if [ "${#SKILL_DIRS[@]}" -eq 0 ]; then
  fail "no skill directories found under '$SKILLS_DIR/'"
fi

echo "Discovered ${#SKILL_DIRS[@]} skill directories."

# --- Invariants (a) + (b): SKILL.md frontmatter ---
for dir in "${SKILL_DIRS[@]}"; do
  skill_md="$SKILLS_DIR/$dir/SKILL.md"

  if [ ! -f "$skill_md" ]; then
    fail "$dir: missing SKILL.md"
    continue
  fi

  if [ "$(head -n1 "$skill_md")" != "---" ]; then
    fail "$dir: SKILL.md must start with a '---' YAML frontmatter delimiter"
    continue
  fi

  if ! awk 'NR>1 && /^---$/ { found=1; exit } END { exit !found }' "$skill_md"; then
    fail "$dir: SKILL.md frontmatter has no closing '---' delimiter"
    continue
  fi

  # Body between the opening '---' and the first closing '---'.
  frontmatter="$(awk 'NR==1 { next } /^---$/ { exit } { print }' "$skill_md")"

  name_val="$(printf '%s\n' "$frontmatter" \
    | grep -E '^name:[[:space:]]*' | head -n1 \
    | sed -E 's/^name:[[:space:]]*//' \
    | sed -E 's/^"(.*)"$/\1/; s/^'"'"'(.*)'"'"'$/\1/')"
  desc_val="$(printf '%s\n' "$frontmatter" \
    | grep -E '^description:[[:space:]]*' | head -n1 \
    | sed -E 's/^description:[[:space:]]*//')"

  if [ -z "$name_val" ]; then
    fail "$dir: SKILL.md frontmatter is missing a non-empty 'name' field"
  elif [ "$name_val" != "$dir" ]; then
    fail "$dir: SKILL.md frontmatter name '$name_val' does not match directory name '$dir'"
  fi

  if [ -z "$desc_val" ]; then
    fail "$dir: SKILL.md frontmatter is missing a non-empty 'description' field"
  fi
done

# --- Invariant (c): README skill table <-> skills/ directory parity ---
if [ -f "$README" ]; then
  mapfile -t README_TABLE_SKILLS < <(grep -oE '^\| \[[a-zA-Z0-9_-]+\]\(skills/[a-zA-Z0-9_-]+\) \|' "$README" \
    | sed -E 's/^\| \[[a-zA-Z0-9_-]+\]\(skills\/([a-zA-Z0-9_-]+)\) \|$/\1/')

  echo "README skill table lists ${#README_TABLE_SKILLS[@]} entries."

  if [ "${#README_TABLE_SKILLS[@]}" -eq 0 ]; then
    fail "README.md has no recognizable '| [skill](skills/skill) |' table rows"
  fi

  # Duplicate entries break 1:1 parity even when the sets otherwise match.
  dupes="$(printf '%s\n' "${README_TABLE_SKILLS[@]}" | sort | uniq -d)"
  if [ -n "$dupes" ]; then
    while IFS= read -r d; do
      [ -n "$d" ] && fail "README skill table lists 'skills/$d' more than once"
    done <<< "$dupes"
  fi

  readme_sorted="$(printf '%s\n' "${README_TABLE_SKILLS[@]}" | sort -u)"
  dirs_sorted="$(printf '%s\n' "${SKILL_DIRS[@]}" | sort -u)"

  only_in_readme="$(comm -23 <(printf '%s\n' "$readme_sorted") <(printf '%s\n' "$dirs_sorted"))"
  only_in_dirs="$(comm -13 <(printf '%s\n' "$readme_sorted") <(printf '%s\n' "$dirs_sorted"))"

  if [ -n "$only_in_readme" ]; then
    while IFS= read -r s; do
      [ -n "$s" ] && fail "README skill table links to 'skills/$s' but that directory does not exist"
    done <<< "$only_in_readme"
  fi

  if [ -n "$only_in_dirs" ]; then
    while IFS= read -r s; do
      [ -n "$s" ] && fail "skills/$s exists but is not listed in the README skill table"
    done <<< "$only_in_dirs"
  fi
fi

# --- Invariant (d): relative markdown links inside SKILL.md files resolve ---
for dir in "${SKILL_DIRS[@]}"; do
  skill_md="$SKILLS_DIR/$dir/SKILL.md"
  [ -f "$skill_md" ] || continue
  skill_root="$SKILLS_DIR/$dir"

  while IFS= read -r target; do
    [ -z "$target" ] && continue

    # Strip optional angle-bracket wrapping: [text](<url>)
    target="${target#<}"
    target="${target%>}"

    # External links, mailto/tel, and pure in-page anchors have nothing on disk to resolve.
    case "$target" in
      http://*|https://*|mailto:*|tel:*|//*|'#'*) continue ;;
    esac

    # Drop a trailing #fragment before resolving the filesystem path.
    path="${target%%#*}"
    [ -z "$path" ] && continue

    if [ "${path#/}" != "$path" ]; then
      resolved="$REPO_ROOT$path"
    else
      resolved="$skill_root/$path"
    fi

    if [ ! -e "$resolved" ]; then
      fail "$dir: SKILL.md links to '$target' which does not resolve to an existing file"
    fi
  done < <(grep -oE '\]\([^)]*\)' "$skill_md" | sed -E 's/^\]\((.*)\)$/\1/' | awk '{print $1}')
done

echo "----------------------------------------"
if [ "$FAILURES" -gt 0 ]; then
  echo "validate-skills.sh: $FAILURES failure(s) found." >&2
  exit 1
fi

echo "validate-skills.sh: all invariants passed for ${#SKILL_DIRS[@]} skills."
exit 0
