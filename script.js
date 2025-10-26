// document.addEventListener("DOMContentLoaded", () => {
//   // ---------------- LocalStorage Keys ----------------
//   const USERS_KEY = "emailUsers";
//   const CURRENT_USER_KEY = "currentUser";
//   const EMAILS_KEY = "emails";

//   // ---------------- Helper Functions ----------------
//   function getUsers() {
//     return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
//   }

//   function saveUsers(users) {
//     localStorage.setItem(USERS_KEY, JSON.stringify(users));
//   }

//   function getCurrentUser() {
//     return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
//   }

//   function setCurrentUser(user) {
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
//   }

//   function getEmails() {
//     return JSON.parse(localStorage.getItem(EMAILS_KEY)) || [];
//   }

//   function saveEmails(emails) {
//     localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));
//   }

//   // ---------------- Page Detection ----------------
//   const path = window.location.pathname;

//   // ================= SIGN UP PAGE =================
//   if (path.includes("signup.html")) {
//     const signupBtn = document.getElementById("signupBtn");
//     signupBtn.addEventListener("click", () => {
//       const email = document.getElementById("signupEmail").value.trim();
//       const password = document.getElementById("signupPassword").value.trim();

//       if (!email || !password) {
//         alert("Please fill all fields.");
//         return;
//       }

//       const users = getUsers();
//       const exists = users.find(u => u.email === email);

//       if (exists) {
//         alert("User already exists! Please sign in.");
//         return;
//       }

//       users.push({ email, password });
//       saveUsers(users);

//       alert("Sign up successful! Redirecting to sign in...");
//       window.location.href = "signin.html";
//     });
//   }

//   // ================= SIGN IN PAGE =================
//   if (path.includes("signin.html")) {
//     const signinBtn = document.getElementById("signinBtn");
//     signinBtn.addEventListener("click", () => {
//       const email = document.getElementById("signinEmail").value.trim();
//       const password = document.getElementById("signinPassword").value.trim();

//       if (!email || !password) {
//         alert("Please fill all fields.");
//         return;
//       }

//       const users = getUsers();
//       const user = users.find(u => u.email === email && u.password === password);

//       if (!user) {
//         alert("Invalid email or password.");
//         return;
//       }

//       setCurrentUser(user);
//       alert("Login successful!");
//       window.location.href = "email.html";
//     });
//   }

//   // ================= EMAIL PAGE =================
//   if (path.includes("email.html")) {
//     const user = getCurrentUser();
//     if (!user) {
//       alert("Please sign in first.");
//       window.location.href = "signin.html";
//       return;
//     }

//     // Elements
//     const composeBtn = document.getElementById("composeBtn");
//     const logoutBtn = document.getElementById("logoutBtn");
//     const sendBtn = document.getElementById("sendBtn");
//     const closeCompose = document.getElementById("closeCompose");
//     const composeBox = document.getElementById("composeBox");
//     const listDiv = document.getElementById("list");
//     const paneDiv = document.getElementById("pane");
//     const msgView = document.getElementById("messageView");
//     const emptyState = document.getElementById("emptyState");
//     const inboxCount = document.getElementById("inboxCount");

//     // Display user email
//     document.querySelector(".muted").textContent = user.email;

//     // Show compose box
//     composeBtn.addEventListener("click", () => {
//       composeBox.style.display = "block";
//     });

//     // Close compose box
//     closeCompose.addEventListener("click", () => {
//       composeBox.style.display = "none";
//     });

//     // Logout
//     logoutBtn.addEventListener("click", () => {
//       localStorage.removeItem(CURRENT_USER_KEY);
//       window.location.href = "signin.html";
//     });

//     // Send email
//     sendBtn.addEventListener("click", () => {
//       const to = document.getElementById("to").value.trim();
//       const subject = document.getElementById("subject").value.trim();
//       const body = document.getElementById("body").value.trim();

//       if (!to || !subject || !body) {
//         alert("Please fill all fields.");
//         return;
//       }

//       const emails = getEmails();

//       const newMail = {
//         id: Date.now(),
//         from: user.email,
//         to,
//         subject,
//         body,
//         time: new Date().toLocaleString(),
//       };

//       emails.push(newMail);
//       saveEmails(emails);

//       alert("Mail sent successfully!");
//       composeBox.style.display = "none";
//       loadInbox();
//     });

//     // Load inbox messages
//     function loadInbox() {
//       const emails = getEmails().filter(e => e.to === user.email);
//       listDiv.innerHTML = "";

