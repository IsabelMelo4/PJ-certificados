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

function imprimir() {
    const nome = document.getElementById("nome").value.trim();
    

//biblioteca jspdf
    const alunoImagemInput = document.getElementById("uploadimg"); 
    const alunoImagemPreview = document.getElementById("img"); 

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("landscape");

    const img = new Image();
    img.src = "assets/Certificado enccri.png";

    img.onload = function () {
        doc.addImage(img, "PNG", 0, 0, 297, 210); 


        
        doc.setFont("helvetica", "bold");
        let fontSize = 40;
        doc.setFontSize(fontSize);
        doc.setTextColor(82, 113, 255); 

        while (doc.getTextWidth(nome) > 80 && fontSize > 30) {
            fontSize--;
            doc.setFontSize(fontSize);
        }

        
        let x = 200; 
        let y = 90;  

        doc.text(nome, x, y, { align: "center" });
        const alunoImagemInput = document.getElementById("uploadimg");

        if (alunoImagemInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const alunoFotoBase64 = e.target.result;
    
                const alunoImagemDiv = document.getElementById("img"); 
                const divWidth = alunoImagemDiv.offsetWidth; 
                const divHeight = alunoImagemDiv.offsetHeight;
    
                const xFoto = 55; 
                const yFoto = 140; 
    
                const imgElement = new Image();
                imgElement.src = alunoFotoBase64;
    
                imgElement.onload = function () {
                    const imgWidth = imgElement.width;
                    const imgHeight = imgElement.height;
    
              
                    let ratio = Math.min(divWidth / imgWidth, divHeight / imgHeight);
    
                 
                    let newWidth = imgWidth * ratio;
                    let newHeight = imgHeight * ratio;
    
                    
                    let scaleFactor = 0.9;  
                    newWidth *= scaleFactor;
                    newHeight *= scaleFactor;
    
                   
                    doc.addImage(alunoFotoBase64, "PNG", xFoto, yFoto, newWidth, newHeight, undefined, "FAST");
    
                    imprimirPDF(doc);
                };
            };
            reader.readAsDataURL(alunoImagemInput.files[0]);
        } else {
            imprimirPDF(doc);
        }
    };
    
    function imprimirPDF(doc) {
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const iframe = document.createElement("iframe");
    
        iframe.style.display = "none";
        iframe.src = pdfUrl;
        document.body.appendChild(iframe);
    
        iframe.onload = function () {
            iframe.contentWindow.print();
        };
    }
}