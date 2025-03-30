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

   // ElGamal implementation to add to your CryptographyPlatform class
populateElGamalDetailPage(pageElement) {
   pageElement.innerHTML = `
      <div class="cipher-detail-container">
         <h1>ElGamal Cryptosystem</h1>
         <div class="cipher-detail-content">
            <div class="cipher-description">
               <h2>Historical Background</h2>
               <p>The ElGamal cryptosystem was introduced by Taher ElGamal in 1985 and is based on the Diffie-Hellman key exchange. It's a public-key cryptosystem that leverages the computational difficulty of the discrete logarithm problem in finite fields.</p>
               
               <p>ElGamal encryption consists of two components: the ElGamal signature scheme and the ElGamal encryption scheme. This system is particularly significant in cryptographic history because:</p>
               
               <ul>
                  <li>It was one of the early practical implementations of public-key cryptography after RSA</li>
                  <li>It remains secure when implemented properly, even decades after its invention</li>
                  <li>It introduced the concept of probabilistic encryption, meaning the same plaintext can encrypt to different ciphertexts</li>
                  <li>It has influenced many modern cryptographic protocols and systems</li>
               </ul>
               
               <p>The security of ElGamal relies on the computational difficulty of calculating discrete logarithms in a large prime modulus finite field, which remains a hard mathematical problem even with today's advanced computing capabilities.</p>

               // <div class="cipher-image">
               //    <img src="./assets/images/elgamel/Taher_Elgamal_it-sa_2010.jpg"   alt="elgamel crypto sys">
               // </div>

               <h2>How It Works</h2>
               <div class="cipher-steps">
                  <div class="step">
                     <h3>1. Key Generation</h3>
                     <p>The key generation process in ElGamal involves several steps:</p>
                     <ol>
                        <li>Select a large prime number p (the finite field)</li>
                        <li>Choose a primitive root g of the multiplicative group of integers modulo p</li>
                        <li>Select a random integer x such that 1 < x < p-1 (this is the private key)</li>
                        <li>Compute y = g^x mod p (this is the public key)</li>
                     </ol>
                     <p>The public key consists of the triplet (p, g, y), while x is kept as the private key.</p>
                  </div>
                  <div class="step">
                     <h3>2. Encryption</h3>
                     <p>To encrypt a message M (which must be less than p):</p>
                     <ol>
                        <li>Select a random integer k such that 1 < k < p-1 and gcd(k, p-1) = 1</li>
                        <li>Compute c₁ = g^k mod p</li>
                        <li>Compute c₂ = M * y^k mod p</li>
                     </ol>
                     <p>The ciphertext is the pair (c₁, c₂). Note that each encryption using the same plaintext will typically yield different ciphertext pairs because a new random k is chosen each time.</p>
                  </div>
                  <div class="step">
                     <h3>3. Decryption</h3>
                     <p>To decrypt the ciphertext pair (c₁, c₂):</p>
                     <ol>
                        <li>Compute s = c₁^x mod p</li>
                        <li>Compute M = c₂ * s^(p-2) mod p</li>
                     </ol>
                     <p>The value s^(p-2) mod p is the modular multiplicative inverse of s, according to Fermat's Little Theorem. This effectively reverses the encryption operation and recovers the original message M.</p>
                  </div>
               </div>

               <h2>Mathematical Representation</h2>
               <p><strong>Key Generation:</strong></p>
               <p>Private key: x (random integer where 1 < x < p-1)<br>
               Public key: y = g^x mod p</p>
               
               <p><strong>Encryption:</strong></p>
               <p>c₁ = g^k mod p<br>
               c₂ = M * y^k mod p</p>
               
               <p><strong>Decryption:</strong></p>
               <p>s = c₁^x mod p<br>
               M = c₂ * s^(p-2) mod p</p>

               <h2>Python Implementation</h2>
               <div class="cipher-code-implementation">
                  <pre><code class="language-python">
# ElGamal Cryptosystem Implementation by Nidhal Lhassen
import random

def is_prime(number) : 
   if number <= 1 :
      return False
   if number <= 3 :
      return True
   if number % 2 == 0 :
      return False
   
   for num in range(3,int(number**0.5) +1 ,2) :
      if number % num == 0:
         return False

   return True

# Key generation
def generate_random_prime(min_val,max_val):
   prime = random.randint(min_val, max_val)
   while not is_prime(prime):
      prime = random.randint(min_val, max_val)
   return prime

def gcd(num1, num2) :
   a = num1 if num1 > num2 else num2
   b = num1 if num1 < num2 else num2
   pgcd = 1
   if b == 0 :
      return a 
   else : 
      while b != 0 :
         q = a // b
         r = a % b 
         a = b 
         b = r
         pgcd = a
      return pgcd

def primitive_root_generate(finite_field):
   if finite_field == 1:  # Special case
      return 0
   
   if finite_field == 2:  # For modulo 2, 1 is the only primitive root
      return 1
   
   for candidate in range(2, finite_field):
      list_generated_elements = []
      is_primitive_root = True
      
      for exp in range(1, finite_field):
         el = pow(candidate, exp, finite_field)
         if el in list_generated_elements:
               is_primitive_root = False
               break
         list_generated_elements.append(el)
      
      if is_primitive_root and len(list_generated_elements) == finite_field - 1:
         return candidate
   
   return None

def generate_private_key(finite_field) :
   private_key = random.randint(2, finite_field-1)
   while gcd(private_key, finite_field) != 1 or not is_prime(private_key) :
      private_key = random.randint(2, finite_field-1)
   return private_key

# Generate system parameters
finite_field = generate_random_prime(320, 500)
primitive_root = primitive_root_generate(finite_field)
private_key = generate_private_key(finite_field)
public_key = pow(primitive_root, private_key, finite_field)

# Encryption
def encrypt_elgamal(message, public_params):
   finite_field, primitive_root, public_key = public_params
   
   # Generate random k
   k = random.randint(2, finite_field-1)
   while gcd(k, finite_field) != 1:
      k = random.randint(2, finite_field-1)
   
   # Convert message to numeric
   encoded_message = [ord(c) for c in message]
   
   # Encrypt each character
   encrypted_message = []
   for chunk in encoded_message:
      c1 = pow(primitive_root, k, finite_field)
      c2 = (chunk * pow(public_key, k, finite_field)) % finite_field
      encrypted_message.append((c1, c2))
   
   return encrypted_message

# Decryption
def decrypt_elgamal(encrypted_message, private_key, finite_field):
   decrypted_message = []
   
   for c1, c2 in encrypted_message:
      # Calculate shared secret
      s = pow(c1, private_key, finite_field)
      
      # Use Fermat's Little Theorem to find modular inverse
      s_inverse = pow(s, finite_field-2, finite_field)
      
      # Recover original message
      decrypted_chunk = (c2 * s_inverse) % finite_field
      decrypted_message.append(decrypted_chunk)
   
   # Convert numeric to characters
   message = "".join(chr(c) for c in decrypted_message)
   return message

# Example usage
public_params = (finite_field, primitive_root, public_key)
message = "Hello, ElGamal!"
encrypted = encrypt_elgamal(message, public_params)
decrypted = decrypt_elgamal(encrypted, private_key, finite_field)
print(f"Original: {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")
                  </code></pre>
               </div>

               <h2>Attacks and Vulnerabilities</h2>
               <p>While ElGamal is considered secure when properly implemented, there are several potential vulnerabilities:</p>
               
               <ol>
                  <li><strong>Discrete Logarithm Attacks:</strong> The security of ElGamal relies on the difficulty of the discrete logarithm problem. Advances in this area could potentially compromise the system.</li>
                  <li><strong>Small Subgroup Attacks:</strong> If parameters are chosen poorly, the cryptosystem might be vulnerable to attacks based on working in a smaller subgroup of the field.</li>
                  <li><strong>Malleability:</strong> ElGamal is malleable, meaning an attacker can transform a ciphertext into another valid ciphertext without knowing the plaintext.</li>
                  <li><strong>Poor Random Number Generation:</strong> If the random value k is predictable or reused, the security can be severely compromised.</li>
                  <li><strong>Side-Channel Attacks:</strong> Implementation flaws may leak information during the cryptographic operations.</li>
                  <li><strong>Quantum Computing Threats:</strong> Shor's algorithm, when implemented on a sufficiently powerful quantum computer, could solve the discrete logarithm problem efficiently.</li>
               </ol>
               
               <p>To mitigate these risks, implementations should use large prime moduli (at least 2048 bits in practice), secure random number generation, and additional safeguards like message padding.</p>

               <h3>Live Testing</h3>
               <div class="cipher-container">
                  <div class="key-generation-section">
                     <h4>Key Generation</h4>
                     <div class="input-group">
                        <label for="finiteField">Finite Field (p):</label>
                        <input type="number" id="finiteField" placeholder="Large prime number">
                     </div>
                     
                     <div class="input-group">
                        <label for="primitiveRoot">Primitive Root (g):</label>
                        <input type="number" id="primitiveRoot" placeholder="Primitive root modulo p">
                     </div>
                     
                     <div class="input-group">
                        <label for="privateKey">Private Key (x):</label>
                        <input type="number" id="privateKey" placeholder="Private key" class="private-input">
                     </div>
                     
                     <div class="input-group">
                        <label for="publicKey">Public Key (y):</label>
                        <input type="number" id="publicKey" placeholder="Public key" readonly>
                     </div>
                     
                     <button onclick="generateElGamalKeys()" class="btn-generate">Generate Keys</button>
                  </div>
                  
                  <div class="encryption-section">
                     <h4>Message Encryption/Decryption</h4>
                     <div class="input-group">
                        <label for="elGamalPlainText">Plain Text:</label>
                        <textarea id="elGamalPlainText" placeholder="Enter text to encrypt"></textarea>
                     </div>
                     
                     <div class="input-group">
                        <label for="elGamalEncryptedText">Encrypted Text:</label>
                        <textarea id="elGamalEncryptedText" placeholder="Encrypted output"></textarea>
                     </div>
                     
                     <div class="button-group">
                        <button onclick="encryptElGamalMessage()" class="btn-encrypt">Encrypt</button>
                        <button onclick="decryptElGamalMessage()" class="btn-decrypt">Decrypt</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   `;
}
   
}
// the problem the lead to create the loguiqe of elgamelhere is when i create
// extrenal module and import it the call of the function dosen't apper because
// the call is inside the  string that assign to the inherhtml proprety of populateElGamalDetailPage