//       if (emails.length === 0) {
//         listDiv.innerHTML = "<p style='text-align:center;margin-top:20px;'>No messages.</p>";
//       } else {
//         emails.reverse().forEach(mail => {
//           const item = document.createElement("div");
//           item.classList.add("mail-item");
//           item.innerHTML = `
//             <div style="font-weight:600">${mail.from}</div>
//             <div>${mail.subject}</div>
//             <div class="muted" style="font-size:12px">${mail.time}</div>
//           `;
//           item.addEventListener("click", () => showMail(mail));
//           listDiv.appendChild(item);
//         });
//       }

//       inboxCount.textContent = emails.length;
//     }

//     // Show selected mail
//     function showMail(mail) {
//       emptyState.style.display = "none";
//       msgView.style.display = "block";
//       document.getElementById("msgFrom").textContent = mail.from;
//       document.getElementById("msgTo").textContent = "to " + mail.to;
//       document.getElementById("msgSubject").textContent = mail.subject;
//       document.getElementById("msgTime").textContent = mail.time;
//       document.getElementById("msgBody").textContent = mail.body;
//     }

//     loadInbox();
//   }
// });
  





// document.addEventListener("DOMContentLoaded", () => {
//   // ----------- LocalStorage Keys -----------
//   const USERS_KEY = "emailUsers";
//   const CURRENT_USER_KEY = "currentUser";
//   const EMAILS_KEY = "emails";

//   // ----------- Helper Functions -----------
//   const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
//   const saveUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users));

//   const getEmails = () => JSON.parse(localStorage.getItem(EMAILS_KEY)) || [];
//   const saveEmails = emails => localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));

//   const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
//   const setCurrentUser = user => localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

//   const path = window.location.pathname;

//   // ================= SIGN UP =================
//   const signupBtn = document.getElementById("signupBtn");
//   if (signupBtn) {
//     signupBtn.addEventListener("click", () => {
//       const email = document.getElementById("signupEmail").value.trim();
//       const password = document.getElementById("signupPassword").value.trim();
//       if (!email || !password) return alert("Please fill all fields");

//       const users = getUsers();
//       if (users.find(u => u.email === email)) return alert("User already exists!");

//       users.push({ email, password });
//       saveUsers(users);
//       alert("Sign up successful! Please sign in.");
//       window.location.href = "signin.html";
//     });
//   }

//   // ================= SIGN IN =================
//   const signinBtn = document.getElementById("signinBtn");
//   if (signinBtn) {
//     signinBtn.addEventListener("click", () => {
//       const email = document.getElementById("signinEmail").value.trim();
//       const password = document.getElementById("signinPassword").value.trim();
//       if (!email || !password) return alert("Please fill all fields");

//       const users = getUsers();
//       const user = users.find(u => u.email === email && u.password === password);
//       if (!user) return alert("Invalid email or password");

//       setCurrentUser(user);
//       window.location.href = "email.html";
//     });
//   }

//   // ================= EMAIL CLIENT =================
//   if (path.includes("email.html")) {
//     const user = getCurrentUser();
//     if (!user) return window.location.href = "signin.html";

//     // DOM Elements
//     const composeBtn = document.getElementById("composeBtn");
//     const logoutBtn = document.getElementById("logoutBtn");
//     const sendBtn = document.getElementById("sendBtn");
//     const closeCompose = document.getElementById("closeCompose");
//     const composeBox = document.getElementById("composeBox");
//     const listDiv = document.getElementById("list");
//     const inboxCount = document.getElementById("inboxCount");
//     const msgView = document.getElementById("messageView");
//     const emptyState = document.getElementById("emptyState");

//     const folders = ["inbox", "sent", "archive", "trash"];
//     let currentFolder = "inbox";

//     document.querySelector(".muted").textContent = user.email;

//     // ----------- Compose Actions -----------
//     composeBtn.addEventListener("click", () => composeBox.style.display = "block");
//     closeCompose.addEventListener("click", () => composeBox.style.display = "none");

//     sendBtn.addEventListener("click", () => {
//       const to = document.getElementById("to").value.trim();
//       const subject = document.getElementById("subject").value.trim();
//       const body = document.getElementById("body").value.trim();
//       if (!to || !subject || !body) return alert("Please fill all fields");

//       const users = getUsers();
//       if (!users.find(u => u.email === to)) return alert("Recipient not found");

//       const emails = getEmails();
//       const mail = {
//         id: Date.now(),
//         from: user.email,
//         to,
//         subject,
//         body,
//         time: new Date().toLocaleString(),
//         folder: "inbox"
//       };
//       emails.push(mail);

//       // Also store in sender's sent folder
//       const sentMail = { ...mail, folder: "sent" };
//       emails.push(sentMail);

