# Online Quiz (frontend only)

Plain HTML, CSS and JavaScript. No server, no database, no build step.

## Run locally
Open `index.html` in your browser.

## Deploy on GitHub Pages
1. Create a new public repo on GitHub and upload all files in this folder
   (`index.html`, `style.css`, `script.js`, `questions.js`) to the repo root.
2. Repo → Settings → Pages → "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
3. After a minute your quiz is live at `https://<your-username>.github.io/<repo-name>/`.

## Add or edit questions
Edit `questions.js`. Each question has `q` (text), `options` (list), and `answer` (index of the correct option, starting at 0).

## Note
Top scores are stored in each visitor's own browser (localStorage), so they are not shared between users.
