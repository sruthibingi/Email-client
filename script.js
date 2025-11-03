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