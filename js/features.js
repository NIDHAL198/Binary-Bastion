class VisitorCounter {
   constructor() {
      this.counterContainer = null;
      this.visitorCount = 0;
      this.initializeCounter();
   }

   initializeCounter() {
      this.counterContainer = document.createElement('div');
      this.counterContainer.classList.add('visitor-counter');
      
      this.counterDisplay = document.createElement('div');
      this.counterDisplay.classList.add('counter-display');

      const visitorLabel = document.createElement('p');
      visitorLabel.innerText = 'Visitour Counter ';
      visitorLabel.style.margin = '0 5px 0 0 ';
      

      const counterIcon = document.createElement('i');
      counterIcon.classList.add('fas', 'fa-eye');
      
      this.counterContainer.appendChild(counterIcon);
      this.counterContainer.appendChild(visitorLabel);
      this.counterContainer.appendChild(this.counterDisplay);
      
      document.body.appendChild(this.counterContainer);


      this.loadVisitorCount();
   }

   loadVisitorCount() {
      const storedCount = localStorage.getItem('binaryBastionVisitorCount');
      this.visitorCount = storedCount ? parseInt(storedCount) : 0;
      

      this.visitorCount++;
      

      localStorage.setItem('binaryBastionVisitorCount', this.visitorCount);
      

      this.updateCounterDisplay();
   }


   updateCounterDisplay() {
      // Format number with commas for readability
      const formattedCount = this.visitorCount.toLocaleString();
      this.counterDisplay.textContent = formattedCount;
   }
}


document.addEventListener('DOMContentLoaded', () => {
   window.visitorCounter = new VisitorCounter();
});