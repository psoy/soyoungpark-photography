import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
FULLSIZE_DIR = os.path.join(PROJECT_ROOT, 'assets', 'images', 'fullsize')
THUMBNAIL_DIR = os.path.join(PROJECT_ROOT, 'assets', 'images', 'thumbnails')

def rename_images():
    categories = ['nature', 'urban', 'portraits', 'travel', 'seoul']
    
    for category in categories:
        cat_dir = os.path.join(FULLSIZE_DIR, category)
        if not os.path.exists(cat_dir):
            continue
            
        print(f"Processing {category}...")
        files = sorted([f for f in os.listdir(cat_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        
        # Step 1: Rename all to temporary unique names to avoid collisions
        import uuid
        temp_map = []
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext == '.jpeg': ext = '.jpg'
            temp_name = f"temp_{uuid.uuid4().hex}{ext}"
            
            old_path = os.path.join(cat_dir, filename)
            temp_path = os.path.join(cat_dir, temp_name)
            
            os.rename(old_path, temp_path)
            temp_map.append(temp_name)
            
        # Step 2: Rename from temp to final names
        # temp_map preserves the original sorted order
        for i, temp_name in enumerate(temp_map, 1):
             new_name = f"{category}-{i}{os.path.splitext(temp_name)[1]}"
             
             temp_path = os.path.join(cat_dir, temp_name)
             new_path = os.path.join(cat_dir, new_name)
             
             os.rename(temp_path, new_path)
             print(f"Renamed: {temp_name} -> {new_name}")

    print("Renaming complete. Cleaning up old thumbnails...")
    # Optional: Delete thumbnails/category folders to force regeneration
    import shutil
    for category in categories:
        thumb_cat_dir = os.path.join(THUMBNAIL_DIR, category)
        if os.path.exists(thumb_cat_dir):
            shutil.rmtree(thumb_cat_dir)
            print(f"Removed old thumbnails: {thumb_cat_dir}")

if __name__ == "__main__":
    rename_images()
