const fs = require('fs');

async function check() {
  const urls = [
    'https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/Krishna_Kumar_Chandra',
    'https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/Krishna_Kumar_Chandra.webp',
    'https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Design%2CPrint/Krishna_Kumar_Chandra.jpg'
  ];

  for (let u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(res.status, u.split('/').pop());
    } catch(e) {
      console.log('ERR', u.split('/').pop());
    }
  }
}
check();
