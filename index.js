"use strict";

// sample data - expanded Star Wars characters with varied ages
const users = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6
const brokenUsers = [
  { id: 1, age: 23 }, // missing name
  { id: 2, name: "Darth Vader" }, // missing age
  { id: 3 }, // missing everything
  { id: 4, name: "Obi-Wan Kenobi", age: 57 }
];

// ✅ Utility: render list items into a <ul>
function renderList(array, listId, errorContainerId) {
  const ul = document.getElementById(listId);
  const errorDiv = errorContainerId ? document.getElementById(errorContainerId) : null;

  ul.innerHTML = ""; // clear list
  if (errorDiv) errorDiv.innerHTML = ""; // clear errors

  if (array.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No results found.";
    emptyMsg.classList.add("empty-list");
    ul.appendChild(emptyMsg);
    return;
  }

  array.forEach(obj => {
    try {
      if (!obj.name) {
        throw new Error(`Missing "name" property in object: ${JSON.stringify(obj)}`);
      }
      const li = document.createElement("li");
      li.textContent = obj.name;
      ul.appendChild(li);
    } catch (err) {
      console.error(err.message);
      if (errorDiv) {
        const msg = document.createElement("div");
        msg.textContent = err.message;
        msg.classList.add("error-message");
        errorDiv.appendChild(msg);
      }
    }
  });
}

// ✅ 1. Print all names
console.log("All characters:");
users.forEach(u => console.log(u.name));
renderList(users, "names-list");

// ✅ 2. Filter age < 40
const under40 = users.filter(u => u.age < 40);
console.log("Characters under 40:");
under40.forEach(u => console.log(u.name));
renderList(under40, "young-characters-list");

// ✅ 3. Reusable function demo
renderList(users, "function-list");

// ✅ 4. Function with age threshold
function renderByAge(array, maxAge, listId) {
  const filtered = array.filter(u => u.age < maxAge);
  renderList(filtered, listId);
}
renderByAge(users, 50, "age-filter-list"); // demo with < 50

// ✅ 5. Error handling with proper messages
renderList(users, "error-handling-list", "error-messages");

// ✅ 6. Broken array test
renderList(brokenUsers, "broken-array-list", "broken-array-errors");
