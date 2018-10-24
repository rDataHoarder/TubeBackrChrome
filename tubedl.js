/**
 * by: tom
 * created on: 10/23/18
 */
let but;

window.onload = function () {
    createButton();
};

async function loadVideoDown() {
    chrome.storage.sync.get({
        value: true
    }, async function (items) {
        try {
            const url = items.value + '/load?url=' + window.location.href;
            const res = await fetch(url, {
                method: 'POST'
            });
            if (res.status === 200) {
                but.textContent = '✓';
                but.disabled = true;
                but.style.backgroundColor = 'grey';
            } else {
                throw new Error('Non 200 Code returned');
            }
        } catch (e) {
            but.style.color = 'red';
            but.textContent = 'x';
        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    but.remove();
    createButton();
});

function createButton() {
    const subscriptionButton = document.getElementsByTagName('ytd-subscribe-button-renderer');
    const btn = document.createElement('BUTTON');
    btn.onclick = loadVideoDown;
    btn.style.width = '36px';
    btn.style.height = '36px';
    btn.textContent = '↓';
    btn.style.borderRadius = '5px';
    btn.style.fontSize = '24px';
    btn.style.backgroundColor = 'hsl(0, 0%, 93.3%)';
    btn.style.margin = 'auto var(--ytd-subscribe-button-margin, 4px)';
    btn.id = 'downloadVideoButtonTubeBackr';
    but = btn;
    //Some pages do not have the sub button
    if (subscriptionButton[0]) subscriptionButton[0].appendChild(btn);
    else if (window.location.href.includes('youtube.com/watch?v=')) {
        //wait some seconds so the button has time to render
        setTimeout(function () {
            but.remove();
            createButton();
        }, 2000);
    }
}