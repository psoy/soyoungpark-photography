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
    
    files = [f for f in os.listdir(FULLSIZE_DIR) if os.path.splitext(f)[1].lower() in valid_extensions]
    
    if not files:
        print(f"No images found in {FULLSIZE_DIR}")
        print("Please put your original high-resolution photos in that folder first.")
        return

    print(f"Found {len(files)} images. Starting thumbnail generation...")
    
    count = 0
    for filename in files:
        full_path = os.path.join(FULLSIZE_DIR, filename)
        thumb_path = os.path.join(THUMBNAIL_DIR, filename)
        
        # 썸네일이 이미 있고 원본보다 최신이면 건너뛰기 (선택 사항, 여기선 덮어쓰기 or 존재 체크)
        # 간단하게: 이미 존재하면 건너뛰도록 할 수도 있지만, 
        # 원본이 바뀌었을 수도 있으니 그냥 덮어쓰거나 날짜 비교 등을 할 수 있음.
        # 여기서는 "항상 생성" 하되, 에러 처리만 함.
        
        try:
            with Image.open(full_path) as img:
                # RGB로 변환 (PNG 투명도 이슈 방지)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
                img.save(thumb_path, optimize=True, quality=85)
                print(f"[OK] Generated thumbnail for: {filename}")
                count += 1
        except Exception as e:
            print(f"[ERROR] Failed to process {filename}: {e}")

    print(f"\nCompleted! {count} thumbnails generated in 'assets/images/thumbnails'.")

if __name__ == "__main__":
    generate_thumbnails()
