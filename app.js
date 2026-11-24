const $ = (id) => document.getElementById(id);
const KEY = "gramaVaaniDemoGrievances";
const getGrievances = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
const saveGrievances = (items) => localStorage.setItem(KEY, JSON.stringify(items));

$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const opened = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(opened));
  $("menuToggle").textContent = opened ? "×" : "☰";
});
document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => {
  $("mainNav").classList.remove("open"); $("menuToggle").textContent = "☰"; $("menuToggle").setAttribute("aria-expanded","false");
}));

$("grievanceForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const id = "GV-" + Math.floor(100000 + Math.random() * 900000);
  const item = { id, name: data.get("name"), phone: data.get("phone"), category: data.get("category"), description: data.get("description"), status: "Submitted" };
  const items = getGrievances(); items.push(item); saveGrievances(items);
  $("grievanceMessage").textContent = `Your grievance has been saved in this browser. Reference ID: ${id}. Keep this ID to check the demo status.`;
  e.currentTarget.reset();
});

$("trackForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = new FormData(e.currentTarget).get("grievanceId").trim().toUpperCase();
  const item = getGrievances().find(g => g.id.toUpperCase() === id);
  $("trackResult").textContent = item ? `Reference: ${item.id} | Category: ${item.category} | Status: ${item.status}` : "No matching grievance was found in this browser. Check the ID or submit a demo grievance first.";
});

$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("loginMessage").textContent = "This is a front-end demonstration. Secure Panchayat accounts need a real backend and administrator-created credentials.";
});
$("logoutButton").addEventListener("click", () => $("dashboard").classList.add("hidden"));

$("feedbackForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("feedbackMessage").textContent = "Thank you! Your feedback has been received in this demo.";
  e.currentTarget.reset();
});
