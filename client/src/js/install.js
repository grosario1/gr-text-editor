const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the installation prompt event
    window.deferredPrompt = event;
    // Show the install button
    butInstall.classList.remove('hidden');
});

// Click event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Prompt the user to install the PWA
    promptEvent.prompt();
    // Reset the deferredPrompt
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.classList.add('hidden');
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Reset the deferredPrompt when the PWA is installed
    window.deferredPrompt = null;
});

