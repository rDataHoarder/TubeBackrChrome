//Chrome Extension Version
//Used to check compatibility
let v = 1;

function save_options() {
    chrome.storage.sync.set({
        value: document.getElementById('host').value
    }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        value: true
    }, function(items) {
        document.getElementById('host').value = items.value || null;
    });
}


document.getElementById('testbtn').addEventListener("click", test);

async function test() {
    try {
        const data = await (await fetch(document.getElementById('host').value + '/v')).json();
        if(v < data.neededV){
            alert('Please Upgrade the extension to use it with this TubeBackr Version!')
        }else if(data.version){
            alert('Reached TubeBackr v' + data.version);
        }else {
            alert('A service responded, but it wasn\'t TubeBackr.');
        }
    }catch (e){
        alert('Connection error. \r' + e.message);
    }

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);