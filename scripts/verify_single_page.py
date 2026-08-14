#!/usr/bin/env python3
"""
Script to verify that all PDF files in 'es/' and 'en/' directories have exactly 1 page.
Uses `pypdf` to read PDF page counts.

Exit codes:
  0: All PDFs have exactly 1 page.
  1: One or more PDFs have more (or fewer) than 1 page, or an error occurred.
"""

import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    print("Error: 'pypdf' package is not installed. Run 'pip install pypdf'.", file=sys.stderr)
    sys.exit(1)


def verify_single_page_pdfs() -> bool:
    project_root = Path(__file__).resolve().parent.parent
    target_dirs = [project_root / "es", project_root / "en"]
    
    pdf_files = []
    for d in target_dirs:
        if d.is_dir():
            pdf_files.extend(sorted(d.glob("*.pdf")))
    
    if not pdf_files:
        print("Warning: No PDF files found in 'es/' or 'en/' directories.")
        return True

    print("=" * 60)
    print("PDF Page Count Verification Report")
    print("=" * 60)

    total_files = len(pdf_files)
    failed_files = []

    for pdf_path in pdf_files:
        relative_path = pdf_path.relative_to(project_root)
        try:
            reader = pypdf.PdfReader(str(pdf_path))
            num_pages = len(reader.pages)
            
            if num_pages == 1:
                status = "PASS (1 page)"
                print(f"[OK]   {relative_path}: {status}")
            else:
                status = f"FAIL ({num_pages} pages)"
                print(f"[FAIL] {relative_path}: {status}")
                failed_files.append((relative_path, num_pages))
        except Exception as e:
            print(f"[ERROR] {relative_path}: Failed to parse ({e})")
            failed_files.append((relative_path, f"Error: {e}"))

    print("-" * 60)
    if failed_files:
        print("\nDETAILED FAILURE REPORT:")
        for file_path, detail in failed_files:
            print(f" - {file_path}: {detail} (Expected exactly 1 page)")
        print(f"\nResult: FAILED ({len(failed_files)} / {total_files} files failed)")
        print("=" * 60)
        return False
    else:
        print(f"\nResult: SUCCESS (All {total_files} PDF files have exactly 1 page)")
        print("=" * 60)
        return True


def main():
    success = verify_single_page_pdfs()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
