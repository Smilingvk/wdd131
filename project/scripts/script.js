const members = [ { name: 'Alice', experience: 'Advanced' }, { name: 'Bob', experience: 'Intermediate' }, { name: 'Carol', experience: 'Beginner' } ];
const events = [ { title: 'Monthly Blitz', date: '2025-07-15', year: 2025 }, { title: 'Summer Open', date: '2024-08-10', year: 2024 } ];

// Mostrar miembros
function displayMembers() {
  const list = document.getElementById('membersList');
  members.forEach(m => {
    const li = document.createElement('li');
    li.textContent = `${m.name} - ${m.experience}`;
    list.appendChild(li);
  });
}

// Mostrar miembro destacado
function displayFeaturedMember() {
  const idx = Math.floor(Math.random() * members.length);
  document.getElementById('featuredMember').textContent = `${members[idx].name}, ${members[idx].experience}`;
}