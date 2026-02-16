// PWA Install Prompt Handler
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] Install prompt available');
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show custom install button after 3 seconds (non-intrusive)
    setTimeout(() => {
        showInstallPromotion();
    }, 3000);
});

function showInstallPromotion() {
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.innerHTML = '📱 Install App';
    installBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: rgba(26, 10, 46, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.95rem;
    z-index: 10001;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    animation: fadeInSlide 0.5s ease;
  `;

    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            return;
        }

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] User response: ${outcome}`);

        // Clear the deferred prompt
        deferredPrompt = null;

        // Remove the install button
        installBtn.remove();
    });

    installBtn.addEventListener('mouseenter', () => {
        installBtn.style.background = 'rgba(26, 10, 46, 1)';
        installBtn.style.transform = 'scale(1.05)';
    });

    installBtn.addEventListener('mouseleave', () => {
        installBtn.style.background = 'rgba(26, 10, 46, 0.95)';
        installBtn.style.transform = 'scale(1)';
    });

    document.body.appendChild(installBtn);

    // Auto-hide after 10 seconds if not clicked
    setTimeout(() => {
        if (installBtn.parentElement) {
            installBtn.style.opacity = '0';
            setTimeout(() => installBtn.remove(), 300);
        }
    }, 10000);
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

// Log when app is successfully installed
window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed!');
    deferredPrompt = null;
});
