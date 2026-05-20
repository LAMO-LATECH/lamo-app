import { useState, useCallback, useEffect, useRef } from "react";

function haversineDistance(coord1, coord2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371000; // meters
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coord1.latitude)) *
      Math.cos(toRad(coord2.latitude)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findCurrentStepIndex(userLocation, steps) {
  if (!steps || steps.length === 0) return 0;

  let closestIdx = 0;
  let closestDist = Infinity;

  for (let i = 0; i < steps.length; i++) {
    const [lng, lat] = steps[i].coordinate;
    const dist = haversineDistance(userLocation, {
      latitude: lat,
      longitude: lng,
    });
    if (dist < closestDist) {
      closestDist = dist;
      closestIdx = i;
    }
  }

  // If we're very close to the current step maneuver, show the next one
  if (closestDist < 30 && closestIdx < steps.length - 1) {
    return closestIdx + 1;
  }

  return closestIdx;
}

const ARRIVAL_THRESHOLD = 500; // meters

export default function useNavigationTracking({
  userLocation,
  destination,
  directionsData,
}) {
  const [navStatus, setNavStatus] = useState("IDLE"); // IDLE | NAVIGATING | ARRIVED
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const stepsRef = useRef([]);

  useEffect(() => {
    if (directionsData?.steps) {
      stepsRef.current = directionsData.steps;
    }
  }, [directionsData]);

  // Track user along route
  useEffect(() => {
    if (navStatus !== "NAVIGATING" || !userLocation || !directionsData) return;

    const steps = stepsRef.current;
    const idx = findCurrentStepIndex(userLocation, steps);
    setCurrentStepIndex(idx);

    // Check arrival
    if (destination) {
      const distToDest = haversineDistance(userLocation, destination);
      if (distToDest < ARRIVAL_THRESHOLD) {
        setNavStatus("ARRIVED");
      }
    }
  }, [userLocation, navStatus, directionsData, destination]);

  const currentStep = directionsData?.steps?.[currentStepIndex] ?? null;

  // Distance from user to the current step's maneuver point
  const distanceToNextStep =
    userLocation && currentStep
      ? haversineDistance(userLocation, {
          latitude: currentStep.coordinate[1],
          longitude: currentStep.coordinate[0],
        })
      : null;

  // Remaining distance/duration: sum from current step onward
  const totalDistanceRemaining =
    directionsData?.steps
      ?.slice(currentStepIndex)
      .reduce((sum, s) => sum + s.distance, 0) ?? 0;

  const totalDurationRemaining =
    directionsData?.steps
      ?.slice(currentStepIndex)
      .reduce((sum, s) => sum + s.duration, 0) ?? 0;

  const eta = totalDurationRemaining
    ? new Date(Date.now() + totalDurationRemaining * 1000)
    : null;

  const startNavigation = useCallback(() => {
    setCurrentStepIndex(0);
    setNavStatus("NAVIGATING");
  }, []);

  const endNavigation = useCallback(() => {
    setNavStatus("IDLE");
    setCurrentStepIndex(0);
  }, []);

  return {
    navStatus,
    currentStep,
    currentStepIndex,
    distanceToNextStep,
    totalDistanceRemaining,
    totalDurationRemaining,
    eta,
    startNavigation,
    endNavigation,
  };
}
