# FFmpeg Container Interface

A modern web interface for interacting with FFmpeg containers deployed on Cloudflare.

## 🚀 Features

- **File Upload Interface** - Drag and drop or click to upload media files
- **Preset Commands** - Quick access to common FFmpeg operations
- **Custom Commands** - Full control with custom FFmpeg command input
- **Real-time Output** - Live terminal-style output display
- **File Downloads** - Download processed media files directly
- **Configuration Storage** - Saves your Worker URL settings locally

## 📦 Preset Operations

- **📦 Compress Video** - Reduce file size with optimal quality
- **🎵 Extract Audio** - Extract audio tracks from videos
- **📏 Resize Video** - Change video dimensions
- **🔄 Convert to MP4** - Convert any video format to MP4
- **🖼️ Generate Thumbnail** - Create preview images from videos
- **🎞️ Create GIF** - Convert video segments to animated GIFs

## 🛠️ Setup

### Deploy to Cloudflare Pages

1. **Connect Repository**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages**
   - Click **"Create application"** → **"Pages"**
   - Connect this GitHub repository

2. **Configure Build Settings**:
   - **Framework preset**: None (Static HTML)
   - **Build command**: (leave empty)
   - **Build output directory**: `/` (root)

3. **Deploy**: Click **"Save and Deploy"**

### Configure Your FFmpeg Worker

In the interface, you'll need to enter:
- **Worker URL**: Your FFmpeg container worker URL
- **API Path**: The endpoint path (typically `/api/ffmpeg`)

## 🏗️ Project Structure

```
ffmpeg-interface/
├── index.html          # Main HTML interface
├── styles.css          # Styling and animations
├── script.js           # JavaScript functionality
├── _headers            # Security headers (optional)
└── README.md           # This file
```

## 🔧 Technical Details

### Frontend Technologies
- **HTML5** - Modern semantic markup
- **CSS3** - Gradient backgrounds, animations, responsive design
- **Vanilla JavaScript** - No dependencies, modern ES6+ syntax
- **File API** - Handle file uploads
- **Fetch API** - Communicate with FFmpeg containers

### Security Features
- **Input Validation** - Client-side validation for file types and commands
- **Local Storage** - Secure client-side configuration persistence
- **HTTPS Enforcement** - Cloudflare Pages provides automatic HTTPS

## 🎨 Design Features

- **Dark Theme** - Modern terminal-inspired design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and transitions
- **Terminal Output** - Matrix-style green-on-black console
- **Status Indicators** - Color-coded success/error/processing states

## 🚀 Usage

1. **Configure Connection**:
   - Enter your FFmpeg Worker URL
   - Set the API endpoint path

2. **Upload Media File**:
   - Click "Choose File" or drag & drop
   - Supports video, audio, and image formats

3. **Select Operation**:
   - Click a preset button for common tasks
   - Or enter custom FFmpeg commands

4. **Execute**:
   - Click "Execute FFmpeg Command"
   - Watch real-time output
   - Download processed files

## 🔗 Related Projects

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the Cloudflare ecosystem