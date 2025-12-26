// Tutorials page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Handle download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorialItem = this.closest('.tutorial-item');
            const tutorialTitle = tutorialItem.querySelector('h3').textContent;

            // Show download notification
            showNotification(`Downloading: ${tutorialTitle}`);

            // In a real implementation, this would trigger an actual file download
            // For now, we'll just show a message
            setTimeout(() => {
                showNotification('Download complete!', 'success');
            }, 1500);
        });
    });

    // Handle preview buttons
    const previewBtns = document.querySelectorAll('.preview-btn');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tutorialItem = this.closest('.tutorial-item');
            const tutorialTitle = tutorialItem.querySelector('h3').textContent;

            showNotification(`Preview for: ${tutorialTitle}`, 'info');

            // In a real implementation, this would open a preview modal
            // For now, we'll just show a message
        });
    });
});

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
