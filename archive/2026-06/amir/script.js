window.addEventListener("click", (e) => {
  const tang = document.querySelector(".tang");
  const img = document.createElement("img");
  img.src = "tang.png";
  img.classList.add("tang-img");
  img.style.left = `${e.clientX}px`;
  img.style.top = `${e.clientY}px`;
  tang.appendChild(img);
});
