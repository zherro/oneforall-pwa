"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Divider from "@component/Divider";

interface TimeSlot {
  open: string;
  close: string;
}

interface BusinessHours {
  [day: string]: TimeSlot[];
}

const initialBusinessHours: BusinessHours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const BusinessHoursPage = () => {
  const [businessHours, setBusinessHours] =
    useState<BusinessHours>(initialBusinessHours);

  const addTimeSlot = (day: string) => {
    setBusinessHours({
      ...businessHours,
      [day]: [...businessHours[day], { open: "", close: "" }],
    });
  };

  const handleTimeSlotChange = (
    day: string,
    index: number,
    field: string,
    value: string
  ) => {
    const newTimeSlots = businessHours[day].map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setBusinessHours({
      ...businessHours,
      [day]: newTimeSlots,
    });
  };

  const handleSubmit = () => {
    console.log(businessHours);
    // Aqui você pode enviar o payload para o servidor
  };

  return (
    <>
      <DashboardPageHeader
        title="Horário de Funcionamento"
        iconName="clock-circular-outline"
      />
      <Divider width="100%" backgroundColor="gray.400" mt="0.35rem" />
      <Box p={5}>
        {Object.keys(businessHours).map((day) => (
          <Box key={day} mb={5}>
            <Heading size="md" mb={3}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Heading>
            <VStack spacing={3} align="start">
              {businessHours[day].map((slot, index) => (
                <HStack key={index} spacing={3}>
                  <FormControl id={`${day}-open-${index}`}>
                    <FormLabel>Open</FormLabel>
                    <Input
                      type="time"
                      value={slot.open}
                      onChange={(e) =>
                        handleTimeSlotChange(day, index, "open", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl id={`${day}-close-${index}`}>
                    <FormLabel>Close</FormLabel>
                    <Input
                      type="time"
                      value={slot.close}
                      onChange={(e) =>
                        handleTimeSlotChange(
                          day,
                          index,
                          "close",
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                </HStack>
              ))}
              <Button onClick={() => addTimeSlot(day)}>Add Time Slot</Button>
            </VStack>
          </Box>
        ))}
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default BusinessHoursPage;
