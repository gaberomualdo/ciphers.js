var Ciphers = {
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  ciphers: [
    "ROT13",
    "Caesar Cipher",
    "Morse Code",
    "Vigenere Cipher",
    "NATO Spelling Alphabet",
    "Base64",
    "UTF-8",
    "URL Encoding"
  ],
  encode: function(cipher, cipher_text, params){
    switch (cipher) {
      case "ROT13":
        var encoded_text = "";
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          var char = cipher_text[char_index];
          if(this.alphabet.indexOf(char.toLowerCase()) != -1){
            var letter_case = "lower";
            if(char == char.toUpperCase()){
              letter_case = "upper";
            }
            var encoded_char = this.alphabet[(this.alphabet.indexOf(char.toLowerCase()) + 13) % this.alphabet.length];
            if(letter_case == "lower"){
              encoded_text += encoded_char;
            }else{
              encoded_text += encoded_char.toUpperCase();
            }
          }else{
            encoded_text += char;
          }
        }
        return encoded_text;
        break;
      default:
        console.error("Cipher " + cipher + " not found.");
        return;
    }
  },
  decode: function(cipher, cipher_text, params){
    switch (cipher) {
      case "ROT13":
        return this.encode("ROT13", cipher_text, params);
        break;
      default:
        console.error("Cipher " + cipher + " not found.");
        return;
    }
  }
};
