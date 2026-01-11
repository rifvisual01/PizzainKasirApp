export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const GAS_URL = 'https://script.google.com/macros/s/AKfycbyMrKtQT_hzr7wSodOurIJpsuwmfSCUJsyCMXxo4YAFSRh8RRGXQZdc-4VNqF9xuPH1Kw/exec';

    const body = new URLSearchParams(req.body).toString();

    const gasRes = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });

    const text = await gasRes.text();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Proxy error'
    });
  }
}
