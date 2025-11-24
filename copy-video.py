#!/usr/bin/env python3
import shutil
import sys
import os

source = '/Users/umbertogeraci/Desktop/projects media/hero-video.mp4'
dest = '/Users/umbertogeraci/Desktop/tenantwebsite-1/public/videos/hero-video.mp4'

print(f'Copying from: {source}')
print(f'To: {dest}')

try:
    # Ensure destination directory exists
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    
    # Remove existing file if it exists
    if os.path.exists(dest):
        os.remove(dest)
    
    # Copy file
    shutil.copy2(source, dest)
    
    # Verify copy
    if os.path.exists(dest):
        size = os.path.getsize(dest)
        print(f'Success! File copied. Size: {size} bytes')
        sys.exit(0)
    else:
        print('Error: File was not copied')
        sys.exit(1)
        
except Exception as e:
    print(f'Error: {e}')
    sys.exit(1)




