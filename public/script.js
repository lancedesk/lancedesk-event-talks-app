document.addEventListener('DOMContentLoaded', () => {
  const schedule = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  let talksData = [];

  // Fetch talk data from the embedded JSON
  try {
    const talksJSON = document.getElementById('talksData').textContent;
    talksData = JSON.parse(talksJSON);
  } catch (error) {
    console.error('Could not load talks data:', error);
    schedule.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
    return;
  }

  let startTime = new Date();
  startTime.setHours(10, 0, 0, 0);

  talksData.forEach((talk, index) => {
    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');

    const time = new Date(startTime);
    const endTime = new Date(time.getTime() + talk.duration * 60000);

    talkElement.innerHTML = `
      <h2>${talk.title}</h2>
      <p><strong>Time:</strong> ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
      <p><strong>Speaker(s):</strong> ${talk.speakers.join(', ')}</p>
      <p class="category"><strong>Category:</strong> ${talk.category.join(', ')}</p>
      <div class="details">
        <p>${talk.description}</p>
      </div>
    `;

    schedule.appendChild(talkElement);

    // Add break
    if (index === 2) {
      const breakElement = document.createElement('div');
      breakElement.classList.add('talk');
      const breakStartTime = new Date(endTime.getTime() + 10 * 60000);
      const breakEndTime = new Date(breakStartTime.getTime() + 60 * 60000);
      breakElement.innerHTML = `<h2>Lunch Break</h2><p><strong>Time:</strong> ${breakStartTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${breakEndTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>`;
      schedule.appendChild(breakElement);
      startTime = breakEndTime;
    } else {
        startTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break
    }

    talkElement.addEventListener('click', () => {
      talkElement.classList.toggle('active');
    });
  });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const talks = document.querySelectorAll('.talk');

    talks.forEach(talk => {
      const category = talk.querySelector('.category').textContent.toLowerCase();
      if (category.includes(searchTerm)) {
        talk.classList.remove('hide');
      } else {
        talk.classList.add('hide');
      }
    });
  });
});
