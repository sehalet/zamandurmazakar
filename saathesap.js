// Saat Hesaplayıcı - Klanlar.org için JavaScript kodu (19 dakika 40 saniyeden başlayarak)
(function() {
    'use strict';

    // Kutunun oluşturulacağı element
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.left = '20px';
    container.style.backgroundColor = '#f4f4f9';
    container.style.padding = '20px';
    container.style.border = '1px solid #ccc';
    container.style.zIndex = '10000';
    container.style.maxHeight = '500px';  // Maksimum yükseklik belirliyoruz
    container.style.overflowY = 'auto';   // Dikey kaydırma çubuğu ekliyoruz

    // Başlık ve input alanı
    const title = document.createElement('h2');
    title.textContent = 'Saat Girişi (Saat:Dakika:Saniye:Salise)';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'inputTime';
    input.placeholder = '10:00:01:113';

    // Hesapla butonu
    const button = document.createElement('button');
    button.textContent = 'Hesapla';
    button.onclick = hesapla;

    // Sonuç tablosu
    const table = document.createElement('table');
    table.border = '1';
    table.id = 'resultTable';
    table.style.marginTop = '20px';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
        <tr style="background-color: #4CAF50; color: white;">
            <th style="padding: 8px; border: 1px solid #ddd;">Girilen Zaman</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Çıkarılan Süre</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Hesaplanan Zaman</th>
            <th style="padding: 8px; border: 1px solid #ddd;">İptal Zamanı</th>
        </tr>
    `;

    // Elemanları ekrana ekle
    container.appendChild(title);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(table);
    document.body.appendChild(container);

    function hesapla() {
        const inputTime = document.getElementById("inputTime").value;
        const timeParts = inputTime.split(":").map(Number); // Saat, dakika, saniye ve saliseleri al
        if (timeParts.length !== 4) {
            alert("Lütfen 10:00:01:113 formatında bir zaman girin!");
            return;
        }

        const [hours, minutes, seconds, milliseconds] = timeParts;

        // Girilen saat bilgilerini Date objesine dönüştür
        let currentTime = new Date();
        currentTime.setHours(hours, minutes, seconds, milliseconds);

        // 19 dakika 40 saniyeden başlayıp 20 saniyeye kadar aralıklarla azaltmalar
        const intervals = [];
        for (let i = 1180; i >= 20; i -= 20) { // 1180 saniye = 19 dakika 40 saniye
            let mins = Math.floor(i / 60);
            let secs = i % 60;
            intervals.push({ minutes: mins, seconds: secs });
        }

        const table = document.getElementById("resultTable");
        // Önceki hesaplamaları temizle
        table.innerHTML = `
            <tr style="background-color: #4CAF50; color: white;">
                <th style="padding: 8px; border: 1px solid #ddd;">Girilen Zaman</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Çıkarılan Süre</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Hesaplanan Zaman</th>
                <th style="padding: 8px; border: 1px solid #ddd;">İptal Zamanı</th>
            </tr>`;

        intervals.forEach((interval, index) => {
            let totalSecondsToSubtract = interval.minutes * 60 + interval.seconds;
            let newTime = new Date(currentTime.getTime() - totalSecondsToSubtract * 1000); // Hesaplanan zaman
            let cancelTime = new Date(currentTime.getTime() - (totalSecondsToSubtract / 2) * 1000); // İptal zamanı (çıkarılan sürenin yarısı)

            let formattedNewTime = formatTime(newTime);
            let formattedCancelTime = formatTime(cancelTime);

            let row = table.insertRow();
            if (index % 2 === 0) {
                row.style.backgroundColor = '#f2f2f2'; // Alternatif satır arka planı
            } else {
                row.style.backgroundColor = '#ffffff';
            }

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);

            // Hücre stilleri
            cell1.style.padding = '8px';
            cell1.style.border = '1px solid #ddd';
            cell2.style.padding = '8px';
            cell2.style.border = '1px solid #ddd';
            cell3.style.padding = '8px';
            cell3.style.border = '1px solid #ddd';
            cell3.style.color = 'black'; // Hesaplanan zaman siyah renkte olacak
            cell4.style.padding = '8px';
            cell4.style.border = '1px solid #ddd';

            // Hücre içerikleri
            cell1.innerHTML = inputTime;
            cell2.innerHTML = `${interval.minutes} dakika ${interval.seconds} saniye`;
            cell3.innerHTML = formattedNewTime;
            cell4.innerHTML = formattedCancelTime; // İptal zamanı (çıkarılan sürenin yarısı)
        });
    }

    function formatTime(date) {
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        let milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
})();
