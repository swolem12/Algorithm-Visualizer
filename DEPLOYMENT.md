# Deployment Guide

## Quick Deploy to GitHub Pages

Your Algorithm Atlas is ready to deploy! Follow these steps:

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Algorithm Atlas web app"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/swolem12/Algorithm-Visualizer
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. The GitHub Actions workflow will automatically deploy on every push to `main`

### Step 3: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once complete (green checkmark), your site will be live at:
   ```
   https://swolem12.github.io/Algorithm-Visualizer/
   ```

## Local Development

### Start Development Server
```bash
npm run dev
```
App runs at `http://localhost:5173/Algorithm-Visualizer/`

### Build for Production
```bash
npm run build
```
Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## Manual Deployment (Alternative)

If you want to deploy manually without GitHub Actions:

```bash
# Install gh-pages globally
npm install -g gh-pages

# Build and deploy
npm run build
gh-pages -d dist
```

## Troubleshooting

### Build Fails
- Check Node.js version: `node -v` (should be 18+)
- Delete `node_modules/` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

### GitHub Pages Not Working
- Ensure "Source" is set to "GitHub Actions" in Settings > Pages
- Check Actions tab for error messages
- Verify the base path in `vite.config.ts` matches your repo name

### Paths Not Working
- The `base` in `vite.config.ts` should match your GitHub repository name
- Current setting: `base: '/Algorithm-Visualizer/'`

## Customization

### Change Repository Name
If you rename your repo, update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/your-new-repo-name/',
  // ...
})
```

### Custom Domain
1. Add a `CNAME` file to `public/` directory with your domain
2. Configure DNS with your domain provider
3. Enable custom domain in GitHub Pages settings

## Performance Tips

- Images are automatically optimized by Vite
- Code splitting is automatic for route-based components
- Tailwind CSS purges unused styles in production
- Gzip compression is handled by GitHub Pages

## Monitoring

After deployment, monitor:
- **Traffic**: GitHub repository Insights > Traffic
- **Actions**: Success/failure of deployments
- **Issues**: User-reported problems

## Updates

To update your deployed site:
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to `main` branch
4. GitHub Actions automatically rebuilds and redeploys

---

**That's it! Your Algorithm Atlas is now live and updating automatically.** 🚀
