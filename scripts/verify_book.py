#!/usr/bin/env python3
"""Automated integrity validator for 雅思阅读的领域语言 (IELTS Domain Language)."""

from __future__ import annotations

import pathlib
import re
import sys
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def check_quarto_config() -> None:
    cfg = (ROOT / "_quarto.yml").read_text(encoding="utf-8")
    for rel in re.findall(r'-\s+([a-zA-Z0-9_./-]+\.(?:qmd|css|html|svg|bib))', cfg):
        if not (ROOT / rel).exists():
            fail(f"_quarto.yml references missing file: {rel}")
    for key in ("cover-image", "favicon", "bibliography", "include-after-body"):
        m = re.search(rf'^\s*{key}:\s*(\S+)', cfg, re.M)
        if not m:
            fail(f"_quarto.yml missing key: {key}")
        elif not (ROOT / m.group(1)).exists():
            fail(f"_quarto.yml {key} points to missing file: {m.group(1)}")
    if "assets/cover.svg" in (ROOT / "index.qmd").read_text(encoding="utf-8"):
        fail("index.qmd must not manually embed assets/cover.svg because _quarto.yml cover-image already renders it.")
    if "assets/toys/**" not in cfg:
        fail("_quarto.yml must declare 'assets/toys/**' under project.resources")


def check_headings_svgs_refs() -> None:
    bib = (ROOT / "references.bib").read_text(encoding="utf-8")
    if len(re.findall(r'^@\w+\{', bib, re.M)) < 5:
        fail("references.bib should contain at least 5 BibTeX entries")

    for p in sorted(ROOT.glob("chapter-*.qmd")):
        t = p.read_text(encoding="utf-8")
        if re.search(r'^# ', t, re.M):
            fail(f"{p.name} has duplicate H1 heading alongside YAML title")
        if re.search(r'^title:\s*"Chapter \d+:', t, re.M):
            fail(f"{p.name} has hardcoded Chapter N: prefix")
        if re.search(r'^## \d+\.', t, re.M):
            fail(f"{p.name} has double-numbered H2 heading")

    for svg in sorted(ROOT.glob("assets/**/*.svg")):
        try:
            ET.parse(svg)
        except ET.ParseError as exc:
            fail(f"Malformed SVG XML in {svg.relative_to(ROOT)}: {exc}")

    for qmd in sorted(ROOT.glob("*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        for img_path in re.findall(r'!\[[^\]]*\]\((assets/[^)]+)\)', txt):
            if not (ROOT / img_path).exists():
                fail(f"{qmd.name} references missing image: {img_path}")


def check_interactive_toys() -> None:
    loader = ROOT / "assets/toys-loader.html"
    scripts = re.findall(r'<script\s+src="([^"]+)"></script>', loader.read_text(encoding="utf-8"))
    if not scripts or scripts[0] != "assets/toys/core.js":
        fail("assets/toys-loader.html must load assets/toys/core.js FIRST.")

    expected_js = sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / "assets/toys").glob("*.js"))
    if set(scripts) != set(expected_js):
        fail(f"Loader scripts mismatch disk files. Loader={scripts}, Disk={expected_js}")

    registered: list[str] = []
    for rel in scripts:
        if rel != "assets/toys/core.js":
            txt = (ROOT / rel).read_text(encoding="utf-8")
            registered.extend(re.findall(r"T\.register(?:Compare|Stepper|Quiz)?\(\s*'([a-z0-9-]+)'", txt))

    if len(registered) != len(set(registered)):
        fail("Duplicate registered toy IDs found.")

    embedded: list[str] = []
    per_ch = 0
    for qmd in sorted(ROOT.glob("*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        ids = re.findall(r'data-ielts-toy="([a-z0-9-]+)"', txt)
        embedded.extend(ids)
        if qmd.name.startswith("chapter-"):
            per_ch += 1
            if len(ids) < 2:
                fail(f"{qmd.name} has fewer than 2 interactive labs ({len(ids)})")
        for tid in ids:
            pattern = rf'::: \{{\.content-visible when-format="html"\}}\s*<div data-ielts-toy="{re.escape(tid)}"></div>\s*:::'
            if not re.search(pattern, txt):
                fail(f"{qmd.name}: lab '{tid}' is not wrapped in a Quarto HTML conditional block.")

    if len(embedded) != len(set(embedded)):
        fail("Duplicate embedded toy IDs found.")

    if set(registered) != set(embedded):
        fail(f"1-to-1 mismatch! Registered-only={sorted(set(registered)-set(embedded))}, Embedded-only={sorted(set(embedded)-set(registered))}")

    print(f"[OK] Interactive labs verified: {len(registered)} registered == {len(embedded)} embedded (1:1 bijection across {per_ch} chapters + back matter).")


def main() -> int:
    check_quarto_config()
    check_headings_svgs_refs()
    check_interactive_toys()

    if ERRORS:
        print("\n[FAIL] Verification failed:")
        for e in ERRORS:
            print(f"  - {e}")
        return 1

    print("[PASS] All IELTS Domain Language engineering, visual, heading, citation, and interactive checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
