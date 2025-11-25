# Netlify Environment Variables Setup

Per far funzionare l'applicazione su Netlify, devi aggiungere le seguenti variabili d'ambiente:

## Variabili Richieste

### 1. Supabase (Obbligatorie)

1. Vai al **Netlify Dashboard** → Il tuo sito → **Site settings** → **Build & deploy** → **Environment**
2. Clicca su **Add a variable** e aggiungi:

   **Variabile 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://xrcnmlgecafyvtxqupza.supabase.co`

   **Variabile 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw`

### 2. Stripe (Opzionali - solo se vuoi usare i pagamenti)

   **Variabile 3:**
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: (La tua Stripe Secret Key - trova in Stripe Dashboard → Developers → API keys)

   **Variabile 4:**
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: (Il tuo webhook secret da Stripe Dashboard)

   **Variabile 5:**
   - **Key**: `STRIPE_PRICE_ID_PRO`
   - **Value**: (L'ID del prezzo Pro da Stripe)

   **Variabile 6:**
   - **Key**: `STRIPE_PRICE_ID_ENTERPRISE`
   - **Value**: (L'ID del prezzo Enterprise da Stripe)

## Passi da Seguire

1. **Accedi a Netlify Dashboard**: https://app.netlify.com
2. **Seleziona il tuo sito**
3. **Vai a**: Site settings → Build & deploy → Environment
4. **Aggiungi le variabili** una per una cliccando su "Add a variable"
5. **Salva** le modifiche
6. **Riavvia il deploy**: Vai a "Deploys" e clicca su "Trigger deploy" → "Deploy site"

## Verifica

Dopo aver aggiunto le variabili e riavviato il deploy, l'applicazione dovrebbe funzionare correttamente. Se vedi ancora l'errore "Supabase non è configurato", assicurati di:

1. Aver salvato tutte le variabili
2. Aver riavviato il deploy
3. Che i nomi delle variabili siano esatti (case-sensitive)

## Note Importanti

- ⚠️ **NON** committare mai le chiavi segrete nel repository Git
- Le variabili con prefisso `NEXT_PUBLIC_` sono esposte al browser (pubbliche)
- Le variabili senza prefisso `NEXT_PUBLIC_` sono solo server-side (private)
- Dopo aver aggiunto le variabili, devi riavviare il deploy per applicare le modifiche

