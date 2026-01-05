# 🔄 Bezpieczny Update Kodu

## Problem
Gdy robisz `git pull` lub `git merge`, plik `data/realizacje.json` może zostać nadpisany, co spowoduje utratę realizacji dodanych przez panel administratora.

## Rozwiązanie

### Opcja 1: Użyj skryptu `update-safe.sh` (ZALECANE)

```bash
./update-safe.sh
```

Skrypt automatycznie:
1. ✅ Tworzy backup realizacji przed update'em
2. ✅ Wykrywa konflikty w `data/realizacje.json`
3. ✅ Daje wybór: zachować lokalne, zdalne, lub scalić obie wersje
4. ✅ Bezpiecznie scala realizacje (unikalne ID)

### Opcja 2: Ręczny update

```bash
# 1. Backup
cp data/realizacje.json data/realizacje.json.backup

# 2. Pobierz zmiany (bez merge)
git fetch origin

# 3. Sprawdź różnice
git diff HEAD origin/main -- data/realizacje.json

# 4. Merge innych plików, ale zachowaj lokalny realizacje.json
git merge origin/main --no-commit
git checkout --ours data/realizacje.json
git commit -m "Update kodu - zachowano lokalne realizacje"
```

### Opcja 3: Scalanie realizacji (jeśli są różne)

Jeśli chcesz zachować realizacje z obu wersji:

```bash
# 1. Backup
cp data/realizacje.json data/realizacje.json.backup

# 2. Pobierz zdalną wersję
git fetch origin
git show origin/main:data/realizacje.json > data/realizacje.json.remote

# 3. Scal ręcznie lub użyj skryptu Python
python3 -c "
import json
with open('data/realizacje.json', 'r') as f: local = json.load(f)
with open('data/realizacje.json.remote', 'r') as f: remote = json.load(f)
local_ids = {r['id']: r for r in local['list']}
remote_ids = {r['id']: r for r in remote['list']}
merged = {**remote_ids, **local_ids}  # lokalne mają priorytet
merged_list = list(merged.values())
merged_list.sort(key=lambda x: x.get('date', ''), reverse=True)
with open('data/realizacje.json', 'w') as f:
    json.dump({'list': merged_list}, f, ensure_ascii=False, indent=2)
print(f'Scalono: {len(merged_list)} realizacji')
"

# 4. Dokończ merge
git merge origin/main --no-commit
git add data/realizacje.json
git commit -m "Update - scalono realizacje"
```

## ⚠️ Ważne

- **Zawsze rób backup** przed update'em
- Sprawdź różnice przed merge'em
- Jeśli masz wątpliwości, użyj `update-safe.sh`

## 🔄 Przywracanie z backupu

```bash
cp data/realizacje.json.backup data/realizacje.json
```

