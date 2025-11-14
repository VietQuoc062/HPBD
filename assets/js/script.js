const backgroundMusic = document.getElementById('background-music');
const asciiScreen = document.getElementById('ascii-screen');
const finaleCardScreen = document.getElementById('finale-card-screen');
const mainContainer = document.querySelector('.main_container');

const showFormBtn = document.getElementById('show-form-btn');
const formSection = document.getElementById('form-section');
const submitBtn = document.getElementById('submit-btn');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hàm isMobile (KHÔNG CÒN SỬ DỤNG NỮA)
/* function isMobile() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1V|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
*/
function checkValid() {
    var input = document.getElementById("nhapngaysinh");
    let validPath = null;

    // Ẩn error-box mỗi lần kiểm tra
    const errorBox = document.getElementById("error-box");
    errorBox.style.display = "none";

    if (input.value == "15/11/2003") { 
        validPath = './assets/texts/quynhi.txt';
        updateCard("Gửi chị Quý Nhi");
    } else {
        // 🔥 Hiện angry gif + thông báo
        errorBox.style.display = "block";

        // Optional: rung input khi sai
        input.classList.add("shake");
        setTimeout(() => {
            input.classList.remove("shake");
        }, 500);

        return; // Dừng luôn, không chạy tiếp
    }

    if (validPath) {
        mainContainer.style.display = 'none';
        showImage(validPath);
    }
}


async function showImage(imgName) {
    asciiScreen.style.display = 'block';

    backgroundMusic.play().catch(e => console.error("Không thể phát nhạc:", e));

    try {
        const response = await fetch(imgName);
        const data = await response.text();
        const newData = data.replace(/ /g, "&nbsp;");
        const lines = newData.split("\n");
        
        for (var line = 0; line < lines.length; line++) {
            const p = document.createElement('p');
            p.innerHTML = lines[line];
            asciiScreen.appendChild(p); 
            
            asciiScreen.scrollTop = asciiScreen.scrollHeight; 
            
            await sleep(50); 
        }

        await sleep(1000); // Chờ 1s
        showFinaleCard();

    } catch (err) {
        console.error("Lỗi khi tải file ASCII:", err);
        asciiScreen.innerHTML = "<p>Không thể tải được file text.</p>";
    }
}


function showFinaleCard() {
    asciiScreen.style.display = 'none';

    finaleCardScreen.classList.add('visible');

    // Đổi background thành ảnh
    document.body.style.background = "url('assets/images/bg.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
}

function updateCard(title, date) {
    const card = document.querySelector('#finale-card-screen .card');
    card.querySelector('h1').textContent = title;
}

showFormBtn.addEventListener('click', () => {
    showFormBtn.style.display = 'none';
    formSection.style.display = 'block';
});

submitBtn.addEventListener('click', () => {
    checkValid();
});

$("#nhapngaysinh").on('keyup', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        checkValid();
    }
});