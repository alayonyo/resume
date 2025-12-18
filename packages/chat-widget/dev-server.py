#!/usr/bin/env python3
"""Simple HTTP server with CORS support for development"""
import http.server
import socketserver
from pathlib import Path

PORT = 3001
DIRECTORY = Path(__file__).parent / "dist"

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("0.0.0.0", PORT), CORSRequestHandler) as httpd:
        print(f"🚀 Chat widget dev server running at http://localhost:{PORT}/")
        print(f"📁 Serving files from: {DIRECTORY}")
        print(f"✅ CORS enabled for all origins")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
