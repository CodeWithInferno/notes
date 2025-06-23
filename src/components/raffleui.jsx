"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

/**
 * Full CRUD-ready raffle manager.
 * – Creates new raffles
 * – Inline‑edits an existing raffle (UI only – POSTs to /api/raffle/update-raffle)
 * – Deletes raffles via /api/raffle/delete-raffle
 */
export default function RaffleManager() {
  /* ─────────────────── state ─────────────────── */
  const [prizes, setPrizes] = useState([]);
  const [newPrize, setNewPrize] = useState({ name: "", description: "", image: null });

  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc]   = useState("");
  const [start, setStart]             = useState(""); // datetime‑local string
  const [end, setEnd]                 = useState("");

  const [raffles, setRaffles]         = useState([]);
  const [editingId, setEditingId]     = useState(null); // null ⇢ create mode
  const [submitting, setSubmitting]   = useState(false);

  /* ─────────────────── helpers ─────────────────── */
  const resetForm = () => {
    setEditingId(null);
    setRaffleTitle("");
    setRaffleDesc("");
    setStart("");
    setEnd("");
    setPrizes([]);
  };

  /* ───── Add prize to local list ───── */

const handleAddPrize = async () => {
  if (!newPrize.name.trim()) return;

  let imageUrl = null;

  if (newPrize.image) {
    const formData = new FormData();
    formData.append("file", newPrize.image);

    try {
      const res = await fetch("/api/raffle/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("upload failed");
      const { url } = await res.json();
      imageUrl = url;
    } catch {
      console.warn("Image upload failed; continuing without image.");
    }
  }

  setPrizes(prev => [
    ...prev,
    {
      id: Date.now(),
      name: newPrize.name,
      description: newPrize.description,
      image_url: imageUrl,
    },
  ]);

  setNewPrize({ name: "", description: "", image: null });
};


  /* ───── Edit existing raffle (UI) ───── */
  const handleEditRaffle = (raffle) => {
    setEditingId(raffle.id);
    setRaffleTitle(raffle.title);
    setRaffleDesc(raffle.description || "");
    setStart(raffle.start_time.slice(0, 16)); // ISO → datetime‑local
    setEnd(raffle.end_time.slice(0, 16));
    // TODO: if you want to edit prizes too, fetch & load them here
  };

  /* ───── Delete raffle ───── */
  const handleDeleteRaffle = async (id) => {
    const res = await fetch("/api/raffle/delete-raffle", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raffle_id: id }),
    });
    const data = await res.json();
    if (data.success) {
      setRaffles((prev) => prev.filter((r) => r.id !== id));
      if (editingId === id) resetForm();
    } else {
      alert("❌ " + data.error);
    }
  };

  /* ───── Delete prize from local list ───── */
  const handleDeletePrize = (id) => setPrizes(prizes.filter((p) => p.id !== id));


/* ───── Create OR update raffle ───── */
const handleSaveRaffle = async () => {
  // 1) basic validation
  if (!raffleTitle || !start || !end || prizes.length === 0) {
    alert("Please fill all raffle details and at least 1 prize.");
    return;
  }

  // 2) payload that the API expects
  const payload = {
    id: editingId,             // null → create, uuid → update
    r_title: raffleTitle,
    r_description: raffleDesc,
    r_prize: prizes[0].name,
    r_start: new Date(start).toISOString(),
    r_end:   new Date(end).toISOString(),
    prizes,
  };

  // 👉  add UI-friendly keys so our table & edit form keep working
  const uiPatch = {
    ...payload,
    start_time: payload.r_start,
    end_time:   payload.r_end,
  };

  // 3) choose endpoint
  const endpoint = editingId
    ? "/api/raffle/update-raffle"
    : "/api/raffle/create-raffle";

  // 4) POST
  setSubmitting(true);
  const res  = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  setSubmitting(false);

  // 5) update UI + reset
  if (data.success) {
    alert(editingId ? "✅ Raffle updated." : "✅ Raffle created.");

    setRaffles(prev => {
      if (editingId) {
        // patch the row we just edited
        return prev.map(r =>
          r.id === editingId ? { ...r, ...uiPatch } : r
        );
      }
      // prepend brand-new raffle
      return [{ id: data.raffle_id, ...uiPatch, entry_count: 0 }, ...prev];
    });

    resetForm();
  } else {
    alert("❌ " + data.error);
  }
};



  /* ───── initial fetch of raffles ───── */
  useEffect(() => {
    const fetchRaffles = async () => {
      const res = await fetch("/api/raffle/get-raffles");
      const data = await res.json();
      if (data.raffles) setRaffles(data.raffles);
    };
    fetchRaffles();
  }, []);

  /* ─────────────────── render ─────────────────── */
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingId ? "Edit Raffle" : "Create New Raffle"}</CardTitle>
        <CardDescription>
          {editingId ? "Update raffle details" : "Define a raffle and its prize pool"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* form grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="Raffle title"       value={raffleTitle} onChange={(e) => setRaffleTitle(e.target.value)} />
          <Input placeholder="Raffle description" value={raffleDesc}  onChange={(e) => setRaffleDesc(e.target.value)}  />
          <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input type="datetime-local" value={end}   onChange={(e) => setEnd(e.target.value)}   />
        </div>

        {/* prize adder */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Prize name"  value={newPrize.name}        onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })} />
          <Input placeholder="Prize description" value={newPrize.description} onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })} />
          <Input type="file" accept="image/*" onChange={(e) => setNewPrize({ ...newPrize, image: e.target.files[0] })} />
          <Button onClick={handleAddPrize}>Add Prize</Button>
        </div>

        {/* prize list */}
        {prizes.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prizes.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePrize(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* existing raffles */}
        {raffles.length > 0 && (
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Existing Raffles</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Prize</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Entries</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {raffles.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.title}</TableCell>
                    <TableCell>{r.prize}</TableCell>
                    <TableCell>{new Date(r.start_time).toLocaleString()}</TableCell>
                    <TableCell>{new Date(r.end_time).toLocaleString()}</TableCell>
                    <TableCell>{r.entry_count || 0}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditRaffle(r)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteRaffle(r.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* action buttons */}
        <div className="flex gap-3">
          <Button onClick={handleSaveRaffle} disabled={submitting}>
            {submitting ? (editingId ? "Updating…" : "Creating…") : editingId ? "Update Raffle" : "Create Raffle"}
          </Button>

          {editingId && (
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
