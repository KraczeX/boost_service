#!/bin/bash

# Skrypt do bezpiecznego update'u kodu bez utraty realizacji
# Użycie: ./update-safe.sh

echo "🔄 Rozpoczynam bezpieczny update kodu..."

# 1. Backup aktualnego pliku realizacji
BACKUP_FILE="data/realizacje.json.backup.$(date +%Y%m%d_%H%M%S)"
echo "📦 Tworzę backup realizacji: $BACKUP_FILE"
cp data/realizacje.json "$BACKUP_FILE"

# 2. Sprawdź czy są lokalne zmiany
if [ -n "$(git status -s)" ]; then
    echo "⚠️  Wykryto lokalne zmiany. Zapisuję je..."
    git stash push -m "Lokalne zmiany przed update - $(date)"
fi

# 3. Pobierz zmiany z GitHub (bez merge)
echo "⬇️  Pobieram zmiany z GitHub..."
git fetch origin

# 4. Sprawdź czy są zmiany w data/realizacje.json na zdalnym
REMOTE_HASH=$(git ls-tree origin/main data/realizacje.json | awk '{print $3}')
LOCAL_HASH=$(git hash-object data/realizacje.json)

if [ "$REMOTE_HASH" != "$LOCAL_HASH" ]; then
    echo "⚠️  Wykryto różnice w realizacjach między lokalnym a zdalnym repozytorium"
    echo "📋 Porównuję zmiany..."
    
    # Pobierz zdalną wersję do tymczasowego pliku
    git show origin/main:data/realizacje.json > data/realizacje.json.remote
    
    echo ""
    echo "🔍 Różnice:"
    echo "   Lokalne realizacje: $(jq '.list | length' data/realizacje.json 2>/dev/null || echo 'nieznana')"
    echo "   Zdalne realizacje: $(jq '.list | length' data/realizacje.json.remote 2>/dev/null || echo 'nieznana')"
    echo ""
    echo "💡 Wybierz opcję:"
    echo "   1) Zachowaj lokalne realizacje (nadpisz zdalne)"
    echo "   2) Zachowaj zdalne realizacje (nadpisz lokalne)"
    echo "   3) Scal obie wersje (automatycznie)"
    echo "   4) Anuluj update"
    read -p "   Twój wybór (1-4): " choice
    
    case $choice in
        1)
            echo "✅ Zachowuję lokalne realizacje..."
            # Merge innych plików, ale zachowaj lokalny realizacje.json
            git merge origin/main --no-commit
            git checkout --ours data/realizacje.json
            git commit -m "Merge z origin/main - zachowano lokalne realizacje"
            ;;
        2)
            echo "✅ Zachowuję zdalne realizacje..."
            git merge origin/main
            ;;
        3)
            echo "🔀 Scalanie realizacji..."
            # Użyj Python do scalenia (lub ręcznie)
            python3 << 'PYTHON_SCRIPT'
import json
import sys

try:
    # Wczytaj lokalne
    with open('data/realizacje.json', 'r', encoding='utf-8') as f:
        local_data = json.load(f)
    
    # Wczytaj zdalne
    with open('data/realizacje.json.remote', 'r', encoding='utf-8') as f:
        remote_data = json.load(f)
    
    # Scal listy - unikalne ID
    local_ids = {r['id']: r for r in local_data.get('list', [])}
    remote_ids = {r['id']: r for r in remote_data.get('list', [])}
    
    # Połącz - lokalne mają priorytet
    merged_ids = {**remote_ids, **local_ids}
    merged_list = list(merged_ids.values())
    
    # Sortuj po dacie (najnowsze pierwsze)
    merged_list.sort(key=lambda x: x.get('date', ''), reverse=True)
    
    # Zapisz scaloną wersję
    merged_data = {'list': merged_list}
    with open('data/realizacje.json', 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Scalono {len(local_ids)} lokalnych + {len(remote_ids)} zdalnych = {len(merged_list)} unikalnych realizacji")
except Exception as e:
    print(f"❌ Błąd podczas scalania: {e}")
    sys.exit(1)
PYTHON_SCRIPT
            
            if [ $? -eq 0 ]; then
                git merge origin/main --no-commit
                git add data/realizacje.json
                git commit -m "Merge z origin/main - scalono realizacje"
            else
                echo "❌ Błąd podczas scalania. Przywracam backup..."
                cp "$BACKUP_FILE" data/realizacje.json
                exit 1
            fi
            ;;
        4)
            echo "❌ Anulowano update"
            rm -f data/realizacje.json.remote
            exit 0
            ;;
        *)
            echo "❌ Nieprawidłowy wybór"
            rm -f data/realizacje.json.remote
            exit 1
            ;;
    esac
    
    rm -f data/realizacje.json.remote
else
    echo "✅ Brak konfliktów w realizacjach - wykonuję normalny merge"
    git merge origin/main
fi

# 5. Przywróć lokalne zmiany jeśli były
if [ -n "$(git stash list)" ]; then
    echo "🔄 Przywracam lokalne zmiany..."
    git stash pop
fi

echo ""
echo "✅ Update zakończony pomyślnie!"
echo "📦 Backup zapisany jako: $BACKUP_FILE"
echo ""
echo "💡 Jeśli coś poszło nie tak, możesz przywrócić backup:"
echo "   cp $BACKUP_FILE data/realizacje.json"