//       saveEmails(emails);
//       composeBox.style.display = "none";
//       loadFolder(currentFolder);
//     });

//     // ----------- Logout -----------
//     logoutBtn.addEventListener("click", () => {
//       localStorage.removeItem(CURRENT_USER_KEY);
//       window.location.href = "signin.html";
//     });

//     // ----------- Folder Buttons -----------
//     document.querySelectorAll("[data-folder]").forEach(btn => {
//       btn.addEventListener("click", () => {
//         currentFolder = btn.dataset.folder;
//         document.querySelectorAll("[data-folder]").forEach(b => b.classList.remove("active"));
//         btn.classList.add("active");
//         loadFolder(currentFolder);
//       });
//     });

//     // ----------- Load Folder -----------
//     function loadFolder(folder) {
//       const emails = getEmails().filter(mail => mail.folder === folder &&
//         (folder === "sent" ? mail.from === user.email : mail.to === user.email));

//       listDiv.innerHTML = "";
//       inboxCount.textContent = getEmails().filter(m => m.folder === "inbox" && m.to === user.email).length;

//       if (emails.length === 0) {
//         listDiv.innerHTML = "<p style='text-align:center;margin-top:20px;'>No emails.</p>";
//         msgView.style.display = "none";
//         emptyState.style.display = "block";
//         return;
//       }

//       emails.reverse().forEach(mail => {
//         const item = document.createElement("div");
//         item.classList.add("mail-item");
//         item.innerHTML = `
//           <div style="font-weight:600">${mail.from}</div>
//           <div>${mail.subject}</div>
//           <div class="muted" style="font-size:12px">${mail.time}</div>
//         `;
//         item.addEventListener("click", () => showMail(mail));
//         listDiv.appendChild(item);
//       });
//     }

//     // ----------- Show Selected Mail -----------
//     function showMail(mail) {
//       emptyState.style.display = "none";
//       msgView.style.display = "block";

//       document.getElementById("msgFrom").textContent = mail.from;
//       document.getElementById("msgTo").textContent = `to ${mail.to}`;
//       document.getElementById("msgSubject").textContent = mail.subject;
//       document.getElementById("msgTime").textContent = mail.time;
//       document.getElementById("msgBody").textContent = mail.body;

//       // Buttons
//       document.getElementById("deleteBtn").onclick = () => moveMail(mail.id, "trash");
//       document.getElementById("replyBtn").onclick = () => openCompose(mail.from, "Re: " + mail.subject, mail.body);
//       document.getElementById("forwardBtn").onclick = () => openCompose("", "Fwd: " + mail.subject, mail.body);
//     }

//     // ----------- Compose Pre-fill for Reply/Forward -----------
//     function openCompose(to = "", subject = "", body = "") {
//       composeBox.style.display = "block";
//       document.getElementById("to").value = to;
//       document.getElementById("subject").value = subject;
//       document.getElementById("body").value = body;
//     }

//     // ----------- Move Mail to Another Folder -----------
//     function moveMail(id, folder) {
//       const emails = getEmails();
//       const index = emails.findIndex(m => m.id === id && 
//         ((folder === "sent" ? m.from === user.email : m.to === user.email) || folder === "trash"));
//       if (index !== -1) {
//         emails[index].folder = folder;
//         saveEmails(emails);
//         loadFolder(currentFolder);
//       }
//     }

//     // ----------- Initial Load -----------
//     loadFolder("inbox");
//   }
// });




