function gerarcertificado(){
var n = window.document.getElementById('nome')
var txt = window.document.getElementById('txt')
var res = String(n.value)

txt.innerHTML = res

}

function uploadImagem() {
    var up = document.getElementById('uploadimg');
    var imgDiv = document.getElementById('img');

    if (up.files.length > 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgDiv.innerHTML = `<img src="${e.target.result}">`; 
        };

        reader.readAsDataURL(up.files[0]);
    }
}


