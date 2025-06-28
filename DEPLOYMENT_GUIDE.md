# PhotoRestore AI - Render Deployment Guide

## Step-by-Step Deployment to Render via GitHub

### Prerequisites
- GitHub account
- Render account (free tier available)
- Your project code ready

### Step 1: Prepare Your GitHub Repository

1. **Create a new GitHub repository:**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it: `photorestore-ai`
   - Set it to Public
   - Don't initialize with README (you'll push existing code)
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit - PhotoRestore AI application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/photorestore-ai.git
   git push -u origin main
   ```

### Step 2: Set Up Render Account

1. **Sign up for Render:**
   - Go to [render.com](https://render.com)
   - Click "Get Started for Free"
   - Sign up with GitHub (recommended)
   - Connect your GitHub account

### Step 3: Deploy on Render

1. **Create a new Web Service:**
   - Login to Render dashboard
   - Click "New +" button
   - Select "Web Service"

2. **Connect your GitHub repository:**
   - Choose "Build and deploy from a Git repository"
   - Click "Connect" next to your GitHub account
   - Select the `photorestore-ai` repository
   - Click "Connect"

3. **Configure deployment settings:**
   ```
   Name: photorestore-ai
   Environment: Node
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: (leave blank)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run start
   ```

4. **Set up Environment Variables:**
   - Scroll down to "Environment Variables"
   - Add the following variables:
   ```
   NODE_ENV = production
   OPENAI_API_KEY = your_openai_api_key_here
   REPLICATE_API_TOKEN = your_replicate_token_here
   ```

5. **Advanced Settings:**
   - Instance Type: Free (for testing)
   - Auto-Deploy: Yes (automatically deploy when you push to GitHub)

6. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-5 minutes)

### Step 4: Configure API Keys

1. **Get OpenAI API Key (Optional - for fallback):**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up/login
   - Go to API Keys section
   - Create new secret key
   - Copy the key

2. **Get Replicate API Token (Optional - for advanced features):**
   - Go to [replicate.com](https://replicate.com)
   - Sign up/login
   - Go to Account settings
   - Copy your API token

3. **Add keys to Render:**
   - In Render dashboard, go to your service
   - Click "Environment" tab
   - Update the API key values
   - Click "Save Changes"

### Step 5: Verify Deployment

1. **Check your live site:**
   - Render will provide a URL like: `https://photorestore-ai.onrender.com`
   - Click the URL to view your live application

2. **Test functionality:**
   - Upload a photo to test the colorization
   - Check contact form
   - Verify all pages load correctly

### Step 6: Custom Domain (Optional)

1. **Add custom domain:**
   - In Render dashboard, go to "Settings" tab
   - Scroll to "Custom Domains"
   - Add your domain name
   - Follow DNS setup instructions

### Important Notes

- **Free tier limitations:**
  - App may sleep after 15 minutes of inactivity
  - 750 hours/month limit
  - Slower cold starts

- **Upgrade to paid plan for:**
  - 24/7 uptime
  - Faster performance
  - Custom domains with SSL
  - More resources

### Troubleshooting

1. **Build fails:**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **App doesn't start:**
   - Check if start command is correct
   - Verify port configuration (Render auto-assigns)
   - Check runtime logs

3. **Environment variables:**
   - API keys must be set in Render dashboard
   - Don't commit API keys to GitHub
   - Check variable names match exactly

### File Structure for Deployment

Your project should have these key files for Render:
```
├── package.json (with build/start scripts)
├── render.yaml (optional, for configuration)
├── client/ (frontend files)
├── server/ (backend files)
├── shared/ (shared types)
└── uploads/ (will be created on server)
```

### Support

- Render documentation: [render.com/docs](https://render.com/docs)
- GitHub Pages: [docs.github.com](https://docs.github.com)
- Contact: prajwalramteke616@gmail.com