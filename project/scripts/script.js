        // Chess Club Website JavaScript - All functionality in one file
        
        // Global variables and state management using objects and arrays
        const clubData = {
          members: JSON.parse(localStorage.getItem('clubMembers')) || [],
          tournaments: [
              { name: 'Spring Championship', winner: 'Alexandra Chen', date: '2024-04-15' },
              { name: 'Summer Blitz', winner: 'Marcus Rodriguez', date: '2024-07-20' },
              { name: 'Fall Classical', winner: 'Sarah Johnson', date: '2024-10-10' }
          ],
          chessPieces: ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'],
          currentPage: 'home',
          stats: {
              memberCount: 250,
              tournamentCount: 52,
              yearsActive: 15,
              masterCount: 8
          }
      };

      // DOM element selections
      const elements = {
          navMenu: document.getElementById('navMenu'),
          menuToggle: document.getElementById('menuToggle'),
          navLinks: document.querySelectorAll('.nav-link'),
          pageContents: document.querySelectorAll('.page-content'),
          membershipForm: document.getElementById('membershipForm'),
          chessBoard: document.getElementById('chessBoard'),
          formSuccess: document.getElementById('formSuccess'),
          statNumbers: {
              memberCount: document.getElementById('memberCount'),
              tournamentCount: document.getElementById('tournamentCount'),
              yearsActive: document.getElementById('yearsActive'),
              masterCount: document.getElementById('masterCount')
          }
      };

      // Page navigation functionality
      function navigateToPage(pageName) {
          // Hide all page contents
          elements.pageContents.forEach(page => {
              page.classList.remove('active');
          });
          
          // Show selected page
          const targetPage = document.getElementById(pageName);
          if (targetPage) {
              targetPage.classList.add('active');
              clubData.currentPage = pageName;
              
              // Update active nav link
              elements.navLinks.forEach(link => {
                  link.classList.remove('active');
                  link.removeAttribute('aria-current');
              });
              
              const activeLink = document.querySelector(`[data-page="${pageName}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
                  activeLink.setAttribute('aria-current', 'page');
              }
              
              // Close mobile menu if open
              elements.navMenu.classList.remove('active');
              
              // Trigger lazy loading for new page
              initializeLazyLoading();
              
              // Page-specific initialization
              if (pageName === 'home') {
                  animateStats();
              }
          }
      }

      // Mobile menu toggle functionality
      function toggleMobileMenu() {
          elements.navMenu.classList.toggle('active');
      }

      // Chess board generation and interaction
      function createChessBoard() {
          if (!elements.chessBoard) return;
          
          elements.chessBoard.innerHTML = '';
          
          for (let row = 0; row < 8; row++) {
              for (let col = 0; col < 8; col++) {
                  const square = document.createElement('div');
                  square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                  square.setAttribute('data-row', row);
                  square.setAttribute('data-col', col);
                  square.setAttribute('role', 'gridcell');
                  square.setAttribute('tabindex', '0');
                  square.setAttribute('aria-label', `Chess square ${String.fromCharCode(97 + col)}${8 - row}`);
                  
                  // Add click and keyboard event listeners
                  square.addEventListener('click', handleSquareClick);
                  square.addEventListener('keypress', (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSquareClick(e);
                      }
                  });
                  
                  elements.chessBoard.appendChild(square);
              }
          }
          
          // Set initial pieces
          setInitialChessPieces();
      }

      // Handle chess square clicks with conditional branching
      function handleSquareClick(event) {
          const square = event.target;
          const row = parseInt(square.getAttribute('data-row'));
          const col = parseInt(square.getAttribute('data-col'));
          
          // Conditional branching for different piece placement logic
          if (square.textContent) {
              // If square has a piece, remove it
              square.textContent = '';
              square.setAttribute('aria-label', `Empty chess square ${String.fromCharCode(97 + col)}${8 - row}`);
          } else {
              // If square is empty, add a random piece
              const randomPiece = clubData.chessPieces[Math.floor(Math.random() * clubData.chessPieces.length)];
              square.textContent = randomPiece;
              square.setAttribute('aria-label', `Chess piece ${randomPiece} on square ${String.fromCharCode(97 + col)}${8 - row}`);
              
              // Different behavior based on piece type
              if (['♔', '♚'].includes(randomPiece)) {
                  square.style.fontSize = '2.5rem';
              } else if (['♕', '♛'].includes(randomPiece)) {
                  square.style.color = '#dc143c';
              } else {
                  square.style.fontSize = '';
                  square.style.color = '';
              }
          }
          
          // Save board state to localStorage
          saveBoardState();
      }

      // Set initial chess pieces using array methods
      function setInitialChessPieces() {
          const initialSetup = [
              ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
              ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
              [], [], [], [],
              ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
              ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
          ];
          
          const squares = elements.chessBoard.querySelectorAll('.chess-square');
          
          initialSetup.forEach((row, rowIndex) => {
              row.forEach((piece, colIndex) => {
                  const squareIndex = rowIndex * 8 + colIndex;
                  if (squares[squareIndex] && piece) {
                      squares[squareIndex].textContent = piece;
                      const col = colIndex;
                      const row = rowIndex;
                      squares[squareIndex].setAttribute('aria-label', 
                          `Chess piece ${piece} on square ${String.fromCharCode(97 + col)}${8 - row}`);
                  }
              });
          });
      }

      // Save and load board state using localStorage
      function saveBoardState() {
          const squares = elements.chessBoard.querySelectorAll('.chess-square');
          const boardState = Array.from(squares).map(square => ({
              row: square.getAttribute('data-row'),
              col: square.getAttribute('data-col'),
              piece: square.textContent
          }));
          
          localStorage.setItem('chessBoardState', JSON.stringify(boardState));
      }

      function loadBoardState() {
          const savedState = localStorage.getItem('chessBoardState');
          if (savedState) {
              const boardState = JSON.parse(savedState);
              const squares = elements.chessBoard.querySelectorAll('.chess-square');
              
              boardState.forEach((squareData, index) => {
                  if (squares[index] && squareData.piece) {
                      squares[index].textContent = squareData.piece;
                  }
              });
          }
      }

      // Form validation using objects and conditional branching
      function validateForm(formData) {
          const errors = {};
          const requiredFields = ['fullName', 'email', 'age', 'experience', 'membership'];
          
          // Check required fields using array methods
          requiredFields.forEach(field => {
              if (!formData[field] || formData[field].trim() === '') {
                  errors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
              }
          });
          
          // Email validation with conditional branching
          if (formData.email) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(formData.email)) {
                  errors.email = 'Please enter a valid email address';
              }
          }
          
          // Age validation
          if (formData.age) {
              const age = parseInt(formData.age);
              if (age < 5 || age > 100) {
                  errors.age = 'Age must be between 5 and 100';
              }
          }
          
          // Phone validation if provided
          if (formData.phone && formData.phone.trim() !== '') {
              const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
              if (!phoneRegex.test(formData.phone)) {
                  errors.phone = 'Please enter a valid phone number';
              }
          }
          
          // Terms agreement
          if (!formData.terms) {
              errors.terms = 'You must agree to the terms and conditions';
          }
          
          return errors;
      }

      // Display form errors using DOM manipulation
      function displayFormErrors(errors) {
          // Clear all existing errors
          document.querySelectorAll('.form-group').forEach(group => {
              group.classList.remove('error');
          });
          
          // Display new errors using template literals
          Object.keys(errors).forEach(fieldName => {
              const formGroup = document.querySelector(`#${fieldName}`).closest('.form-group');
              const errorElement = formGroup.querySelector('.error-message');
              
              if (formGroup && errorElement) {
                  formGroup.classList.add('error');
                  errorElement.textContent = errors[fieldName];
              }
          });
      }

      // Handle form submission with event handling
      function handleFormSubmit(event) {
          event.preventDefault();
          
          const formData = new FormData(elements.membershipForm);
          const data = {};
          
          // Convert FormData to object using modern JavaScript
          for (let [key, value] of formData.entries()) {
              if (data[key]) {
                  // Handle multiple values (checkboxes)
                  if (Array.isArray(data[key])) {
                      data[key].push(value);
                  } else {
                      data[key] = [data[key], value];
                  }
              } else {
                  data[key] = value;
              }
          }
          
          // Add checkbox values using array methods
          const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
              .map(checkbox => checkbox.value);
          data.interests = interests;
          
          // Add boolean fields
          data.newsletter = document.getElementById('newsletter').checked;
          data.terms = document.getElementById('terms').checked;
          
          // Validate form
          const errors = validateForm(data);
          
          if (Object.keys(errors).length > 0) {
              displayFormErrors(errors);
              return;
          }
          
          // Clear any existing errors
          displayFormErrors({});
          
          // Simulate form submission
          const submitBtn = document.querySelector('.submit-btn');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
          
          // Add member to localStorage using objects and arrays
          setTimeout(() => {
              const newMember = {
                  id: Date.now(),
                  ...data,
                  joinDate: new Date().toISOString(),
                  status: 'pending'
              };
              
              clubData.members.push(newMember);
              localStorage.setItem('clubMembers', JSON.stringify(clubData.members));
              
              // Update stats
              clubData.stats.memberCount++;
              updateStatsDisplay();
              
              // Show success message
              elements.membershipForm.style.display = 'none';
              elements.formSuccess.style.display = 'block';
              
              // Reset form after delay
              setTimeout(() => {
                  elements.membershipForm.reset();
                  elements.membershipForm.style.display = 'block';
                  elements.formSuccess.style.display = 'none';
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Submit Application';
              }, 5000);
              
              console.log(`New member registered: ${newMember.fullName}`);
          }, 2000);
      }

      // Animate statistics using conditional branching
      function animateStats() {
          Object.keys(elements.statNumbers).forEach(statKey => {
              const element = elements.statNumbers[statKey];
              if (element) {
                  const targetValue = clubData.stats[statKey];
                  const startValue = 0;
                  const duration = 2000;
                  const startTime = Date.now();
                  
                  function updateNumber() {
                      const currentTime = Date.now();
                      const progress = Math.min((currentTime - startTime) / duration, 1);
                      const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
                      
                      element.textContent = currentValue;
                      
                      if (progress < 1) {
                          requestAnimationFrame(updateNumber);
                      }
                  }
                  
                  updateNumber();
              }
          });
      }

      // Update statistics display
      function updateStatsDisplay() {
          Object.keys(elements.statNumbers).forEach(statKey => {
              const element = elements.statNumbers[statKey];
              if (element) {
                  element.textContent = clubData.stats[statKey];
              }
          });
      }

      // Lazy loading implementation with DOM interaction
      function initializeLazyLoading() {
          const lazyElements = document.querySelectorAll('.lazy-load');
          
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add('loaded');
                      observer.unobserve(entry.target);
                  }
              });
          }, {
              threshold: 0.1,
              rootMargin: '50px'
          });
          
          lazyElements.forEach(element => {
              element.classList.remove('loaded');
              observer.observe(element);
          });
      }

      // Event listeners setup using modern JavaScript
      function setupEventListeners() {
          // Navigation event listeners
          elements.menuToggle.addEventListener('click', toggleMobileMenu);
          
          elements.navLinks.forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const pageName = link.getAttribute('data-page');
                  navigateToPage(pageName);
              });
          });
          
          // Form event listener
          if (elements.membershipForm) {
              elements.membershipForm.addEventListener('submit', handleFormSubmit);
          }
          
          // Footer links event handling
          document.querySelectorAll('.footer-links a[data-page]').forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const pageName = link.getAttribute('data-page');
                  navigateToPage(pageName);
              });
          });
          
          // CTA button event handling
          document.querySelectorAll('.cta-button[data-page]').forEach(button => {
              button.addEventListener('click', (e) => {
                  e.preventDefault();
                  const pageName = button.getAttribute('data-page');
                  navigateToPage(pageName);
              });
          });
          
          // Keyboard navigation for accessibility
          document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && elements.navMenu.classList.contains('active')) {
                  elements.navMenu.classList.remove('active');
              }
          });
          
          // Window resize handler for responsive design
          window.addEventListener('resize', () => {
              if (window.innerWidth > 768) {
                  elements.navMenu.classList.remove('active');
              }
          });
      }

      // Initialize application using multiple functions and DOM interaction
      function initializeApp() {
          // Create chess board
          createChessBoard();
          
          // Load saved board state
          loadBoardState();
          
          // Setup all event listeners
          setupEventListeners();
          
          // Initialize lazy loading
          initializeLazyLoading();
          
          // Load member data from localStorage
          const savedMembers = localStorage.getItem('clubMembers');
          if (savedMembers) {
              clubData.members = JSON.parse(savedMembers);
              clubData.stats.memberCount = Math.max(250, clubData.members.length);
          }
          
          // Update statistics display
          updateStatsDisplay();
          
          // Set initial page
          navigateToPage('home');
          
          console.log('Royal Chess Club website initialized successfully!');
          console.log(`Total members: ${clubData.members.length}`);
      }

      // Load data from localStorage on page load
      window.addEventListener('load', initializeApp);
      
      // Save important data before page unload
      window.addEventListener('beforeunload', () => {
          localStorage.setItem('clubMembers', JSON.stringify(clubData.members));
      });
      
      // Additional utility functions using template literals
      function generateMemberWelcomeMessage(memberName, membershipType) {
          return `Welcome to Royal Chess Club, ${memberName}! Your ${membershipType} membership application has been received.`;
      }
      
      function formatMembershipData(member) {
          const interests = Array.isArray(member.interests) ? member.interests.join(', ') : 'None specified';
          return `Member: ${member.fullName}, Level: ${member.experience}, Interests: ${interests}`;
      }
      
      // Console logging for debugging (using template literals)
      console.log(`Chess Club Website loaded at ${new Date().toLocaleString()}`);