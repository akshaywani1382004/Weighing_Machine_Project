document.getElementById('connectBtn').addEventListener('click', connectToESP32);
document.getElementById('fetchDataBtn').addEventListener('click', fetchDataFromESP32);

async function connectToESP32() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = "Status: Connecting...";

  try {
    const response = await fetch("http://192.168.42.103/"); // Change to your ESP32 IP
    if (response.ok) {
      const message = await response.text();
      statusElement.innerText = `Status: Connected - ${message}`;
      document.getElementById('fetchDataBtn').style.display = 'inline-block'; // Show fetch data button
    } else {
      console.error("Failed to connect: ", response.status, response.statusText);
      statusElement.innerText = "Status: Failed to Connect";
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    statusElement.innerText = "Status: Unable to Connect";
  }
}

async function fetchDataFromESP32() {
  const dataDisplayElement = document.getElementById('dataDisplay');
  const sensorDataElement = document.getElementById('sensorData');

  try {
    const response = await fetch("http://192.168.42.103/getData"); // Change to your ESP32 IP
    if (response.ok) {
      const result = await response.json();
      sensorDataElement.innerText = result.data; // Display the fetched data
      dataDisplayElement.style.display = 'block'; // Show the data display section
    } else {
      console.error("Failed to fetch data: ", response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}
