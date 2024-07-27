document.addEventListener("DOMContentLoaded", () => {
  const backgroundItems = [
      "☘️", "🍀", "⚘", "🌱", "🌿", "෴", "₊", "˚", "𖥧", "𖤣", "𓋼", "𓇗", "𓆑",
  ];

  const blanketItems = [
      "🧃", "🥧", "🥪", "🍉", "🍇", "🐜", "🍋", "🍒", "🥥", "🍐", "🍞", "🧀",
  ]; /* please work please work please work */

  const bodyElement = document.querySelector("body");
  const blanket = document.querySelector(".blanket");
  const blanketEmojisContainer = document.createElement("div");

  blanketEmojisContainer.className = "blanket-emojis";
  blanket.appendChild(blanketEmojisContainer);

  function getRandomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
  }

  function getRandomPosition(element, maxWidth, maxHeight) {
      const x = Math.random() * (maxWidth - element.offsetWidth);
      const y = Math.random() * (maxHeight - element.offsetHeight);
      return { x, y };
  }

  function isOverlapWithBlanket(x, y, width, height) {
      const blanketRect = blanket.getBoundingClientRect();
      return (
          x < blanketRect.left + blanketRect.width &&
          x + width > blanketRect.left &&
          y < blanketRect.top + blanketRect.height &&
          y + height > blanketRect.top
      );
  }

  function placeBackgroundItem(itemElement) {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      const itemRect = itemElement.getBoundingClientRect();
      let { x, y } = getRandomPosition(itemElement, maxWidth, maxHeight);

      const attempts = 100; // Limit to avoid infinite loop
      for (let i = 0; i < attempts; i++) {
          if (!isOverlapWithBlanket(x, y, itemRect.width, itemRect.height)) {
              itemElement.style.left = `${x}px`;
              itemElement.style.top = `${y}px`;
              return;
          }
          // Try a new position if overlap occurs
          ({ x, y } = getRandomPosition(itemElement, maxWidth, maxHeight));
      }

      // Fallback if no valid position found
      itemElement.style.left = `${x}px`;
      itemElement.style.top = `${y}px`;
  }

  function createItem(items, container, isBackground) {
      const item = getRandomItem(items);
      const itemElement = document.createElement("div");
      itemElement.className = "emoji";
      itemElement.textContent = item;

      container.appendChild(itemElement);

      // Apply sway animation only to background items
      if (isBackground) {
          itemElement.classList.add("sway");
          placeBackgroundItem(itemElement);
      } else {
          itemElement.classList.remove("sway"); // Ensure no sway animation
          const blanketRect = blanket.getBoundingClientRect();
          const itemRect = itemElement.getBoundingClientRect();
          let { x, y } = getRandomPosition(itemElement, blanketRect.width, blanketRect.height);

          // Ensure items are within the blanket
          itemElement.style.position = 'absolute';
          itemElement.style.left = `${x}px`;
          itemElement.style.top = `${y}px`;
      }
  }

  // Create background items (floating emojis)
  for (let i = 0; i < 20; i++) {
      createItem(backgroundItems, bodyElement, true);
  }

  // Create blanket-specific items (static on the blanket)
  for (let i = 0; i < 5; i++) {
      createItem(blanketItems, blanketEmojisContainer, false);
  }
});
