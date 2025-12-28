import os
import re
from pathlib import Path

def rename_graphic_design_files():
    """Rename graphic design files with AI tool prefix"""
    folder = Path('assets/images/ai-creations/graphic-design')

    # Get all image files (excluding HTML files)
    image_files = []
    for ext in ['*.png', '*.jpg', '*.jpeg']:
        image_files.extend(folder.glob(ext))

    # Sort by filename
    image_files.sort()

    chatgpt_counter = 1
    gemini_counter = 1
    other_counter = 1

    for file in image_files:
        # Skip if already renamed with AI prefix
        if re.match(r'(chatgpt|gemini|dalle|midjourney)-', file.name.lower()):
            print(f'Already renamed: {file.name}')
            continue

        # Get extension
        ext = file.suffix

        # Determine AI tool and new name
        if 'ChatGPT' in file.name or 'chatgpt' in file.name.lower():
            new_name = f'chatgpt-design-{chatgpt_counter:02d}{ext}'
            chatgpt_counter += 1
        elif 'Gemini' in file.name or 'gemini' in file.name.lower():
            new_name = f'gemini-design-{gemini_counter:02d}{ext}'
            gemini_counter += 1
        elif 'dalle' in file.name.lower():
            new_name = f'dalle-design-{other_counter:02d}{ext}'
            other_counter += 1
        elif 'midjourney' in file.name.lower():
            new_name = f'midjourney-design-{other_counter:02d}{ext}'
            other_counter += 1
        else:
            new_name = f'ai-design-{other_counter:02d}{ext}'
            other_counter += 1

        new_path = folder / new_name

        # Rename
        print(f'Renaming: {file.name}')
        print(f'      -> {new_name}')
        file.rename(new_path)

    total = chatgpt_counter + gemini_counter + other_counter - 3
    print(f'\nRenamed {total} graphic design files')
    print(f'  - ChatGPT: {chatgpt_counter - 1}')
    print(f'  - Gemini: {gemini_counter - 1}')
    print(f'  - Other: {other_counter - 1}')
    return total

def rename_short_films():
    """Rename short film files with AI tool prefix"""
    folder = Path('assets/images/ai-creations/short-films')

    if not folder.exists():
        print('Short films folder does not exist')
        return 0

    # Get all video files
    video_files = []
    for ext in ['*.mp4', '*.mov', '*.avi', '*.webm']:
        video_files.extend(folder.glob(ext))

    video_files.sort()

    sora_counter = 1
    other_counter = 1

    for file in video_files:
        # Skip if already renamed with AI prefix
        if re.match(r'(sora|runway|pika)-', file.name.lower()):
            print(f'Already renamed: {file.name}')
            continue

        # Get extension
        ext = file.suffix

        # Determine AI tool and create descriptive name
        if 'sora' in file.name.lower():
            if 'holiday' in file.name.lower():
                new_name = f'sora-holiday-{sora_counter:02d}{ext}'
            else:
                new_name = f'sora-video-{sora_counter:02d}{ext}'
            sora_counter += 1
        elif 'runway' in file.name.lower():
            new_name = f'runway-video-{other_counter:02d}{ext}'
            other_counter += 1
        elif 'pika' in file.name.lower():
            new_name = f'pika-video-{other_counter:02d}{ext}'
            other_counter += 1
        else:
            new_name = f'ai-video-{other_counter:02d}{ext}'
            other_counter += 1

        new_path = folder / new_name

        # Rename
        print(f'Renaming: {file.name}')
        print(f'      -> {new_name}')
        file.rename(new_path)

    total = sora_counter + other_counter - 2
    print(f'\nRenamed {total} video files')
    print(f'  - Sora: {sora_counter - 1}')
    print(f'  - Other: {other_counter - 1}')
    return total

if __name__ == '__main__':
    print('=' * 70)
    print(' AI Creations File Renamer - with AI Tool Attribution')
    print('=' * 70)
    print()

    # Rename graphic design files
    print('1. Renaming Graphic Design Files...')
    print('-' * 70)
    graphic_count = rename_graphic_design_files()

    print()

    # Rename short films
    print('2. Renaming Short Films...')
    print('-' * 70)
    video_count = rename_short_films()

    print()
    print('=' * 70)
    print(f'Complete! Renamed {graphic_count} images and {video_count} videos')
    print('=' * 70)
    print()
    print('File naming pattern:')
    print('  - ChatGPT images: chatgpt-design-01.png, chatgpt-design-02.png, ...')
    print('  - Gemini images: gemini-design-01.png, gemini-design-02.png, ...')
    print('  - Sora videos: sora-holiday-01.mp4, sora-video-01.mp4, ...')
    print('=' * 70)
