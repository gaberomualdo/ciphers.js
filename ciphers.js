var Ciphers = {
  alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
  morse: [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..'
  ],
  morse_numbers: [
    "-----",
    ".----",
    "..---",
    "...--",
    "....-",
    ".....",
    "-....",
    "--...",
    "---..",
    "----."
  ],
  nato_spelling_alphabet: [
    "alfa",
    "bravo",
    "charlie",
    "delta",
    "echo",
    "foxtrot",
    "golf",
    "hotel",
    "india",
    "juliett",
    "kilo",
    "lima",
    "mike",
    "november",
    "oscar",
    "papa",
    "quebec",
    "romeo",
    "sierra",
    "tango",
    "uniform",
    "victor",
    "whiskey",
    "x-ray",
    "yankee",
    "zulu"
  ],
  ciphers: [
    "ROT13",
    "Caesar Cipher",
    "Morse Code",
    "Vigenere Cipher",
    "NATO Spelling Alphabet",
    "Base64",
    "URL Encoding"
  ],
  parameters: [
    "[]",
    "[Int shift_amount]",
    "[]",
    "[String keyword]",
    "[]",
    "[]",
    "[]"
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
      case "Morse Code":
        var encoded_text = "";
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          if(char_index != 0){
            encoded_text += " ";
          }
          var char = cipher_text[char_index];
          if(this.alphabet.indexOf(char.toLowerCase()) != -1){
            encoded_text += this.morse[this.alphabet.indexOf(char.toLowerCase())];
          }else if(parseInt(char) >= 0 && parseInt(char) <= 9){
            encoded_text += this.morse_numbers[parseInt(char)];
          }else if(char == " "){
            encoded_text += "/";
          }else if(char == "!"){
            encoded_text += "-.-.--";
          }else if(char == "."){
            encoded_text += ".-.-.-";
          }else if(char == ","){
            encoded_text += "--..--";
          }else{
            encoded_text += char;
          }
        }
        return encoded_text;
        break;
      case "NATO Spelling Alphabet":
        var encoded_text = "";
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          if(char_index != 0){
            encoded_text += " ";
          }
          var char = cipher_text[char_index];
          if(this.alphabet.indexOf(char.toLowerCase()) != -1){
            var encoded_char = this.nato_spelling_alphabet[this.alphabet.indexOf(char.toLowerCase())];
            if(char == char.toUpperCase()){
              encoded_text += encoded_char.toUpperCase();
            }else{
              encoded_text += encoded_char.toLowerCase();
            }
          }else if(char == "."){
            encoded_text += "Stop";
          }else if(char == " "){
            encoded_text += "(space)";
          }else{
            encoded_text += char;
          }
        }
        return encoded_text;
        break;
      case "Base64":
        return btoa(cipher_text);
        break;
      case "URL Encoding":
        return (encodeURIComponent(cipher_text));
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
      case "Morse Code":
        var decoded_text = "";
        cipher_text = cipher_text.split(" ");
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          var char = cipher_text[char_index];
          if(this.morse.indexOf(char) != -1){
            decoded_text += this.alphabet[this.morse.indexOf(char)];
          }else if(this.morse_numbers.indexOf(char) != -1){
            decoded_text += this.morse_numbers.indexOf(char);
          }else if(char == "/"){
            decoded_text += " ";
          }else if(char == "-.-.--"){
            decoded_text += "!";
          }else if(char == ".-.-.-"){
            decoded_text += ".";
          }else if(char == "--..--"){
            decoded_text += ",";
          }else{
            decoded_text += char;
          }
        }
        return decoded_text;
        break;
      case "NATO Spelling Alphabet":
        var decoded_text = "";
        cipher_text = cipher_text.split(" ");
        for(var char_index = 0; char_index < cipher_text.length; char_index++){
          var char = cipher_text[char_index];
          if(this.nato_spelling_alphabet.indexOf(char.toLowerCase()) != -1){
            var decoded_char = this.alphabet[this.nato_spelling_alphabet.indexOf(char.toLowerCase())];
            if(char == char.toUpperCase()){
              decoded_text += decoded_char.toUpperCase();
            }else{
              decoded_text += decoded_char.toLowerCase();
            }
          }else if(char == "Stop"){
            decoded_text += ".";
          }else if(char == "(space)"){
            decoded_text += " ";
          }else{
            decoded_text += char;
          }
        }
        return decoded_text;
        break;
      case "Base64":
        return atob(cipher_text);
        break;
      case "URL Encoding":
        return decodeURIComponent(cipher_text);
        break;
      default:
        console.error("Cipher " + cipher + " not found.");
        return;
    }
  }
};
