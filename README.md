# An HTTPS Server using nodejs

To create an SSL cert and key you can issue the following:

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256
```

dont forget to replace filenames in the index.js file
