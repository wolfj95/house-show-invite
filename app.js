const form = document.getElementById("rsvp-form");
const statusEl = document.getElementById("form-status");
function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = kind || "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const rsvp = {
    name: form.elements.name.value.trim(),
    phone: form.elements.phone.value.trim(),
    open_mic_interest: form.elements.open_mic_interest.value, // "yes" | "maybe" | "no"
    notes: form.elements.notes.value.trim() || null,
  };

  if (!rsvp.name || !rsvp.phone) {
    setStatus("Please enter your name and phone number.", "error");
    return;
  }

  if (!rsvp.open_mic_interest) {
    setStatus("Please circle whether you'd like to play at the open mic.", "error");
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  setStatus("Sending…");

  try {
    // Insert via Supabase's REST API. "return=minimal" means we don't need
    // read access to the table, which anonymous visitors don't have.
    const res = await fetch(`${window.SUPABASE_URL}/rest/v1/rsvps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: window.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(rsvp),
    });

    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

    form.reset();
    setStatus("Thanks! Your RSVP is in. See you there 🎶", "success");
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong sending your RSVP. Please try again.", "error");
  } finally {
    button.disabled = false;
  }
});
