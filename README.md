# Ciphers.js

## Description

A JavaScript library for encoding and decoding text using simple Ciphers.

## Download

Download [by clicking on this link](https://xtrp.github.io/ciphers.js/ciphers.zip).

## Ciphers

Ciphers included in Ciphers.js include:
 - ROT13
 - The Caesar Cipher
 - Morse Code
 - The Vigenere Cipher
 - The NATO Spelling Alphabet
 - Base64 Encoding
 - URL Encoding

## Format of Ciphers.js

All of the methods in Ciphers.js are stored in the ```Ciphers``` object.

## Encoding and decoding with Ciphers.js

The ```Cipher.encode()``` and ```Cipher.decode()``` methods are used to encode text using the specific cipher and parameters.

They are formatted like this:

```
Cipher.encode(cipher_name, cipher_text, parameters);
Cipher.decode(cipher_name, cipher_text, parameters);
```

### Description of Arguments

 - ```cipher_name``` (String) &mdash; the name of the cipher. Accepted names are stored in ```Cipher.ciphers```.
 - ```cipher_text``` (String) &mdash; the text you'd like to encode or decode.
 - ```parameters``` (Array) &mdash; extra parameters needed for that specific cipher. Descriptions of parameters for each cipher are stored in ```Cipher.parameters```.

## Examples

### Encode "Hello, World!" in Caesar Cipher shift 4

```
Cipher.encode("Caesar Cipher", "Hello, World!", [4]);
```

### Encode "Hello!" in Vigenere Cipher with keyword "test"

```
Cipher.decode("Vigenere Cipher", "Hello!", ["test"]);
```
