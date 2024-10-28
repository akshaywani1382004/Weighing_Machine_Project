document.getElementById('connectBtn').addEventListener('click', connectToESP32);

async function connectToESP32() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = "Status: Connecting...";

  try {
    const response = await fetch("http://192.168.42.103/"); 
    if (response.ok) {
      const message = await response.text();
      statusElement.innerText = `Status: Connected to - ${message}`;
      startAutoFetch(); 
    } else {
      console.error("Failed to connect: ", response.status, response.statusText);
      statusElement.innerText = "Status: Failed to Connect";
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    statusElement.innerText = "Status: Unable to Connect";
  }
}

function startAutoFetch() {
  fetchDataFromESP32();
  setInterval(fetchDataFromESP32, 1000);
}

async function fetchDataFromESP32() {
  const dataDisplayElement = document.getElementById('dataDisplay');
  const sensorDataElement = document.getElementById('sensorData');

  try {
    const response = await fetch("http://192.168.42.103/getData");
    if (response.ok) {
      const result = await response.json();
      sensorDataElement.innerText = result.data;
      dataDisplayElement.style.display = 'block'; 
    } else {
      console.error("Failed to fetch data: ", response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}
