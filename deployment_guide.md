# MSE Solar Calculator Deployment Guide 🚀

Your application is production-ready! Follow these steps to deploy it to the web and make it accessible to everyone.

## 1. Prerequisites
- A **GitHub / GitLab / Bitbucket** account.
- A **Vercel** account (Sign up at [vercel.com](https://vercel.com)).

## 2. Push to GitHub
1.  Initialize a repository in your project folder ($c:/Users/USER/Desktop/gravity solar calculator/app$).
2.  Commit all files (Except `.env.local`).
3.  Push the code to your GitHub repository.

## 3. Connect to Vercel
1.  In the Vercel Dashboard, click **Add New** > **Project**.
2.  Import your GitHub repository.
3.  **IMPORTANT:** Before clicking "Deploy", go to the **Environment Variables** section.
4.  Add the following variable exactly as it appears in your `.env.example`:
    - **Key:** `N8N_WEBHOOK_URL`
    - **Value:** Your n8n webhook URL.
5.  Click **Deploy**.

## 4. Post-Deployment Checks
- **Check the Live URL:** Vercel will give you a `.vercel.app` domain.
- **Verify Chat:** Ask the chatbot a question to ensure the environment variable is working correctly.
- **Verify Calculator:** Run a calculation to ensure the logic engine is active.

## 5. Custom Domain (Optional)
Once live, you can add your custom domain (e.g., `musstech.com`) in the **Settings > Domains** section of your Vercel project.

---
**Need help?** If you encounter any build errors on Vercel, copy the build logs and paste them here!
