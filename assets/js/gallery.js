// ============================================
// Gallery & Lightbox JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    // const lightboxTriggers = document.querySelectorAll('.lightbox-trigger'); // Moved to after dynamic loading

    let currentImages = [];
    let currentIndex = 0;

    // Determine Asset Base Path (default to '../' for collection pages, '' for root)
    const assetBase = (typeof window.ASSET_PATH !== 'undefined') ? window.ASSET_PATH : '../';

    // Gallery Loading Logic
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && typeof galleryData !== 'undefined') {
        const pageId = galleryGrid.id.replace('Gallery', ''); // nature, urban, portraits, travel
        const images = galleryData[pageId] || [];

        if (pageId === 'latest') {
            // For Latest Photos (Seoul by iphone11), pick 6 random images from 'seoul' category
            const sourceCategory = 'seoul';
            if (galleryData[sourceCategory] && galleryData[sourceCategory].length > 0) {
                const allImages = galleryData[sourceCategory];
                // Shuffle and pick 6
                const shuffled = [...allImages].sort(() => 0.5 - Math.random());
                const selectedImages = shuffled.slice(0, 6);

                galleryGrid.innerHTML = selectedImages.map(filename => {
                    const fullPath = `${assetBase}assets/images/fullsize/${sourceCategory}/${filename}`;
                    const thumbPath = `${assetBase}assets/images/thumbnails/${sourceCategory}/${filename}`;
                    return `
                    <div class="gallery-item">
                        <a href="${fullPath}" class="lightbox-trigger" data-lightbox="latest">
                            <img src="${thumbPath}" alt="Latest photo" loading="lazy">
                        </a>
                    </div>
                    `;
                }).join('');
            }
        } else if (images.length > 0) {
            galleryGrid.innerHTML = images.map(filename => {
                const fullPath = `${assetBase}assets/images/fullsize/${pageId}/${filename}`;
                const thumbPath = `${assetBase}assets/images/thumbnails/${pageId}/${filename}`;
                return `
                <div class="gallery-item">
                    <a href="${fullPath}" class="lightbox-trigger" data-lightbox="${pageId}">
                        <img src="${thumbPath}" alt="${pageId} photo" loading="lazy">
                    </a>
                </div>
                `;
            }).join('');

            // Re-select triggers after dynamic insertion
            // Note: lightboxTriggers is a const nodeList from earlier, we need to re-query or organize code order
        }
    }
    // End of Gallery Loading Logic

    // 2. Collection Index Page (Update Cover Images)
    const collectionCards = document.querySelectorAll('.collection-card');
    if (collectionCards.length > 0 && typeof galleryData !== 'undefined') {
        collectionCards.forEach(card => {
            const link = card.querySelector('a');
            if (link) {
                const href = link.getAttribute('href'); // e.g., "travel.html" or "collections/travel.html"
                const filename = href.split('/').pop();
                const category = filename.replace('.html', ''); // "travel"

                if (galleryData[category] && galleryData[category].length > 0) {
                    // Pick the first image for consistency
                    const firstImage = galleryData[category][0];
                    const img = card.querySelector('img');
                    if (img) {
                        img.src = `${assetBase}assets/images/thumbnails/${category}/${firstImage}`;
                    }
                }
            }
        });
    }

    // Re-query triggers after potential dynamic content loading
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 라이트박스 닫기
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 라이트박스 이미지 업데이트
    function updateLightboxImage() {
        if (currentImages.length > 0) {
            const currentImage = currentImages[currentIndex];
            lightboxImage.src = currentImage.href;
            lightboxImage.alt = currentImage.querySelector('img').alt || '';
            lightboxCaption.textContent = currentImage.querySelector('img').alt || '';
        }
    }

    // 이전 이미지
    function showPrevImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxImage();
        }
    }

    // 다음 이미지
    function showNextImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightboxImage();
        }
    }

    // 라이트박스 트리거 이벤트
    lightboxTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();

            // 같은 data-lightbox 속성을 가진 모든 이미지 수집
            const lightboxGroup = this.getAttribute('data-lightbox');
            const groupImages = Array.from(document.querySelectorAll(`[data-lightbox="${lightboxGroup}"]`));

            // 현재 클릭한 이미지의 인덱스 찾기
            const clickedIndex = groupImages.indexOf(this);

            openLightbox(groupImages, clickedIndex);
        });
    });

    // 닫기 버튼
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // 이전 버튼
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    // 다음 버튼
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // 배경 클릭 시 닫기
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 키보드 네비게이션
    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // 이미지 지연 로딩 (Intersection Observer)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

