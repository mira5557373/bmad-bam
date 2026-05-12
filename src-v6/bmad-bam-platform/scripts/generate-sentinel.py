#!/usr/bin/env python3
"""Generate a BAM_LOAD_VERIFY_<uuid> sentinel token for Wave 0 smoke testing.

Output format: BAM_LOAD_VERIFY_<32-char-hex-uuid>
Stdout-only; no logging side effects.
"""

import sys
import uuid


def main() -> int:
    token = f"BAM_LOAD_VERIFY_{uuid.uuid4().hex}"
    print(token)
    return 0


if __name__ == "__main__":
    sys.exit(main())
