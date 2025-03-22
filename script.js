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

//biblioteca jspdf e html2Canvas

function imprimir() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("landscape");

    const certificadoDiv = document.getElementById("certificado"); 

    html2canvas(certificadoDiv, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); 

        doc.addImage(imgData, "PNG", 0, 0, 297, 210); 

 

        abrirPDFParaImpressao(doc);
    });
}

function abrirPDFParaImpressao(doc) {
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement("iframe");

    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.onload = function () {
        iframe.contentWindow.print(); // Abre a tela de impressão
    };
}

