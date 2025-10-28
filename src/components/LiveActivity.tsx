"use client";
import { Paper, Typography, Stack, Box } from "@mui/material";

interface LiveActivityProps {
  height?: string; // e.g. "h-[300px]" or "h-[600px]"
}

const LiveActivity = ({ height = "h-[300px]" }: LiveActivityProps) => {
  const activities = [
    { time: "12:42 PM", text: "Stock updated: 50 Blue Gallons refilled." },
    { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." },
     { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." }, { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." }, { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." }, { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." }, { time: "12:40 PM", text: "Admin approved new customer: Sara Khan." },
    { time: "12:32 PM", text: "Ahmed marked 3 bottles returned." },
    { time: "12:25 PM", text: "Inventory check completed by Bilal." },
    { time: "12:10 PM", text: "New delivery assigned to driver Imran." },
    { time: "11:55 AM", text: "Payment received from customer Ali Khan." },
  ];

  return (
    
  <>
        <h2 className="text-lg mb-4 font-semibold text-gray-900">Live Activity</h2>

    <div
      className={`bg-[#F8FBFF] border border-[#D1DEEF] rounded-xl p-5 overflow-y-auto ${height}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#B5CCE6 #F8FBFF",
      }}
    >
      
      <div className="flex justify-between items-center mb-4">
      </div>

      <Stack spacing={2}>
        {activities.map((a, i) => (
          <Box key={i} display="flex" alignItems="center" gap={2}>
            <Typography
              variant="body2"
              sx={{ color: "#5B63E5", fontWeight: 500, minWidth: "70px" }}
            >
              {a.time}
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 2,
                borderColor: "#B5CCE6",
                flex: 1,
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="body2">{a.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Stack>

      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #b5cce6;
          border-radius: 8px;
        }
        div::-webkit-scrollbar-track {
          background-color: #f8fbff;
        }
      `}</style>
    </div></>

  );
};

export default LiveActivity;