// start the elgamel logiquique
class ElGamalCryptosystem {
   constructor() {
      this.finiteField = null;
      this.primitiveRoot = null;
      this.privateKey = null;
      this.publicKey = null;
   }

   // Check if a number is prime
   isPrime(number) {
      if (number <= 1) return false;
      if (number <= 3) return true;
      if (number % 2 === 0) return false;
      
      for (let num = 3; num <= Math.sqrt(number); num += 2) {
         if (number % num === 0) return false;
      }
      return true;
   }

   // Generate a random prime number within a range
   generateRandomPrime(minVal, maxVal) {
      let prime = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      while (!this.isPrime(prime)) {
         prime = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      }
      return prime;
   }

   // Extended Euclidean algorithm
   extendedEuclidean(e, PHI) {
      let a = PHI > e ? PHI : e;
      let b = PHI < e ? PHI : e;
      
      if (b === 0) {
         return [a, 1, 0];
      }
      
      let pgcd = 1;
      let t1 = 0;
      let t2 = 1;
      let quotient = 0;
      let t = 0;
      
      while (b !== 0) {
         quotient = Math.floor(a / b);
         t = t1 - t2 * quotient;
         const reminder = a % b;
         a = b;
         b = reminder;
         t1 = t2;
         t2 = t;
      }
      
      pgcd = a;
      return [pgcd, t1, t2];
   }

