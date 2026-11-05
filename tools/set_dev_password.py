#!/usr/bin/env python3
"""Set the developer-export password: python3 tools/set_dev_password.py "new password"
Writes the SHA-256 hash into scripts/export.js (only the hash is stored in the game)."""
import hashlib, re, sys
if len(sys.argv) != 2 or not sys.argv[1]: sys.exit('usage: set_dev_password.py "password"')
h = hashlib.sha256(sys.argv[1].encode('utf-8')).hexdigest()
p = 'scripts/export.js'; s = open(p, encoding='utf-8').read()
s2, n = re.subn(r"const DEV_PW_HASH = '[^']*';", "const DEV_PW_HASH = '%s';" % h, s)
assert n == 1; open(p, 'w', encoding='utf-8').write(s2); print('Password hash updated.')
