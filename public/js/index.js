// POST files to /uploads
function uploadFiles(files) {
    var formData = new FormData();
    for(var i = 0; i < files.length; i++) {
        formData.append("photos[" + i + "]", files[i]);
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function(result) {
        var response = JSON.parse(result.target.responseText);
        if (response.error == false) {
            var url = window.top.location.host+'/'+response.folderId;
            var urlBox = document.getElementById("url");
            urlBox.classList.remove("hide");
            urlBox.value = url;
            urlBox.select().focus();
        }
    };

    xhr.open('POST', '/upload', true);
    xhr.send(formData);
    return true;
}

// Stop event defaults
function stop(e) {
    e.stopPropagation();
    e.preventDefault();
}

document.addEventListener('DOMContentLoaded',function(){

    var body = document.getElementsByTagName("body")[0];
    var dropbox = document.getElementById('upload-zone');

    body.addEventListener('dragenter', function(e) {
        var files = e.dataTransfer.files;
        dropbox.style.opacity = "0.5";
        stop(e);
    });

    body.addEventListener('dragover', function(e) {
        dropbox.style.opacity = "0.5";
        stop(e);
    });

    body.addEventListener('dragleave', function(e) {
        dropbox.style.opacity = "1.0";
        stop(e);
    });

    body.addEventListener('drop', function(e) {
        var files = e.dataTransfer.files;
        dropbox.style.opacity = "1.0";
        stop(e);
        uploadFiles(files);
    });

});