from flask import Flask, send_from_directory
import os
import socket
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading

app = Flask(__name__, static_folder="public")
PORT = 8000
DIRECTORY = "public"

# Ensure the directory exists
os.makedirs(DIRECTORY, exist_ok=True)

# Get local IP address
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

# Flask routes
@app.route('/')
def serve_index():
    return send_from_directory(DIRECTORY, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(DIRECTORY, filename)

# Watchdog for live reload
class FileChangeHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return
        print(f"File changed: {event.src_path}")

observer = Observer()
observer.schedule(FileChangeHandler(), DIRECTORY, recursive=True)
observer.start()

def run_flask():
    app.run(host='0.0.0.0', port=PORT, debug=True, use_reloader=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, use_reloader=True)
    print(f"Serving on http://{local_ip}:{PORT}")
    try:
        while True:
            pass
    except KeyboardInterrupt:
        observer.stop()
observer.join()