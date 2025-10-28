"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentType: string;
  status: "Approved" | "Pending";
}

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  initialData?: Expense | null;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [expense, setExpense] = useState<Expense>({
    id: 0,
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: 0,
    paymentType: "",
    status: "Pending",
  });

  useEffect(() => {
    if (initialData) {
      // Format date safely for <input type="date" />
      const formattedDate = initialData.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      setExpense({
        ...initialData,
        date: formattedDate,
      });
    } else {
      setExpense({
        id: 0,
        date: new Date().toISOString().split("T")[0],
        category: "",
        description: "",
        amount: 0,
        paymentType: "",
        status: "Pending",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(expense);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: "10px 4px",
          width: "540px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0,0,0,0.3)",
        },
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pr-4">
        <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem", pb: 1 }}>
          {initialData ? "Edit Expense" : "Add New Expense"}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Content */}
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
        {/* Date Field */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
          >
            Date
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9FAFB",
              },
            }}
          />
        </Box>

        {/* Category */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
          >
            Category
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            name="category"
            value={expense.category}
            onChange={handleChange}
            placeholder="Select"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value="Electricity">Electricity</MenuItem>
            <MenuItem value="Fuel">Fuel</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Box>

        {/* Description */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
          >
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            name="description"
            value={expense.description}
            onChange={handleChange}
            placeholder="Write short note (e.g. Petrol for rikshaw, WAPDA bill, filter repair)"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9FAFB",
              },
            }}
          />
        </Box>

        {/* Amount + Payment Type */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 0.5, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
            >
              Amount
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="amount"
              type="number"
              value={expense.amount}
              onChange={handleChange}
              placeholder="00.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs.</InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F9FAFB",
                },
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 0.5, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
            >
              Payment Type
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              name="paymentType"
              value={expense.paymentType}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F9FAFB",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Status */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "rgba(0, 0, 0, 0.87)", fontWeight: 500 }}
          >
            Status
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              onClick={() =>
                setExpense((prev) => ({ ...prev, status: "Pending" }))
              }
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                px: 2,
                py: 1,
                borderRadius: 3,
                border:
                  expense.status === "Pending"
                    ? "2px solid #FF6B2C"
                    : "1px solid #E5E7EB",
                backgroundColor:
                  expense.status === "Pending" ? "#FFF5F0" : "transparent",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border:
                    expense.status === "Pending"
                      ? "5px solid #FF6B2C"
                      : "2px solid #D1D5DB",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color:
                    expense.status === "Pending" ? "#FF6B2C" : "#6B7280",
                }}
              >
                Pending
              </Typography>
            </Box>

            <Box
              onClick={() =>
                setExpense((prev) => ({ ...prev, status: "Approved" }))
              }
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                px: 2,
                py: 1,
                borderRadius: 3,
                border:
                  expense.status === "Approved"
                    ? "2px solid #00B37A"
                    : "1px solid #E5E7EB",
                backgroundColor:
                  expense.status === "Approved" ? "#F9FAFB" : "transparent",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border:
                    expense.status === "Approved"
                      ? "5px solid #00B37A"
                      : "2px solid #6B7280",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color:
                    expense.status === "Approved" ? "#00B37A" : "#6B7280",
                }}
              >
                Approved
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#6366F1",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 500,
            ":hover": { backgroundColor: "#4F46E5" },
          }}
        >
          Save Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;