document.addEventListener("DOMContentLoaded", () => {
  const USERS_KEY = "emailUsers";
  const CURRENT_USER_KEY = "currentUser";
  const EMAILS_KEY = "emailsPerUser";

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const saveUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const getEmails = () => JSON.parse(localStorage.getItem(EMAILS_KEY)) || {};
  const saveEmails = emails => localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));

  const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  const setCurrentUser = user => localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  const path = window.location.pathname;

  // ---------------- SIGN UP ----------------
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      if (!email || !password) return alert("Please fill all fields");

      const users = getUsers();
      if (users.find(u => u.email === email)) return alert("User already exists!");

      users.push({ email, password });
      saveUsers(users);
      alert("Sign up successful! Please sign in.");
      window.location.href = "signin.html";
    });
  }

  // ---------------- SIGN IN ----------------
  const signinBtn = document.getElementById("signinBtn");
  if (signinBtn) {
    signinBtn.addEventListener("click", () => {
      const email = document.getElementById("signinEmail").value.trim();
      const password = document.getElementById("signinPassword").value.trim();
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return alert("Invalid email or password");

      setCurrentUser(user);
      window.location.href = "email.html";
    });
  }

  // ---------------- EMAIL CLIENT ----------------
  if (path.includes("email.html")) {
    const user = getCurrentUser();
    if (!user) return window.location.href = "signin.html";

    const composeBox = document.getElementById("composeBox");
    const composeBtn = document.getElementById("composeBtn");
    const closeCompose = document.getElementById("closeCompose");
    const sendBtn = document.getElementById("sendBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const listDiv = document.getElementById("list");
    const inboxCount = document.getElementById("inboxCount");
    const msgView = document.getElementById("messageView");
    const emptyState = document.getElementById("emptyState");

    let currentFolder = "inbox";
    let selectedEmailId = null;

    document.querySelector(".muted").textContent = user.email;

    composeBtn.addEventListener("click", () => (composeBox.style.display = "block"));
    closeCompose.addEventListener("click", () => (composeBox.style.display = "none"));

    // ---------- Send Email ----------
    sendBtn.addEventListener("click", () => {
      const to = document.getElementById("to").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const body = document.getElementById("body").value.trim();
      if (!to || !subject || !body) return alert("Please fill all fields");

      const users = getUsers();
      if (!users.find(u => u.email === to)) return alert("Recipient not found");

      const emails = getEmails();

      // Inbox email for recipient
      const inboxMail = {
        id: Date.now(),
        from: user.email,
        to,
        subject,
        body,
        time: new Date().toLocaleString(),
        folder: "inbox"
      };

      // Sent email for sender
      const sentMail = { ...inboxMail, folder: "sent" };

      // Add email to recipient
      if (!emails[to]) emails[to] = [];
      emails[to].push(inboxMail);

      // Add email to sender
      if (!emails[user.email]) emails[user.email] = [];
      emails[user.email].push(sentMail);

      saveEmails(emails);

      composeBox.style.display = "none";
      document.getElementById("to").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("body").value = "";

      loadFolder(currentFolder);
    });

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(CURRENT_USER_KEY);
      window.location.href = "signin.html";
    });

    document.querySelectorAll("[data-folder]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentFolder = btn.dataset.folder;
        document.querySelectorAll("[data-folder]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadFolder(currentFolder);
      });
    });

    // ---------- Load Emails for Current User ----------
    function loadFolder(folder) {
      selectedEmailId = null;
      const allEmails = getEmails()[user.email] || [];
      const emails = allEmails.filter(mail => {
        if (folder === "sent") return mail.folder === "sent";
        else return mail.folder === folder;
      });

      inboxCount.textContent = (getEmails()[user.email] || []).filter(m => m.folder === "inbox").length;

      listDiv.innerHTML = "";
      msgView.style.display = "none";
      emptyState.style.display = emails.length ? "none" : "block";

      emails.reverse().forEach(mail => {
        const item = document.createElement("div");
        item.classList.add("mail-item");
        item.innerHTML = `
          <div style="font-weight:600">${mail.from}</div>
          <div>${mail.subject}</div>
          <div class="muted" style="font-size:12px">${mail.time}</div>`;
        item.addEventListener("click", () => showMail(mail));
        listDiv.appendChild(item);
      });
    }

    function showMail(mail) {
      selectedEmailId = mail.id;
      msgView.style.display = "block";
      emptyState.style.display = "none";

      document.getElementById("msgFrom").textContent = mail.from;
      document.getElementById("msgTo").textContent = `to ${mail.to}`;
      document.getElementById("msgSubject").textContent = mail.subject;
      document.getElementById("msgTime").textContent = mail.time;
      document.getElementById("msgBody").textContent = mail.body;

      document.getElementById("deleteBtn").onclick = () => moveMail("trash");
      document.getElementById("replyBtn").onclick = () => openCompose(mail.from, "Re: " + mail.subject, mail.body);
      document.getElementById("forwardBtn").onclick = () => openCompose("", "Fwd: " + mail.subject, mail.body);
    }

    function openCompose(to = "", subject = "", body = "") {
      composeBox.style.display = "block";
      document.getElementById("to").value = to;
      document.getElementById("subject").value = subject;
      document.getElementById("body").value = body;
    }

    function moveMail(folder) {
      if (!selectedEmailId) return;
      const emails = getEmails();
      const userEmails = emails[user.email] || [];
      const index = userEmails.findIndex(m => m.id === selectedEmailId);
      if (index !== -1) {
        userEmails[index].folder = folder;
        emails[user.email] = userEmails;
        saveEmails(emails);
        loadFolder(currentFolder);
      }
    }

    loadFolder("inbox");
  }
});