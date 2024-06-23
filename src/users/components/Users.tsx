

import { Stack, TextField, FormControlLabel, Checkbox, Typography, Button } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { Schema } from "../types/schema";

export function Users() {
  const { register, control, watch, formState: { errors } } = useFormContext<Schema>();

  const attendingWithGuest = watch("attendingWithGuest");

  return (
    <Stack spacing={3}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
     <Controller
  name="age"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      label="Age"
      type="number"
      error={!!errors.age}
      helperText={errors.age?.message}
      fullWidth
      InputProps={{ inputProps: { min: 1 } }} // Adding min value to avoid 0
      value={field.value || ''} // Ensuring that empty string is displayed instead of 0
      onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
    />
  )}
/>

      <FormControlLabel
        control={
          <Controller
            name="attendingWithGuest"
            control={control}
            render={({ field }) => <Checkbox {...field} checked={field.value} />}
          />
        }
        label="Are you attending with a guest?"
      />
      {attendingWithGuest && (
        <TextField
          {...register("guestName")}
          label="Guest Name"
          error={!!errors.guestName}
          helperText={errors.guestName?.message}
          fullWidth
        />
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Stack>
  );
}
