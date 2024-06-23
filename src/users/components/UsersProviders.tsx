

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";

import { Schema, defaultValues, schema } from "../types/schema";
import { Users } from "./Users";

export function UsersProviders() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const [formData, setFormData] = useState<Schema | null>(null);

  const onSubmit = (data: Schema) => {
    setFormData(data);
  };

  if (formData) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {formData.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {formData.email}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {formData.age}
          </Typography>
          <Typography variant="body1">
            <strong>Attending with Guest:</strong> {formData.attendingWithGuest ? "Yes" : "No"}
          </Typography>
          {formData.attendingWithGuest && (
            <Typography variant="body1">
              <strong>Guest Name:</strong> {formData.guestName}
            </Typography>
          )}
          <Button onClick={() => setFormData(null)} variant="contained" color="primary" fullWidth>
            Back to Form
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 500 }}>
          <Users />
        </Box>
      </Box>
    </FormProvider>
  );
}
