//storage keys
var sessionJawabanAsliKey = "JAWABAN_ASLI", localJumlahBenarKey = "JUMLAH_BENAR", localJumlahSalahKey = "JUMLAH_SALAH";
// Buttons
var button1 = document.getElementById("button1"), button2 = document.getElementById("button2"), button3 = document.getElementById("button3"), buttonHint = document.getElementById("button-hint"), buttonHapusRecord = document.getElementById("button-hapus-record");
//Containers
var containerPesan = document.querySelector(".container-pesan"), containerButton = document.getElementById("container-button-tebakan"), listTebakan = document.querySelector(".container-item-list-tebakan");
//Fields
var fieldJawaban = document.getElementById("field-tebakan"), pesan = document.getElementById("pesan"), textJumlahTebakanBenar = document.getElementById("text-jumlah-tebakan-benar"), textJumlahTebakanSalah = document.getElementById("text-jumlah-tebakan-salah");
function generateJawaban() {
    var arrJawaban = [1, 2, 3];
    for (var i = 0; i < arrJawaban.length; i++) {
        arrJawaban[i] = Math.round(Math.random() * 2 + 1);
    }
    sessionStorage.setItem(sessionJawabanAsliKey, arrJawaban.join(""));
}
var tebakanUser = [];
var salah = 0;
var hint = false;
var index = -1;
var indexHintBenar = [];
var sessionJawaban = sessionStorage.getItem(sessionJawabanAsliKey);
function generateLocalJumlahTebakan() {
    if (localStorage.length === 0) {
        localStorage.setItem(localJumlahBenarKey, "0");
    }
}
function generateJumlahSalah() {
    if (localStorage.getItem(localJumlahSalahKey) === null) {
        localStorage.setItem(localJumlahSalahKey, "0");
    }
}
window.addEventListener("DOMContentLoaded", function () {
    if (typeof Storage !== "undefined") {
        generateJawaban();
        generateLocalJumlahTebakan();
        generateJumlahSalah();
        displayJumlahBenar();
        displayJumlahSalah();
    }
});
button1.addEventListener("click", function () {
    tebakanUser.push(1);
    fieldJawaban.innerText = tebakanUser.join("");
    checkHintJawaban();
    cekJawaban();
});
button2.addEventListener("click", function () {
    tebakanUser.push(2);
    fieldJawaban.innerText = tebakanUser.join("");
    checkHintJawaban();
    cekJawaban();
});
button3.addEventListener("click", function () {
    tebakanUser.push(3);
    fieldJawaban.innerText = tebakanUser.join("");
    checkHintJawaban();
    cekJawaban();
});
buttonHint.addEventListener("click", function () {
    if (hint) {
        hint = false;
        pesan.setAttribute("hidden", "");
        buttonHint.style.color = "black";
    }
    else {
        hint = true;
        pesan.removeAttribute("hidden");
        pesan.textContent = "Hint aktif";
        buttonHint.style.color = "yellow";
    }
});
buttonHapusRecord.addEventListener("click", function () {
    localStorage.removeItem(localJumlahBenarKey);
    localStorage.removeItem(localJumlahSalahKey);
    location.reload();
});
function cekJawaban() {
    var jawabanAsli = sessionStorage.getItem(sessionJawabanAsliKey);
    if (tebakanUser.length === 3) {
        if (jawabanAsli == tebakanUser.join("")) {
            aturFieldTebakan();
            tambahJumlahTebakanBenar();
            displayJumlahBenar();
            updateJumlahSalah(salah);
        }
        else {
            salah = salah + 1;
            displayListSalah();
            for (var i = 0; i < 3; i++) {
                tebakanUser.pop();
            }
            fieldJawaban.innerText = tebakanUser.join("");
        }
    }
}
function aturFieldTebakan() {
    pesan.textContent = "Benar :)";
    pesan.style.color = "green";
    pesan.style.fontSize = "3rem";
    pesan.style.marginTop = "0";
    pesan.removeAttribute("hidden");
    containerButton.style.display = "none";
    var mulaiUlang = document.createElement("h5");
    mulaiUlang.textContent = "Refresh untuk bermain lagi";
    var buttonRefresh = document.createElement("button");
    buttonRefresh.textContent = "Refresh";
    buttonRefresh.classList.add("button-refresh");
    buttonRefresh.addEventListener("click", function () {
        location.reload();
    });
    containerPesan.appendChild(buttonRefresh);
    containerPesan.appendChild(mulaiUlang);
}
function tambahJumlahTebakanBenar() {
    var angka = localStorage.getItem(localJumlahBenarKey);
    if (angka !== null) {
        var angkaBaru = parseInt(angka) + 1;
        localStorage.setItem(localJumlahBenarKey, angkaBaru.toString());
    }
}
function displayJumlahBenar() {
    textJumlahTebakanBenar.textContent =
        localStorage.getItem(localJumlahBenarKey);
}
function displayJumlahSalah() {
    textJumlahTebakanSalah.textContent =
        localStorage.getItem(localJumlahSalahKey);
}
function displayListSalah() {
    var itemSalah = document.createElement("p");
    itemSalah.textContent = tebakanUser.join("");
    itemSalah.setAttribute("class", "item-list-tebakan");
    listTebakan.appendChild(itemSalah);
}
function updateJumlahSalah(num) {
    var salahLocal = localStorage.getItem(localJumlahSalahKey);
    if (salahLocal !== null) {
        if (num > parseInt(salahLocal)) {
            localStorage.setItem(localJumlahSalahKey, num.toString());
        }
    }
}
function checkHintJawaban() {
    if (hint) {
        pesan.textContent = "Coba lagi";
        pesan.style.color = "black";
        pesan.style.fontSize = "1rem";
        var hintJawaban = sessionStorage.getItem(sessionJawabanAsliKey);
        if (hintJawaban !== null) {
            var tebakanHintIndex = hintJawaban[tebakanUser.length - 1];
            var tebakanUserJoin = tebakanUser.join("");
            if (tebakanHintIndex == tebakanUserJoin[tebakanUser.length - 1]) {
                pesan.textContent =
                    "Jawabanmu barusan benar untuk posisi tersebut";
                pesan.style.fontSize = "25px";
                pesan.style.color = "#F4CE14";
            }
        }
    }
}
