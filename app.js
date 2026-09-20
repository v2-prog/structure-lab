(function () {
  var KEY = "acerlab.household.v1";

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

  var form = document.getElementById("household-form");
  if (!form) return;

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  var saved = read();
  ["size", "land", "purpose", "smsf", "will", "state"].forEach(function (name) {
    if (saved[name] && form.elements[name]) form.elements[name].value = saved[name];
  });
  if (Object.keys(saved).length) render(saved);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {
      size: form.elements.size.value,
      land: form.elements.land.value,
      purpose: form.elements.purpose.value,
      smsf: form.elements.smsf.value,
      will: form.elements.will.value,
      state: form.elements.state.value,
      at: new Date().toISOString()
    };
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

  function render(d) {
    var box = document.getElementById("profile-out");
    if (!box) return;
    var lines = neighbourhood(d);
    box.hidden = false;
    box.querySelector("[data-summary]").innerHTML = lines.map(function (x) {
      return "<li>" + x + "</li>";
    }).join("");
  }

  function neighbourhood(d) {
    var out = [];
    out.push("This record stays in this browser only. It is not an account and it is not advice.");
    if (d.land === "eco") {
      out.push("Land purpose looks like an eco-settlement / CLT neighbourhood. Start in the Studio and the Explorer cards with an asset lock.");
      out.push("Hard line: a charity or community land trust with an asset lock cannot be a substitute for a family discretionary trust.");
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
    }
    if (d.will === "no") {
      out.push("No will / BDBN noted. Testamentary gifts and death-benefit nominations are usually earlier than any land movement.");
    } else if (d.will === "yes") {
      out.push("A will or BDBN exists. Have the solicitor read it against the current title and any trust deed before a gift or covenant.");
    }
    if (d.state && d.state !== "none") {
      out.push("Duty and titles live in " + d.state + ". Rates differ by State and Territory — this lab does not quote them.");
    }
    if (d.size === "1") out.push("Single-person household: control and successor questions still matter if a trust or company is used.");
    if (d.size === "5plus") out.push("Larger household: Div 6AA and s100A flags become more likely if minors or working-age children are paid from a trust.");
    return out;
  }
})();
