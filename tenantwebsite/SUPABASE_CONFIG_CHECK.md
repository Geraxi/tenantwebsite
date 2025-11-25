# Verifica Configurazione Supabase per Netlify

Se ricevi l'errore "Load failed" durante il login/signup su Netlify, è molto probabile che manchi la configurazione degli URL in Supabase.

## 1. Configurazione URL del Sito (Site URL)

1. Vai alla [Dashboard di Supabase](https://supabase.com/dashboard).
2. Seleziona il tuo progetto (`tenantwebsite-1` o simile).
3. Nel menu a sinistra, clicca su **Authentication** -> **URL Configuration**.
4. Nel campo **Site URL**, inserisci l'URL del tuo sito su Netlify.
   - Esempio: `https://tenantwebsite-1.netlify.app` (assicurati di usare l'URL corretto del tuo sito).
   - **Nota**: Non mettere lo slash finale `/`.

## 2. Configurazione Redirect URLs

Nella stessa pagina (**URL Configuration**), sotto **Redirect URLs**:

1. Clicca su **Add URL**.
2. Aggiungi l'URL del tuo sito seguito da `/**`.
   - Esempio: `https://tenantwebsite-1.netlify.app/**`
3. Aggiungi anche l'URL specifico per il callback (opzionale ma consigliato):
   - Esempio: `https://tenantwebsite-1.netlify.app/auth/callback`
4. Clicca su **Save**.

## 3. Verifica Variabili d'Ambiente su Netlify

Assicurati di aver seguito la guida `VERIFICA_NETLIFY.md` per aggiungere le variabili d'ambiente:

1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**IMPORTANTE**: Dopo aver aggiunto le variabili, devi **riavviare il deploy** su Netlify (Deploys -> Trigger deploy -> Deploy site).

## 4. Verifica Errori nella Console

Se il problema persiste:

1. Apri il tuo sito su Netlify.
2. Clicca col tasto destro -> **Ispeziona** (Inspect).
3. Vai alla scheda **Console**.
4. Prova a fare login/signup.
5. Se vedi errori rossi, fai uno screenshot e invialo.
   - Se vedi errori CORS (`Access to fetch at ... from origin ... has been blocked by CORS policy`), conferma che il problema è nel punto 1 o 2.