   // Euclidean algorithm for GCD
   gcd(num1, num2) {
      let a = num1 > num2 ? num1 : num2;
      let b = num1 < num2 ? num1 : num2;
      let pgcd = 1;
      
      if (b === 0) {
         return a;
      } else {
         while (b !== 0) {
               const q = Math.floor(a / b);
               const r = a % b;
               a = b;
               b = r;
               pgcd = a;
         }
         return pgcd;
      }
   }

   // Find primitive root of finite field
   findPrimitiveRoot(finiteField) {
      if (finiteField === 1) return 0;
      if (finiteField === 2) return 1;
      
      for (let candidate = 2; candidate < finiteField; candidate++) {
         const generatedElements = new Set();
         let isPrimitiveRoot = true;
         
         for (let exp = 1; exp < finiteField; exp++) {
               const el = this.modPow(candidate, exp, finiteField);
               if (generatedElements.has(el)) {
                  isPrimitiveRoot = false;
                  break;
               }
               generatedElements.add(el);
         }
         
         if (isPrimitiveRoot && generatedElements.size === finiteField - 1) {
               return candidate;
         }
      }
      
      return null;
   }

   // Modular exponentiation (a^b mod n)
   modPow(base, exponent, modulus) {
      if (modulus === 1) return 0;
      
      let result = 1;
      base = base % modulus;
      
      while (exponent > 0) {
         if (exponent % 2 === 1) {
               result = (result * base) % modulus;
         }
         exponent = Math.floor(exponent / 2);
         base = (base * base) % modulus;
      }
      
      return result;
   }

   // Generate private key
   generatePrivateKey(finiteField) {
      let privateKey = Math.floor(Math.random() * (finiteField - 2)) + 2;
      while (this.gcd(privateKey, finiteField) !== 1 || !this.isPrime(privateKey)) {
         privateKey = Math.floor(Math.random() * (finiteField - 2)) + 2;
      }
      return privateKey;
   }

   // Generate random k for encryption
   generateK(finiteField) {
      let k = Math.floor(Math.random() * (finiteField - 2)) + 2;
      while (this.gcd(k, finiteField) !== 1) {
         k = Math.floor(Math.random() * (finiteField - 2)) + 2;
      }
      return k;
   }

