document.getElementById("caixa").addEventListener("input", function () {
    const nome = this.value.trim();
    const nomeElemento = document.getElementById("nome");

    if (nome === "") {
        nomeElemento.textContent = "Seu nome aqui";
        nomeElemento.style.fontSize = "50px"; 
        return;
    }

    nomeElemento.textContent = nome;

    let fontSize = 50;
    nomeElemento.style.fontSize = fontSize + "px";

    while (nomeElemento.scrollWidth > 600 && fontSize > 10) { 
        fontSize--;
        nomeElemento.style.fontSize = fontSize + "px";
    }
});

function gerarCertificado() {
    const nome = document.getElementById("caixa").value.trim();
    
  
//ISSO AQUI É A BIBLIOTECA JSPDF
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
    
        while (doc.getTextWidth(nome) > 180 && fontSize > 10) {
            fontSize--;
            doc.setFontSize(fontSize);
        }

       
        doc.text(nome, 200, 90, { align: "center" });
        
        doc.autoPrint();
       window.open(doc.output("bloburl"), "_blank");
    };

    
}
