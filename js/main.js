// Binary Bastion Cryptography Platform
// Main JavaScript for Interactive Cryptographic Demonstrations

class CryptographyPlatform {
   constructor() {
      this.initializeNavigation();
      this.initializeCipherCardNavigation();
      
   }

   // Navigation Management
   initializeNavigation() {
      const navLinks = document.querySelectorAll('.navbar-nav a');
      navLinks.forEach(link => {
         link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            this.changePage(pageId);
         });
      });
   }


   initializeCipherCardNavigation() {
      const cipherCards = document.querySelectorAll('.cryptosystem-card');
      cipherCards.forEach(card => {
         card.addEventListener('click', () => {
            const cipherType = card.getAttribute('data-cipher');
            this.createCipherDetailPage(cipherType);
         });
      });
   }



encryptCaesarCipher() {
   // Get the shift value and plain text
   const shiftValue = parseInt(document.getElementById('shiftValue').value);
   const plainText = document.getElementById('plainText').value.toUpperCase();
   console.log("the value of the input text ",shiftValue);
   
   // Validate inputs
   if (!plainText) {
      alert('Please enter text to encrypt');
      return;
   }
   
   // Encrypt the text
   let encryptedText = '';
   for (let i = 0; i < plainText.length; i++) {
      let char = plainText[i];
      
      // Only encrypt alphabetic characters
      if (/[A-Z]/.test(char)) {
         // Convert to number (A=0, B=1, etc.), apply shift, wrap around alphabet
         let charCode = char.charCodeAt(0);
         let shiftedCharCode = ((charCode - 65 + shiftValue) % 26) + 65;
         encryptedText += String.fromCharCode(shiftedCharCode);
      } else {
         // Non-alphabetic characters remain unchanged
         encryptedText += char;
      }
   }
   
   // Display the encrypted text
   document.getElementById('encryptedText').value = encryptedText;
}

