import os
from PIL import Image
import sys

# 설정
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
FULLSIZE_DIR = os.path.join(PROJECT_ROOT, 'assets', 'images', 'fullsize')
THUMBNAIL_DIR = os.path.join(PROJECT_ROOT, 'assets', 'images', 'thumbnails')
THUMBNAIL_SIZE = (800, 800)  # 최대 크기 (가로, 세로)

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directory created: {directory}")

def generate_thumbnails():
    ensure_dir(FULLSIZE_DIR)
    ensure_dir(THUMBNAIL_DIR)
    
    # 지원하는 이미지 확장자
    valid_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    
    count = 0
    # Collect data for gallery_data.js
    gallery_data = {}

    for root, dirs, files in os.walk(FULLSIZE_DIR):
        # Determine category from folder name
        rel_dir = os.path.relpath(root, FULLSIZE_DIR)
        if rel_dir == '.':
            continue
            
        category = rel_dir.lower().replace('\\', '/')
        if category == 'unsorted':
            continue

        images = []
        for filename in files:
            if os.path.splitext(filename)[1].lower() in valid_extensions:
                # 원본 파일 경로
                full_path = os.path.join(root, filename)
                
                # 상대 경로 계산 (예: nature/photo1.jpg)
                rel_path = os.path.relpath(full_path, FULLSIZE_DIR).replace('\\', '/')
                
                # 썸네일 저장 경로
                thumb_path = os.path.join(THUMBNAIL_DIR, rel_path)
                
                # 썸네일 저장 폴더가 없으면 생성
                ensure_dir(os.path.dirname(thumb_path))
                
                try:
                    with Image.open(full_path) as img:
                        # RGB로 변환 (PNG 투명도 이슈 방지)
                        if img.mode in ('RGBA', 'P'):
                            img = img.convert('RGB')
                        
                        # 이미 썸네일이 존재하면 건너뛰기 (성능 최적화)
                        if not os.path.exists(thumb_path):
                            img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
                            img.save(thumb_path, optimize=True, quality=85)
                            print(f"[OK] Generated: {rel_path}")
                            count += 1
                        
                        # Add to data list (using relative path or just filename if preferred, 
                        # but relative path is safer effectively)
                        # We just need the filename if we assume standard structure, 
                        # but let's store the relative path from fullsize dir for flexibility
                        images.append(filename)

                except Exception as e:
                    print(f"[ERROR] Failed to process {rel_path}: {e}")
        
        if images:
            gallery_data[category] = sorted(images)

    print(f"\nCompleted! {count} new thumbnails generated.")
    
    # Write gallery_data.js
    js_output_path = os.path.join(PROJECT_ROOT, 'assets', 'js', 'gallery_data.js')
    ensure_dir(os.path.dirname(js_output_path))
    
    import json
    with open(js_output_path, 'w', encoding='utf-8') as f:
        json_str = json.dumps(gallery_data, indent=4, ensure_ascii=False)
        f.write(f"const galleryData = {json_str};\n")
    
    print(f"Generated {js_output_path}")

if __name__ == "__main__":
    generate_thumbnails()
