// File handling
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
});

// Preset commands
function setPreset(type) {
    const presets = {
        compress: '-i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4',
        extract_audio: '-i input.mp4 -vn -c:a libmp3lame -b:a 192k output.mp3',
        resize: '-i input.mp4 -vf scale=1280:720 -c:a copy output.mp4',
        convert_mp4: '-i input.* -c:v libx264 -c:a aac output.mp4',
        thumbnail: '-i input.mp4 -ss 00:00:01 -vframes 1 thumbnail.jpg',
        gif: '-i input.mp4 -vf "fps=10,scale=320:-1:flags=lanczos" -t 10 output.gif'
    };
    
    document.getElementById('command').value = presets[type];
}

function setStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
}

function appendOutput(message) {
    const output = document.getElementById('output');
    output.textContent += message + '\n';
    output.scrollTop = output.scrollHeight;
}

function clearOutput() {
    document.getElementById('output').textContent = '';
}

async function executeCommand() {
    const fileInput = document.getElementById('fileInput');
    const command = document.getElementById('command').value;
    const workerUrl = document.getElementById('workerUrl').value;
    const apiPath = document.getElementById('apiPath').value;
    
    if (!fileInput.files[0]) {
        setStatus('Please select a file first', 'error');
        return;
    }
    
    if (!command.trim()) {
        setStatus('Please enter an FFmpeg command', 'error');
        return;
    }
    
    if (!workerUrl) {
        setStatus('Please enter your Worker URL', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const executeBtn = document.getElementById('executeBtn');
    
    executeBtn.disabled = true;
    executeBtn.textContent = '⏳ Processing...';
    setStatus('Uploading file and executing command...', 'processing');
    clearOutput();
    
    try {
        // Create FormData with file and command
        const formData = new FormData();
        formData.append('file', file);
        formData.append('command', command);
        
        appendOutput(`Uploading: ${file.name}`);
        appendOutput(`Command: ffmpeg ${command}`);
        appendOutput('Processing...\n');
        
        const response = await fetch(`${workerUrl}${apiPath}`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Handle different response types
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            appendOutput(JSON.stringify(result, null, 2));
            setStatus('Command executed successfully!', 'success');
        } else if (contentType && (contentType.includes('video/') || contentType.includes('audio/') || contentType.includes('image/'))) {
            // File download
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ffmpeg_output';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            appendOutput(`File processed successfully! (${(blob.size / 1024 / 1024).toFixed(2)} MB)`);
            setStatus('File processed and downloaded!', 'success');
        } else {
            const text = await response.text();
            appendOutput(text);
            setStatus('Command completed', 'success');
        }
        
    } catch (error) {
        appendOutput(`Error: ${error.message}`);
        setStatus(`Error: ${error.message}`, 'error');
    } finally {
        executeBtn.disabled = false;
        executeBtn.textContent = '🚀 Execute FFmpeg Command';
    }
}

// Auto-save configuration
document.addEventListener('DOMContentLoaded', function() {
    // Load saved configuration
    const savedUrl = localStorage.getItem('ffmpeg_worker_url');
    const savedPath = localStorage.getItem('ffmpeg_api_path');
    
    if (savedUrl) document.getElementById('workerUrl').value = savedUrl;
    if (savedPath) document.getElementById('apiPath').value = savedPath;
    
    // Save configuration on change
    document.getElementById('workerUrl').addEventListener('input', function(e) {
        localStorage.setItem('ffmpeg_worker_url', e.target.value);
    });
    
    document.getElementById('apiPath').addEventListener('input', function(e) {
        localStorage.setItem('ffmpeg_api_path', e.target.value);
    });
});