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
      case "Caesar Cipher":
        var encoded_text = "";
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          var char = cipher_text[char_index];
          if(this.alphabet.indexOf(char.toLowerCase()) != -1){
            var letter_case = "lower";
            if(char == char.toUpperCase()){
              letter_case = "upper";
            }
            var encoded_char = this.alphabet[(this.alphabet.indexOf(char.toLowerCase()) + params[0]) % this.alphabet.length];
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
      case "ROT13":
        return this.encode("Caesar Cipher", cipher_text, [13]);
        break;
      case "Vigenere Cipher":
        params[0] = params[0].toLowerCase();
        var encoded_text = "";
        var current_encode_char = params[0][0];
        var current_encode_char_index = 0;
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
            var char = cipher_text[char_index];
            if(this.alphabet.indexOf(char.toLowerCase()) != -1){
              var letter_case = "lower";
              if(char == char.toUpperCase()){
                letter_case = "upper";
              }

              var encoded_char;

              if(params[1]){
                encoded_char = this.decode("Caesar Cipher", char, [this.alphabet.indexOf(current_encode_char)]);
              }else{
                encoded_char = this.encode("Caesar Cipher", char, [this.alphabet.indexOf(current_encode_char)]);
              }

              if(letter_case == "lower"){
                encoded_text += encoded_char;
              }else{
                encoded_text += encoded_char.toUpperCase();
              }

              current_encode_char_index++;
              current_encode_char = params[0][current_encode_char_index % params[0].length];
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
      case "Caesar Cipher":
        return this.encode("Caesar Cipher", cipher_text, [26 - params[0]]);
        break;
      case "ROT13":
        return this.decode("Caesar Cipher", cipher_text, [13]);
        break;
      case "Vigenere Cipher":
        return this.encode("Vigenere Cipher", cipher_text, [params[0], true]);
        break;
      default:
        console.error("Cipher " + cipher + " not found.");
        return;
    }
  }
};
