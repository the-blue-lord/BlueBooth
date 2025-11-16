const usrnm = sessionStorage.username;
if(usrnm) document.getElementById("username").value = usrnm;

const room_id = (new URLSearchParams(window.location.search)).get("room");
if(room_id) document.getElementById("room-id").value = room_id;

document.getElementById("join-room").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.username = document.getElementById("username").value;
    window.location.href = `/games/snake/lobby?room=${document.getElementById("room-id").value}`;
});