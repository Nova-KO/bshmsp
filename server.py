#!/usr/bin/env python3
"""
Simple HTTP server with clean URL support for static websites.
Maps /page to page.html automatically.
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        print(f"Requested path: {path}")
        
        # If the path ends with '/', try to serve index.html
        if path.endswith('/'):
            if path == '/':
                path = '/index.html'
            else:
                path = path + 'index.html'
        # If the path doesn't have an extension and doesn't contain a dot, try to serve .html version
        elif '.' not in os.path.basename(path) and not path.endswith('/'):
            # Check if the .html file exists
            potential_html = path + '.html'
            print(f"Checking for file: .{potential_html}")
            
            if os.path.isfile('.' + potential_html):
                path = potential_html
                print(f"Found file, serving: {path}")
            else:
                print(f"File not found: .{potential_html}")
        
        # Update the path for the request
        self.path = path
        print(f"Final path to serve: {path}")
        
        # Call the parent's do_GET method
        return super().do_GET()

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 1222
    
    print(f"Starting server on port {port}")
    print(f"Current directory: {os.getcwd()}")
    print(f"Files in directory: {os.listdir('.')}")
    
    try:
        with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
            print(f"Server running at http://localhost:{port}/")
            print("Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    main() 