decryptCaesarCipher() {
   // Get the shift value and encrypted text
   const shiftValue = parseInt(document.getElementById('shiftValue').value);
   const encryptedText = document.getElementById('encryptedText').value.toUpperCase();
   
   // Validate inputs
   if (!encryptedText) {
      alert('Please enter text to decrypt');
      return;
   }
   
   if (isNaN(shiftValue) || shiftValue < 1 || shiftValue > 25) {
      alert('Shift value must be between 1 and 25');
      return;
   }
   
   // Decrypt the text (essentially shift backwards)
   let decryptedText = '';
   for (let i = 0; i < encryptedText.length; i++) {
      let char = encryptedText[i];
      
      // Only decrypt alphabetic characters
      if (/[A-Z]/.test(char)) {
         // Convert to number, shift backwards, ensure positive with + 26
         let charCode = char.charCodeAt(0);
         let shiftedCharCode = ((charCode - 65 - shiftValue + 26) % 26) + 65;
         decryptedText += String.fromCharCode(shiftedCharCode);
      } else {
         // Non-alphabetic characters remain unchanged
         decryptedText += char;
      }
   }
   
   // Display the decrypted text in the plain text input
   document.getElementById('plainText').value = decryptedText;
}

   changePage(pageId) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
         page.classList.remove('active');
      });

      // Show selected page
      const selectedPage = document.getElementById(pageId);
      if (selectedPage) {
         selectedPage.classList.add('active');
      }
   }

   // Create a dynamic page for each cryptosystem
   createCipherDetailPage(cipherType) {
      // Remove any existing cipher detail page
      const existingDetailPage = document.getElementById('cipher-detail-page');
      if (existingDetailPage) {
         existingDetailPage.remove();
      }

      // Create new cipher detail page
      const cipherDetailPage = document.createElement('div');
      cipherDetailPage.id = 'cipher-detail-page';
      cipherDetailPage.classList.add('page');

      // Populate page content based on cipher type
      switch(cipherType) {
         case 'caesar':
            this.populateCaesarDetailPage(cipherDetailPage);
            break;
         case 'otp':
            this.populateOTPDetailPage(cipherDetailPage);
            break;
         case 'rsa':
            this.populateRSADetailPage(cipherDetailPage);
            break;
         case 'lfsr':
            this.populateLFSRDetailPage(cipherDetailPage);
            break;
         case 'ecc':
            this.populateECCDetailPage(cipherDetailPage);
            break;
         case 'diffie-hellman':
            this.populateDiffieHellmanDetailPage(cipherDetailPage);
            break;
         case 'elgamal':
            this.populateElGamalDetailPage(cipherDetailPage);
            break;
      }

      // Add back button
      const backButton = document.createElement('button');
      backButton.textContent = 'Back to Cryptosystems';
      backButton.classList.add('back-button');
      backButton.addEventListener('click', () => this.changePage('cryptosystems'));
      cipherDetailPage.insertBefore(backButton, cipherDetailPage.firstChild);

      // Add to pages container and activate
      document.getElementById('pages').appendChild(cipherDetailPage);
      this.changePage('cipher-detail-page');
   }

   // Detailed page population methods
   populateCaesarDetailPage(pageElement) {
      pageElement.innerHTML = `
         <div class="cipher-detail-container">
            <h1>Caesar Cipher</h1>

   
            <div class="cipher-detail-content">

               <div class="cipher-description">
                  <h2>Historical Background</h2>
                  <p>The **Caesar cipher** is one of the oldest known encryption techniques, dating back to the time of **Julius Caesar**. Historically, it was used to secure sensitive military communications during the Roman Republic. Here’s a deeper look at its background:

                     - **Origins and Usage:**  
                     Julius Caesar is reputed to have used this cipher to protect his confidential messages. He reportedly shifted the alphabet by three positions, so that each letter in his message was replaced by the letter three places down the alphabet (e.g., A becomes D, B becomes E, etc.). This simple method helped obscure his military orders from enemies.

                     - **Mechanism:**  
                     The Caesar cipher is a type of substitution cipher. Despite its simplicity, it laid the groundwork for more complex encryption methods. Each letter of the plaintext is replaced by a corresponding letter that is a fixed number of positions away in the alphabet.

                     - **Historical Significance:**  
                     Although easily broken by modern standards, the Caesar cipher was effective in its time, particularly because the concept of cryptanalysis was not well developed. It symbolizes the early efforts of securing communication, demonstrating the fundamental idea of using a secret key to protect information.

                     - **Legacy:**  
                     Today, the Caesar cipher is mainly used as an educational tool to introduce the basic concepts of cryptography. Its historical context provides a window into the evolution of secret communication techniques and the constant battle between encoding and decoding messages.

                     This ancient cipher not only reflects the ingenuity of early cryptographic methods but also serves as a reminder of how far encryption has come—from a simple letter-shift to today's complex algorithms that secure our digital communications.</p>

                  <div class="cipher-image">
                     <img src="./assets/images/caiser/caesar-cipher.png" alt="Caesar Cipher">
                  </div>
                  <h2>How It Works</h2>
                  <div class="cipher-steps">
                     <div class="step">
                        <h3>1. Key Generation</h3>
                        <p>In the Caesar cipher, the key is a numerical value that determines how many positions each letter in the plaintext will be shifted in the alphabet. This key is typically an integer between 1 and 25. For instance, a key of 3 means each letter is shifted three places forward. Julius Caesar himself is believed to have used this method with a shift of 3 to protect his messages.​ Example: Key = 3​</p>
                     </div>
                     <div class="step">
                        <h3>2. Encryption</h3>
                        <p>To encrypt a message using the Caesar cipher:​ Replace each letter in the plaintext with the letter that is a fixed number of positions down the alphabet, as determined by the key.​ If the shift moves past 'Z', it wraps around to the beginning of the alphabet.​ Example: Plaintext: HELLO ​Key: 3​ Encryption Process: H → K​ |E → H​ |L → O​ |L → O​ |O → R​  Ciphertext: KHOOR​ In this example, each letter in "HELLO" is shifted three positions forward in the alphabet to produce the ciphertext "KHOOR".​.</p>
                     </div>
                     <div class="step">
                        <h3>3. Decryption</h3>
                        <p>To decrypt a message encrypted with the Caesar cipher: Shift each letter in the ciphertext backward by the same number of positions used during encryption (the key). Tutorials Point. If the shift moves before 'A', it wraps around to the end of the alphabet. Example: Ciphertext: KHOOR, Key: 3, Crypto Corner. Decryption Process: K → H, H → E, O → L, O → L, , R → O, Decrypted Plaintext: HELLO. By shifting each letter in "KHOOR" three positions backward, we retrieve the original message "HELLO". The Caesar cipher is celebrated for its simplicity and historical significance. While it offers minimal security by modern standards due to its susceptibility to brute-force attacks, it serves as an excellent introduction to the principles of encryption and decryption.</p>
                     </div>
                  </div>

                  <h2>Mathematical Representation</h2>
                  <p>E(x) = (x + n) mod 26<br>D(x) = (x - n) mod 26</p>

                                 <h2>Python Implementation</h2>
                  <div class="cipher-code-implementation">
                     <pre><code class="language-python">
                        def ceazer_shifer(text,key) :
                           resualt = ""
                           for char in text : 
                              if char.isupper():
                                 resualt +=  chr((ord (char)+key + 61 )% 26 +  65 )
                              elif char.islower():
                                 resualt += chr((ord(char) + key -97)%26  + 97)
                              else : 
                                 resualt +=char
                           return resualt

                        def decrypt_ceaser (msg) : 
                           for key in range (0,27) :
                              decrepted_msg = ""
                              for char in msg:
                                 if char.isupper():
                                    decrepted_msg += chr((ord(char) - key -65)%26 + 65)
                                 elif char.islower():
                                    decrepted_msg += chr((ord(char) - key - 97)%26 + 97)
                                 else:
                                    decrepted_msg +=char
                              print("-"*20)
                              print(f"the key {key} ==> {decrepted_msg}")
                              print("-"*20)

                        message = "EZSHFTD JHRR SNHKDS OKZMDS"

                        print(f"-------------brote force attak------ ")
                        decrypt_ceaser(message)



                                             </code></pre>
                                          </div>
                  <h3> Live testing </h3>
                     <div class="cipher-container">
                        <div class="input-group">
                           <label for="shiftValue">Shift Value:</label>
                           <input type="number" id="shiftValue" placeholder="Enter shift value">
                        </div>
                        
                        <div class="input-group">
                           <label for="plainText">Plain Text:</label>
                           <input text" id="plainText" placeholder="Enter text" >
                        </div>
                        
                        <div class="input-group">
                           <label for="encryptedText">Encrypted Text:</label>
                           <input type="text" id="encryptedText" placeholder="output" >
                        </div>
                        
                        <div class="button-group">
                           <button  onclick="window.cryptoPlatform.encryptCaesarCipher()" class="btn-encrypt">Encrypt</button>
                           <button  onclick="window.cryptoPlatform.decryptCaesarCipher()" class="btn-decrypt">Decrypt</button>
                        </div>
                     </div>
                                       </div>
                                    </div>
                                 </div>
      
               </div>
            </div>
         </div>
      `;
   }

   // Similar methods for other cryptosystems would follow the same pattern
   populateOTPDetailPage(pageElement) {
      pageElement.innerHTML = `
         <div class="cipher-detail-container">
            <h1>One-Time Pad (OTP) Cryptosystem</h1>
            <div class="cipher-detail-content">
               <div class="cipher-description">
                  <h2>Theoretical Perfect Secrecy</h2>
                  <p>The One-Time Pad is the only known encryption method that provides perfect secrecy when implemented correctly.</p>
                  
                  <div class="cipher-steps">
                     <div class="step">
                        <h3>1. Key Generation</h3>
                        <p>Create a truly random key of the same length as the message.</p>
                     </div>
                     <div class="step">
                        <h3>2. Encryption</h3>
                        <p>XOR the plaintext with the random key bitwise.</p>
                     </div>
                     <div class="step">
                        <h3>3. Decryption</h3>
                        <p>XOR the ciphertext with the same key to recover the original message.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      `;
   }

   // Placeholder methods for other cryptosystems
   populateRSADetailPage(pageElement) {
      pageElement.innerHTML = `
         <div class="cipher-detail-container">
            <h1>RSA Cryptosystem</h1>
            <div class="cipher-detail-content">
               <div class="cipher-description">
                  <h2>Asymmetric Encryption Breakthrough</h2>
                  <p>RSA revolutionized public-key cryptography by enabling secure communication without a pre-shared secret.</p>
                  
                  <div class="cipher-steps">
                     <div class="step">
                        <h3>1. Key Generation</h3>
                        <p>Generate public and private key pairs using prime numbers.</p>
                     </div>
                     <div class="step">
                        <h3>2. Encryption</h3>
                        <p>Use the public key to encrypt the message.</p>
                     </div>
                     <div class="step">
                        <h3>3. Decryption</h3>
                        <p>Use the private key to decrypt the message.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      `;
   }

   // Add similar methods for LFSR, ECC, Diffie-Hellman, and ElGamal
   populateLFSRDetailPage(pageElement) {
      pageElement.innerHTML = `
         <div class="cipher-detail-container">
            <h1>Linear Feedback Shift Register (LFSR)</h1>
            <div class="cipher-detail-content">
               <div class="cipher-description">
                  <h2>Pseudorandom Number Generation</h2>
                  <p>LFSR is a crucial component in stream ciphers and digital communication.</p>
                  
                  <div class="cipher-steps">
                     <div class="step">
                        <h3>1. Seed Initialization</h3>
                        <p>Start with an initial binary sequence.</p>
                     </div>
                     <div class="step">
                        <h3>2. Shift and XOR</h3>
                        <p>Shift bits and apply XOR operations to generate next state.</p>
                     </div>
                     <div class="step">
                        <h3>3. Pseudorandom Sequence</h3>
                        <p>Generate a seemingly random but deterministic sequence.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      `;
   }

   // Add more population methods for other cryptosystems...
}

// Initialize Platform on Page Load -->
document.addEventListener('DOMContentLoaded', () => {
   window.cryptoPlatform = new CryptographyPlatform();
});

// typed.js ^_^
const typed = new Typed(".multipel-text",{
   strings: ['Unlock the Secrets of Cryptography','Decode the Mysteries of Secure Communication','Unravel the Hidden Layers of Digital Security','Embrace the Art of Cryptographic Mastery'],
   typeSpeed: 80,
   backSpeed: 80,
   backDelay: 1000,
   loop:true,
})






