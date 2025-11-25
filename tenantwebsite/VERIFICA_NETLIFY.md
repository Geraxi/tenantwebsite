# Verifica e Risoluzione Problema Supabase su Netlify

## ✅ Checklist di Verifica

### Passo 1: Verifica che le Variabili siano State Aggiunte

1. Vai a: `https://app.netlify.com/sites/tenantcrm/configuration/env`
   (oppure: Project configuration → Environment variables)

2. **Controlla** che vedi queste due variabili nella lista:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Verifica** che i valori siano corretti:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://xrcnmlgecafyvtxqupza.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw`

### Passo 2: Riavvia il Deploy

**IMPORTANTE:** Dopo aver aggiunto le variabili, DEVI riavviare il deploy!

1. Vai alla sezione **"Deploys"** nella sidebar sinistra
2. Clicca sul pulsante **"Trigger deploy"** (in alto a destra)
3. Seleziona **"Deploy site"**
4. Attendi che il deploy completi (dovrebbe richiedere 1-2 minuti)

### Passo 3: Verifica il Deploy

1. Dopo che il deploy è completato, clicca sul deploy più recente
2. Controlla i **"Build logs"** per assicurarti che non ci siano errori
3. Se vedi errori, condividili

### Passo 4: Testa l'Applicazione

1. Vai all'URL del tuo sito: `https://tenantcrm.netlify.app`
2. Ricarica la pagina (Ctrl+F5 o Cmd+Shift+R per forzare il refresh)
3. Prova a registrarti di nuovo

## 🔍 Se l'Errore Persiste

### Possibili Cause:

1. **Le variabili non sono state salvate correttamente**
   - Torna alla pagina delle variabili d'ambiente
   - Verifica che siano presenti e con i valori corretti
   - Se mancano, aggiungile di nuovo

2. **Il deploy non è stato riavviato**
   - Le variabili d'ambiente vengono caricate solo durante il build
   - DEVI riavviare il deploy dopo aver aggiunto le variabili

3. **Cache del browser**
   - Prova in modalità incognito
   - Oppure svuota la cache del browser (Ctrl+Shift+Delete)

4. **Le variabili hanno spazi o caratteri extra**
   - Assicurati che non ci siano spazi prima o dopo i valori
   - Copia e incolla i valori esattamente come indicato

## 📝 Valori Esatti da Copiare

**Variabile 1:**
```
NEXT_PUBLIC_SUPABASE_URL
https://xrcnmlgecafyvtxqupza.supabase.co
```

**Variabile 2:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw
```

## ⚠️ Nota Importante

Le variabili d'ambiente vengono caricate **solo durante il build**. Se aggiungi le variabili ma non riavvii il deploy, l'applicazione continuerà a usare la versione precedente senza le variabili.

**SEMPRE riavvia il deploy dopo aver aggiunto/modificato variabili d'ambiente!**

