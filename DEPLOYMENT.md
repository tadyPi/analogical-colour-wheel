# GitHub Pages Deployment via GitHub Actions

Deployment is now automated using GitHub Actions:

1. Ensure your `vite.config.ts` has the correct `base` (already set to `/analogical-colour-wheel/`).
2. Push your changes to the `main` branch:

```
git add .
git commit -m "Update site"
git push
```

3. GitHub Actions will automatically build and deploy your site to GitHub Pages.

4. In your repository settings, set GitHub Pages source to **GitHub Actions** if not already set.

Your site will be available at:
https://tadyPi.github.io/analogical-colour-wheel/

If you change your repo name, update the `base` in `vite.config.ts` accordingly.
