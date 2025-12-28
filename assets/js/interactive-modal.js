// Interactive Art Full-Screen Modal

document.addEventListener('DOMContentLoaded', function() {
    // Create modal HTML
    const modalHTML = `
        <div id="interactiveModal" class="interactive-modal">
            <div class="interactive-modal-content">
                <button class="interactive-modal-close" aria-label="Close">&times;</button>
                <div class="interactive-modal-header">
                    <h2 id="interactiveModalTitle"></h2>
                    <a id="interactiveModalLink" href="#" target="_blank" class="open-new-tab">
                        Open in New Tab ↗
                    </a>
                </div>
                <div class="interactive-modal-body">
                    <iframe id="interactiveModalIframe" src="" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('interactiveModal');
    const modalTitle = document.getElementById('interactiveModalTitle');
    const modalIframe = document.getElementById('interactiveModalIframe');
    const modalLink = document.getElementById('interactiveModalLink');
    const closeBtn = document.querySelector('.interactive-modal-close');

    // Function to open modal
    window.openInteractiveModal = function(url, title) {
        modalTitle.textContent = title;
        modalIframe.src = url;
        modalLink.href = url;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Add click handlers to interactive art items
    const interactiveItems = document.querySelectorAll('.interactive-art-item');
    interactiveItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.dataset.url;
            const title = this.dataset.title;
            openInteractiveModal(url, title);
        });
    });
});
