(function () {
  var KEY = "acerlab.household.v2";
  var DISCLAIMER = "General information only. Not tax, legal or financial advice. Confirm with a registered tax agent and solicitor. Rules include 2026–28 announced reforms that may change.";
  var HARD = "A charity or community land trust with an asset lock cannot be a substitute for a family discretionary trust.";

  var NAV = [
    { n: "1", href: "index.html", id: "home", label: "Home" },
    { n: "2", href: "profile.html", id: "profile", label: "Household profile" },
    { n: "3", href: "succession.html", id: "succession", label: "Succession planner" },
    { n: "4", href: "explorer.html", id: "explorer", label: "Structure explorer" },
    { n: "5", href: "workshop.html", id: "workshop", label: "Scenario workshop" },
    { n: "6", href: "studio.html", id: "studio", label: "CLT / charity / co-op studio" },
    { n: "7", href: "compare.html", id: "compare", label: "Compare" },
    { n: "8", href: "checklist.html", id: "checklist", label: "Action checklist" },
    { n: "9", href: "glossary.html", id: "glossary", label: "Glossary & timeline" }
  ];

  function pageId() {
    var b = document.body.getAttribute("data-page") || "";
    if (b) return b;
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!file || file === "") return "home";
    if (file === "index.html") return "home";
    return file.replace(".html", "");
  }

  function navHtml(current) {
    return NAV.map(function (item) {
      var on = item.id === current;
      return '<a class="' + (on ? "is-current" : "") + '" href="' + item.href + '"' +
        (on ? ' aria-current="page"' : "") + '><span class="n">' + item.n + "</span>" + item.label + "</a>";
    }).join("");
  }

  function injectNav() {
    var current = pageId();
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.innerHTML = navHtml(current);
    });
    var crumbN = document.querySelector("[data-crumb-n]");
    var crumbL = document.querySelector("[data-crumb-label]");
    var item = NAV.filter(function (x) { return x.id === current; })[0];
    if (item && crumbN) crumbN.textContent = item.n;
    if (item && crumbL) crumbL.textContent = item.label;
  }

  function bindDrawer() {
    document.querySelectorAll("[data-open-nav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = document.getElementById("drawer");
        if (d) d.classList.add("is-open");
      });
    });
    document.querySelectorAll("[data-close-nav]").forEach(function (el) {
      el.addEventListener("click", function () {
        var d = document.getElementById("drawer");
        if (d) d.classList.remove("is-open");
      });
    });
  }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function write(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  window.LabAU = {
    KEY: KEY,
    DISCLAIMER: DISCLAIMER,
    HARD: HARD,
    read: read,
    write: write
  };

  function bindProfile() {
    var form = document.getElementById("household-form");
    if (!form) return;
    var fields = ["size", "land", "purpose", "smsf", "will", "state", "objective"];
    var saved = read();
    fields.forEach(function (name) {
      if (saved[name] && form.elements[name]) form.elements[name].value = saved[name];
    });
    if (Object.keys(saved).length) render(saved);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = { at: new Date().toISOString() };
      fields.forEach(function (name) {
        data[name] = form.elements[name] ? form.elements[name].value : "";
      });
      write(data);
      render(data);
    });

    var clearBtn = document.getElementById("clear-profile");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        localStorage.removeItem(KEY);
        form.reset();
        var box = document.getElementById("profile-out");
        if (box) box.hidden = true;
      });
    }
  }

  function render(d) {
    var box = document.getElementById("profile-out");
    if (!box) return;
    box.hidden = false;
    box.querySelector("[data-summary]").innerHTML = neighbourhood(d).map(function (x) {
      return "<li>" + x + "</li>";
    }).join("");
    var extra = box.querySelector("[data-routes]");
    if (extra) extra.innerHTML = routes(d);
  }

  function neighbourhood(d) {
    var out = [];
    out.push("This record stays in this browser only. It is not an account and it is not advice.");
    var obj = d.objective || "";
    if (obj === "protection") {
      out.push("Primary objective flagged: asset protection during life. Explorer first — look at who controls the asset and whether it is reachable on a personal claim. Protection is never guaranteed.");
    } else if (obj === "succession") {
      out.push("Primary objective flagged: family succession. Prioritise the Succession planner and structures with a clear control path (appointor, director, BDBN, membership) and lower dependence on probate alone.");
    } else if (obj === "stewardship") {
      out.push("Primary objective flagged: multi-generational stewardship. Compare family vehicles that can last with purpose wrappers that lock land. They are usually two instruments, not one.");
    } else if (obj === "community") {
      out.push("Primary objective flagged: community ownership. Start in the Studio. Asset lock and ground-lease questions come before any family distribution story.");
    } else if (obj === "charity") {
      out.push("Primary objective flagged: charitable purpose. Studio and Explorer cards with an asset lock. Deductibility of gifts is a separate endorsement question.");
    } else if (obj === "hybrid") {
      out.push("Primary objective flagged: hybrid. Expect more than one vehicle. A purpose lock and a family discretionary trust answer different jobs.");
    }

    if (d.land === "eco") {
      out.push("Land purpose looks like an eco-settlement / CLT neighbourhood. Start in the Studio and the Explorer cards that carry an asset lock.");
      out.push(HARD);
    } else if (d.land === "invest") {
      out.push("Investment land usually sits near a discretionary trust, company, or SMSF stack — Explorer first, then the sell / hold workshop.");
    } else if (d.land === "home") {
      out.push("Owner-occupier land brings main-residence CGT flags. Confirm current law before any gift, subdivision or change of use.");
    } else {
      out.push("No land flagged yet. Family investment questions can still start with the Explorer (trust / company / SMSF).");
    }
    if (d.purpose === "yes") {
      out.push("A purpose entity already exists. Read the Studio on asset lock, responsible persons and DGR as a pathway — not a promise.");
    } else if (d.land === "eco") {
      out.push("No purpose wrapper yet. Do not move title before a solicitor has sketched CLT / co-op / company-limited-by-guarantee options against a family trust.");
    }
    if (d.smsf === "yes") {
      out.push("SMSF is in play. Related-party land, in-house asset and sole-purpose flags sit with the fund deed. Ask the SMSF auditor and a tax agent before any transfer.");
    } else if (d.smsf === "planning") {
      out.push("An SMSF is under consideration. Membership, trustee form and contribution caps belong with a registered tax agent before land is discussed.");
    }
    if (d.will === "no") {
      out.push("No will / BDBN noted. Testamentary gifts and death-benefit nominations are usually earlier than any land movement.");
    } else if (d.will === "yes") {
      out.push("A will or BDBN exists. Have the solicitor read it against the current title and any trust deed before a gift or covenant.");
    } else if (d.will === "partial") {
      out.push("Documents exist but are incomplete. Succession planner first — a half-finished will is a common delay and challenge flag.");
    }
    if (d.state && d.state !== "none") {
      out.push("Duty and titles live in " + d.state + ". Rates differ by State and Territory — this lab does not quote them.");
    }
    if (d.size === "1") out.push("Single-person household: control and successor questions still matter if a trust or company is used.");
    if (d.size === "5plus") out.push("Larger household: Div 6AA and s100A flags become more likely if minors or working-age children are paid from a trust.");
    out.push("Announced 2026–28 reforms (CGT settings from 1 July 2027; proposed 30% minimum tax on some discretionary trusts from 1 July 2028) may change the neighbourhood. Confirm current law.");
    return out;
  }

  function routes(d) {
    var links = [];
    if (d.objective === "succession" || d.objective === "stewardship" || d.will !== "yes") {
      links.push('<a class="btn" href="succession.html">Open succession planner</a>');
    }
    if (d.land === "eco" || d.objective === "community" || d.objective === "charity") {
      links.push('<a class="btn" href="studio.html">Open the studio</a>');
    } else {
      links.push('<a class="btn" href="explorer.html">Open the explorer</a>');
    }
    links.push('<a class="btn btn-ghost" href="compare.html">Open compare</a>');
    return links.join("");
  }

  function bindFilters() {
    var root = document.querySelector("[data-filter-root]");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var key = btn.getAttribute("data-filter");
      root.querySelectorAll("[data-filter]").forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");
      document.querySelectorAll("[data-struct]").forEach(function (card) {
        var show = key === "all" || card.getAttribute("data-family") === key || card.getAttribute("data-lock") === key;
        card.hidden = !show;
      });
    });
  }

  function bindChecklist() {
    var KEYC = "acerlab.checklist.v1";
    var boxes = document.querySelectorAll("[data-check] input[type=checkbox]");
    if (!boxes.length) return;
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEYC) || "{}"); } catch (e) { saved = {}; }
    boxes.forEach(function (box, i) {
      box.checked = !!saved[i];
      box.addEventListener("change", function () {
        var next = {};
        boxes.forEach(function (b, j) { next[j] = b.checked; });
        localStorage.setItem(KEYC, JSON.stringify(next));
      });
    });
  }

  injectNav();
  bindDrawer();
  bindProfile();
  bindFilters();
  bindChecklist();
})();
