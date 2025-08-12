(function () {
  const containerId = "people-like-widget";
  const mdxUrl = "https://raw.githubusercontent.com/WorstGen/Pond0x-Data-Hub/main/src/community.mdx";
  const fallbackAvatar = "https://unavatar.io/github/ghost";

  function createWidget(users) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = `
      <div style="text-align:center;margin:2rem 0;font-family:sans-serif;">
        <h3 style="margin-bottom:1rem;">People like</h3>
        <div style="display:flex;flex-wrap:wrap;gap:2rem;justify-content:center;">
          ${users
            .map(user => {
              const avatar = `https://unavatar.io/x.com/${user}`;
              const profile = `https://x.com/${user}`;
              const referral = `https://pond0x.com/referral/${user}`;
              return `
                <div style="flex:0 1 150px;display:flex;flex-direction:column;align-items:center;">
                  <img src="${avatar}" onerror="this.src='${fallbackAvatar}'" alt="@${user}" style="width:64px;height:64px;border-radius:50%;margin-bottom:0.5rem;">
                  <a href="${profile}" target="_blank" rel="noopener noreferrer" style="margin-bottom:0.5rem;text-decoration:none;color:#1DA1F2;">
                    @${user}
                  </a>
                  <a href="${referral}" target="_blank" rel="noopener noreferrer" style="padding:0.5rem 1rem;background-color:#1DA1F2;color:white;border-radius:4px;text-decoration:none;font-weight:bold;">
                    Support on Pond0x
                  </a>
                </div>`;
            })
            .join("")}
        </div>
      </div>
    `;
    container.innerHTML = html;
  }

  function getRandomUsers(allUsers, count = 3) {
    const shuffled = allUsers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function fetchCommunity() {
    fetch(mdxUrl)
      .then(res => res.text())
      .then(text => {
        const matches = [...text.matchAll(/\[@([^\]]+)\]\(https:\/\/x\.com\/[^\)]+\)/g)];
        const usernames = matches.map(m => m[1]);
        if (usernames.length < 1) throw new Error("No usernames found");
        const selected = getRandomUsers(usernames, 3);
        createWidget(selected);
      })
      .catch(err => {
        console.error("Failed to load People Like widget", err);
        const container = document.getElementById(containerId);
        if (container) container.textContent = "Failed to load community widget.";
      });
  }

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchCommunity);
  } else {
    fetchCommunity();
  }
})();
