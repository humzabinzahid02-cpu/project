"use client";
import React, { useMemo, useState } from "react";
import { Button, Checkbox, FormControlLabel, Paper, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

type NotificationOption = {
  id: string;
  label: string;
};

const OPTIONS: NotificationOption[] = [
  { id: "new_order", label: "Notify admin when a new order is placed" },
  { id: "trip_completed", label: "Notify admin when a rider completes a trip" },
  {
    id: "low_inventory",
    label: "Notify admin on low inventory (below threshold 50 bottles)",
  },
  {
    id: "payment_marked_paid",
    label: 'Notify admin when customer payment marked as "Paid"',
  },
];

export default function NotificationsForm({
  ariaLabelledBy,
}: {
  ariaLabelledBy?: string;
}) {
  const initial = useMemo(
    () =>
      OPTIONS.reduce<Record<string, boolean>>((acc, o) => {
        acc[o.id] = false;
        return acc;
      }, {}),
    []
  );

  const [checked, setChecked] = useState<Record<string, boolean>>(initial);
  const anySelected = Object.values(checked).some(Boolean);

  const toggle = (id: string) => (_: unknown, value: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = OPTIONS.filter((o) => checked[o.id]).map((o) => o.id);
    console.log("Selected options:", selected);

  toast.success("Preferences saved successfully!", {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  style: {
    borderRadius: "12px",
    background: "#fff", // ✅ changed to white
    color: "#111", // darker text for contrast
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
});

  };

  return (
    <>
      <form onSubmit={onSubmit} aria-labelledby={ariaLabelledBy} className=" max-w-lg">
        <Stack spacing={2} component="fieldset" className="border-0 p-0">
          {OPTIONS.map((opt) => (
            <Paper
              key={opt.id}
              elevation={0}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow transition"
            >
              <FormControlLabel
              
                control={
                  <Checkbox
                    checked={checked[opt.id]}
                    onChange={toggle(opt.id)}
                    color="primary"
                  />
                }
                label={<span className="text-sm  text-gray-700">{opt.label}</span>}
                className="m-0 w-full "
              />
            </Paper>
          ))}
        </Stack>

        {anySelected && (
          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              variant="outlined"
              color="primary"
              type="button"
              className="bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#4F46E5",
                "&:hover": { backgroundColor: "#4338CA" },
                borderRadius: "0.5rem",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Save Preferences
            </Button>
          </div>
        )}
      </form>

      {/* Custom Toastify Container (no default CSS) */}
      <ToastContainer
        toastStyle={{
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        }}
      />
    </>
  );
}
