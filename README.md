# ISHE HQ Dashboard - Static Site

A modern CRM dashboard with neon styling, built as a standalone static HTML site for easy deployment.

## ✨ Features

- **Dark Neon Theme**: Electric cyan and magenta accent colors with a sleek dark background
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Dashboard**: Real-time tiles showing jobs, tasks, calendar, and inbox summaries
- **Rebecca AI Chat**: Intelligent chat interface with message sending functionality
- **Sidebar Navigation**: Collapsible sidebar with all major sections
- **WhatsApp Integration**: Basic WhatsApp integration stub ready for implementation
- **Voice Interface**: Speech recognition support (Chrome/Safari)
- **Floating Assistant**: Draggable Rebecca assistant avatar

## 🚀 Quick Start

The dashboard is ready to deploy as a static site. Simply serve the `index.html` file from any web server.

### Local Development

```bash
# Serve locally using Python
python3 -m http.server 8080

# Or using Node.js
npx serve .

# Or using PHP
php -S localhost:8080
```

Then open http://localhost:8080 in your browser.

## 🌐 Deployment

### Vercel
1. Fork this repository
2. Connect your Vercel account to GitHub
3. Import the project
4. Deploy - Vercel will automatically serve `index.html`

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect via Git and deploy
3. The `index.html` will be served automatically

### GitHub Pages
1. Push to a GitHub repository
2. Go to Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/repository-name`

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📱 Browser Compatibility

- ✅ Chrome/Chromium (Recommended for voice features)
- ✅ Safari
- ✅ Firefox
- ✅ Edge
- ⚠️ Speech Recognition requires Chrome/Safari for voice features

## 🎯 Key Components

- **Dashboard**: Overview with activity tiles and recent updates
- **Rebecca Chat**: AI assistant with contextual responses
- **Inbox**: Unified messaging (SMS, WhatsApp, Email)
- **Tasks**: Task management interface
- **Calendar**: Calendar view for scheduling
- **Customers**: Customer management
- **Jobs**: Job tracking and management
- **Vault**: File storage and management
- **Media**: AI media generation tools
- **Settings**: Application configuration

## 🔧 Customization

The dashboard uses CSS custom properties for easy theming:

```css
:root {
    --background: hsl(224, 71%, 4%);
    --primary: hsl(198, 93%, 60%);  /* Electric cyan */
    --accent: hsl(310, 90%, 60%);   /* Magenta */
    --foreground: hsl(210, 20%, 98%);
}
```

## 📋 To-Do / Roadmap

- [ ] Real AI integration for Rebecca
- [ ] WhatsApp Business API integration
- [ ] Real-time data connections
- [ ] User authentication
- [ ] Database connectivity
- [ ] Advanced calendar features
- [ ] File upload functionality

## 🔌 Integration Stubs

The dashboard includes integration stubs for:
- **WhatsApp Business API**: Ready for phone number and message handling
- **Voice Recognition**: Browser speech-to-text support
- **Rebecca AI**: Smart response system with contextual awareness

## 💡 Technical Details

- **Framework**: Pure HTML/CSS/JavaScript (no build process required)
- **Styling**: Custom CSS with utility classes (Tailwind-inspired)
- **Icons**: Inline SVG icons for optimal performance
- **Fonts**: Roboto Mono and Orbitron (loaded from Google Fonts)
- **Size**: ~47KB total (highly optimized)

## 📄 License

This project is part of the ISHE Empire Dashboard system.

---

*Ready for production deployment as a static site!*
