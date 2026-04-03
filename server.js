
/* 
   SUNUCU DOSYASI
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/* Form verisini JSON olarak al */
app.use(express.json());

/* frontend klasörünü yayınla */
app.use(express.static(path.join(__dirname, '../frontend')));

/* Ana sayfa */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/* İletişim sayfası */
app.get('/iletisim', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/iletisim.html'));
});

/* Basit form endpoint */
app.post('/messages', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Zorunlu alanlar eksik' });
  }

  return res.status(200).json({
    message: 'Mesaj başarıyla alındı',
    data: { name, email, message }
  });
});

app.listen(PORT, () => {
  console.log(`Server calisiyor: http://localhost:${PORT}`);
});