   // Key generation
   generateKeys() {
      // Generate finite field (a large prime)
      this.finiteField = this.generateRandomPrime(320, 500);
      
      // Find primitive root
      this.primitiveRoot = this.findPrimitiveRoot(this.finiteField);
      
      // Generate private key
      this.privateKey = this.generatePrivateKey(this.finiteField);
      
      // Calculate public key
      this.publicKey = this.modPow(this.primitiveRoot, this.privateKey, this.finiteField);
      
      return {
         finiteField: this.finiteField,
         primitiveRoot: this.primitiveRoot,
         publicKey: this.publicKey,
         privateKey: this.privateKey
      };
   }

   // Encryption function
   encrypt(message, publicKeyTuple) {
      const [finiteField, primitiveRoot, publicKey] = publicKeyTuple;
      const k = this.generateK(finiteField);
      
      // Convert message to numeric representation
      const encodedMessage = [];
      for (let i = 0; i < message.length; i++) {
         encodedMessage.push(message.charCodeAt(i));
      }
      
      // Encrypt each character
      const encryptedMessage = [];
      for (const chunk of encodedMessage) {
         // Calculate c1 = g^k mod p
         const c1 = this.modPow(primitiveRoot, k, finiteField);
         
         // Calculate c2 = m * (public_key^k) mod p
         const precedence = (chunk * this.modPow(publicKey, k, finiteField)) % finiteField;
         const c2 = precedence;
         
         encryptedMessage.push([c1, c2]);
      }
      
      return encryptedMessage;
   }

   // Decryption function
   decrypt(encryptedMessage, privateKey, finiteField) {
      const decryptedMessage = [];
      
      for (const [c1, c2] of encryptedMessage) {
         // Calculate s = c1^x mod p
         const s = this.modPow(c1, privateKey, finiteField);
         
         // Calculate s^(p-2) mod p which is s^(-1) mod p by Fermat's little theorem
         const sInverse = this.modPow(s, finiteField - 2, finiteField);
         
         // Calculate m = c2 * s^(-1) mod p
         const decryptedChunk = (c2 * sInverse) % finiteField;
         decryptedMessage.push(decryptedChunk);
      }
      
      // Convert numeric representation back to string
      let decryptedText = "";
      for (const code of decryptedMessage) {
         decryptedText += String.fromCharCode(code);
      }
      
      return {
         numericMessage: decryptedMessage,
         textMessage: decryptedText
      };
   }

   // Utility method for UI
   setCustomParameters(finiteField, primitiveRoot, privateKey) {
      this.finiteField = finiteField;
      this.primitiveRoot = primitiveRoot;
      this.privateKey = privateKey;
      this.publicKey = this.modPow(primitiveRoot, privateKey, finiteField);
      
      return {
         finiteField: this.finiteField,
         primitiveRoot: this.primitiveRoot,
         publicKey: this.publicKey
      };
   }
}

// Functions for the UI
function generateElGamalKeys() {
   const elGamal = new ElGamalCryptosystem();
   const keys = elGamal.generateKeys();
   
   document.getElementById('finiteField').value = keys.finiteField;
   document.getElementById('primitiveRoot').value = keys.primitiveRoot;
   document.getElementById('privateKey').value = keys.privateKey;
   document.getElementById('publicKey').value = keys.publicKey;
   
   return keys;
}

function encryptElGamalMessage() {
   const elGamal = new ElGamalCryptosystem();
   
   // Get values from form
   const finiteField = parseInt(document.getElementById('finiteField').value);
   const primitiveRoot = parseInt(document.getElementById('primitiveRoot').value);
   const publicKey = parseInt(document.getElementById('publicKey').value);
   const plainText = document.getElementById('elGamalPlainText').value;
   
   if (!plainText) {
      alert('Please enter text to encrypt');
      return;
   }
   
   // Encrypt message
   const encryptedMessage = elGamal.encrypt(
      plainText, 
      [finiteField, primitiveRoot, publicKey]
   );
   
   // Display encrypted message
   document.getElementById('elGamalEncryptedText').value = JSON.stringify(encryptedMessage);
}

function decryptElGamalMessage() {
   const elGamal = new ElGamalCryptosystem();
   
   // Get values from form
   const finiteField = parseInt(document.getElementById('finiteField').value);
   const privateKey = parseInt(document.getElementById('privateKey').value);
   const encryptedText = document.getElementById('elGamalEncryptedText').value;
   
   if (!encryptedText) {
      alert('Please enter text to decrypt');
      return;
   }
   
   try {
      // Parse encrypted message
      const encryptedMessage = JSON.parse(encryptedText);
      
      // Decrypt message
      const decryptedResult = elGamal.decrypt(encryptedMessage, privateKey, finiteField);
      
      // Display decrypted message
      document.getElementById('elGamalPlainText').value = decryptedResult.textMessage;
   } catch (e) {
      alert('Invalid encrypted message format. Please use the format [[c1,c2], [c1,c2], ...]');
   }
}
// end  the elgamel logiquique

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
