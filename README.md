# VitaData — Demo Website

This is a lightweight Vite + React + TypeScript + Tailwind scaffold for the VitaData marketing/demo site.

Quick start (macOS / zsh):

```bash
cd /Users/nikhilkumar/Downloads/vitaapp
# install
npm install
# start dev server
npm run dev
```

Features included:
- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion installed for animations
- Components: Hero, Problems, Solutions, Patients, USP, Market, Roadmap, Chatbot, Contact, Footer
- Simple demo chatbot and contact form (no backend)

Next steps:
- Hook contact form to backend (Firebase / Supabase)
- Replace copy and images with production assets
- Add tests and CI

Supabase integration
--------------------

To wire the demo site to Supabase (I added example wiring):

1. Create the tables in your Supabase SQL editor using `supabase_schema.sql` in the project root.
2. Enable Row Level Security and add policies to allow inserts from the anon key (or use authenticated users). Example policy for allowing anonymous inserts is included in the SQL file.
3. Set env vars (or copy `.env`):

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (anon/public key)
```

4. The client uses `src/lib/supabaseClient.ts`. The Contact form will insert into `contacts` and the Chatbot quick-pick will insert into `appointments`.

Security note: never expose your `service_role` key in client-side code or commit it; only use the anon/public key in the browser. If you need server-side privileged operations, call an Edge Function or your own server using the service_role key.

If you want, I can: generate a Next.js version, wire a Supabase demo backend, or add automated tests.
