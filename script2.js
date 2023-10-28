const songs = [
    { name: "Ori vaari", image: "https://i.scdn.co/image/ab67616d0000b273f835034391321fe6fe71e025" },
    { name: "Manasa", image: "https://i.scdn.co/image/ab67616d00001e02bda3e5e799de28c2fd81fd02" },
    { name: "Guche Gulabi", image: "https://i.scdn.co/image/ab67616d0000b2735f64b441dcd312bf4e89d771" },
    { name: "Aamchi Mumbai", image: "https://i.scdn.co/image/ab67616d0000b273ae38bb569156cab3fc510052"},
  ];

  function searchSongs(query) {
    const searchResults = document.getElementById("search-results");
    const searchMessage = document.getElementById("search-message");
    searchResults.innerHTML = ""; 

    const list = document.querySelector('.list');
    const listHidden = document.querySelector('.list-hidden');

    if (query.trim() === "") {
      list.style.display = 'flex'; 
      listHidden.style.display = 'none'; 
      searchMessage.style.display = 'none'; 
      return;
    }

    const matchingSongs = songs.filter(song =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );

    if (matchingSongs.length === 0) {
      searchMessage.style.display = 'block';
    } else {
      matchingSongs.forEach(song => {
        const searchItem = document.createElement("div");
        searchItem.classList.add("search-item");

        const image = document.createElement("img");
        image.src = song.image;
        image.alt = song.name;

        const songText = document.createElement("p");
        songText.textContent = song.name;

        searchItem.appendChild(image);
        searchItem.appendChild(songText);
        searchResults.appendChild(searchItem);
      });
      searchMessage.style.display = 'none'; 
    }

    list.style.display = 'none';
    listHidden.style.display = 'flex'; 
  }