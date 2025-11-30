# Guida Rapida: Aggiungere Variabili d'Ambiente in Netlify

## Metodo 1: Dalla Sidebar (Più Comune)

1. **Nella sidebar sinistra**, cerca e clicca su **"Project configuration"** o **"Site configuration"**
2. Nel menu che si apre, cerca **"Environment variables"** o **"Build & deploy"**
3. Clicca su **"Environment variables"**
4. Clicca su **"Add a variable"** o **"Add variable"**

## Metodo 2: Dal Menu del Progetto

1. **Clicca sul nome del progetto** in alto a sinistra (dove vedi "tenantcrm")
2. Cerca un'opzione come **"Settings"** o **"Site settings"**
3. Vai a **"Build & deploy"** → **"Environment"**

## Metodo 3: Dalla Barra Superiore

1. Guarda in **alto a destra** della pagina
2. Cerca un'**icona di ingranaggio** ⚙️ o un menu a tre puntini **⋮**
3. Clicca e cerca **"Site settings"** o **"Project settings"**
4. Vai a **"Build & deploy"** → **"Environment variables"**

## Metodo 4: URL Diretto

Se sei già nel progetto, prova ad andare direttamente a:
```
https://app.netlify.com/sites/[nome-del-tuo-sito]/configuration/env
```

Sostituisci `[nome-del-tuo-sito]` con il nome del tuo sito (probabilmente "tenantcrm").

## Cosa Cercare

Una volta che trovi la pagina delle variabili d'ambiente, dovresti vedere:
- Una lista di variabili esistenti (se ce ne sono)
- Un pulsante **"Add a variable"** o **"Add variable"**
- Due campi: **"Key"** e **"Value"**

## Variabili da Aggiungere

Aggiungi queste due variabili:

**Variabile 1:**
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://xrcnmlgecafyvtxqupza.supabase.co`

**Variabile 2:**
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw`

## Dopo Aver Aggiunto le Variabili

1. **Salva** le modifiche
2. Vai alla sezione **"Deploys"** nella sidebar
3. Clicca su **"Trigger deploy"** → **"Deploy site"** per riavviare il deploy con le nuove variabili

## Se Non Trovi Ancora le Impostazioni

Prova a:
- Cercare "env" o "environment" nella barra di ricerca di Netlify
- Guardare nella sezione "Project configuration" nella sidebar
- Controllare se c'è un menu a tendina accanto al nome del progetto


