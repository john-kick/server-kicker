#!/bin/bash

# Function to simulate random delay
random_delay() {
    sleep $((RANDOM % 3 + 1)) # Sleep for 1-3 seconds
}

# Script start message
echo "[INFO] Script started"
random_delay

# Simulating the game server starting
echo "[INFO] Starting game server..."
random_delay
echo "[DEBUG] Initializing assets"
random_delay
echo "[DEBUG] Loading configuration files"
random_delay
echo "[INFO] Game server is ready"
random_delay

# Simulating a test event
echo "[INFO] User 'xyz' logged in"
random_delay
echo "[DEBUG] User 'xyz' loaded into map 'Map01'"
random_delay
echo "[DEBUG] NPCs spawned for user 'xyz'"
random_delay

# Simulating the game server shutting down
echo "[INFO] Closing game server..."
random_delay
echo "[DEBUG] Saving player progress"
random_delay
echo "[DEBUG] Cleaning up resources"
random_delay
echo "[INFO] Game server closed"
random_delay

# Script end message
echo "[INFO] Script finished"
